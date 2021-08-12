import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../components/firebase';

const AuthContext = React.createContext(null);      //? is an API 
                                                //Creates a Context object. When React renders a component that subscribes to this Context object it(the component) will read the current context value from the closest matching Provider above it in the tree.
                                                //! "Context" is designed to share data/variables/etc.
                                                //? that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language...Context provides a way to pass data through the component tree without having to pass props down manually at every level. 

                                                //
                                               


                                                //! Hooks are the new feature introduced in the React 16.8 version. It allows you to use "state" and other React features without writing a class
                                                //! passing "AuthContext" through "useContext" { here "useContext" is react hook } ....as like we have "useState"
export const useAuth = () => useContext(AuthContext); //? hook...
                                                       //?Don’t forget that the argument to useContext must be the context object itself
                                                      //* In case of "Class component" The simple way to access the context values is by wrapping the child component in the Consumer 
                                                      //* */ But for functional component we can access context with the help of "useContext method" of React. From there, we can access the context value as props 
                                                      //? Accepts a context object (the value returned from React.createContext) and returns the current context value for that context. The current context value is determined by the value prop of the nearest <MyContext.Provider> above the calling component in the tree.
                                                      //?When the nearest <MyContext.Provider> above the component updates, this Hook will trigger a re-render with the latest context value passed to that MyContext provider. Even if an ancestor uses React.memo or shouldComponentUpdate, a re-render will still happen starting at the component itself using useContext.
//console.log()


export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();   //todo... "useHistory" Provides access to the "history prop" in "React Router"
                                    //todo... history prop is the "history API" which is used to navigate user(s) to other view programatically

    //console.log(children)


    //! grabbing/fetching the "user" data from firebase authentication, "useEffect" Adds an observer for changes to the user's sign-in state...By default The function passed to "useEffect" will run after the "render" is committed to the screen
    useEffect(() => { //?Imperative function...that has a specific goal  
        auth.onAuthStateChanged((user) => { //! "cleanup function" == agerta clean kore notun info update korbe
                                               //? The clean-up function runs before the component is removed from the UI to prevent memory leaks. 
                                                    //! let's say an app subscribes to status updates from a friends' profile. Being the great friend you are, you are decide to unfriend them and befriend someone else. 
                                                    //? Now the app needs to unsubscribe from the previous friend's status updates and listen to updates from your new friend. This is natural and easy to achieve with the way useEffect works.
            setUser(user);
            setLoading(false);

            //console.log(auth)
            //console.log(user)

            if(user) history.push('/chat korbo');
        })

    }, [user, history]);        //! "dependency" ...If present, effect will only activate if the values in dependency list change.
                                //! By including the user in the dependency list, we can indicate that the hook needs to run only when the user changes
                                //?The default behavior for effects is to fire the effect after every completed render. That way an effect is always re-created if one of its dependencies changes...Now the user will only be "re-created" when user or history changes.
                                // The array of dependencies is not passed as arguments to the effect function. Conceptually, though, that’s what they represent: every value referenced inside the effect function should also appear in the dependencies array. In the future, a sufficiently advanced compiler could create this array automatically.

    
    const val = { user };
    //console.log(value)

    return(
        <AuthContext.Provider value = {val}> 
                                                { /* //! Every Context object comes with a Provider React component ...that allows consuming components to subscribe to context changes....The Provider component accepts a value prop to be passed to consuming  components that are descendants of this Provider....All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes, ...The propagation from Provider to its descendant consumers (including .contextType and useContext) is not subject to the shouldComponentUpdate method(The shouldComponentUpdate method allows us to exit the complex react update life cycle to avoid calling it again and again on every re-render. It only updates the component if the props passed to it changes), so the consumer is updated even when an ancestor component skips an update. */}
            
            {!loading && children }
            {/* {console.log(value)} */}
        </AuthContext.Provider>
    )
}

// Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a function component (referred to as React’s render phase). Doing so will lead to confusing bugs and inconsistencies in the UI.