/* eslint no-unused-vars : "off" */ // /*eslint no-unused-vars: "off"*/ cant take 3 values as off, warn, error
import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../components/firebase';
import axios from 'axios';      //! "axios" used for APIs called
import { useAuth } from '../contexts/AuthContext';

// if(window.confirm("Ok to re direct to facebook-page or Cancel to stay")){
//     window.open("https://web.facebook.com/")
// }

const Chats = () => {
    const [loading, setLoading] = useState(true);
    const history = useHistory();       //! to be able to navigate we are to use "useHistory" as a "hook"
    const { user } = useAuth();

    //console.log(user)

    const handleLogout =  () => {  
                                       //* Inside an async function you can use the await keyword. await placed before a promise causes the async function to pause until the promise is settled (either rejected or fulfilled) 
         auth.signOut();  //todo ,,Signs out the current user.

        history.push('/login');
             
    }

    useEffect(() => {    //! grabbing the "user" data from firebase authentication, "useEffect" Adds an observer for changes to the user's sign-in state
                            //todo...imperative programming is a programming paradigm that uses statements that change a program’s state....Imperative Programming is like your friend calling your father that tells her how to fix your car step by step.
                            //*...declarative programming is a programming paradigm … that expresses the logic of a computation without describing its control flow....Declarative Programming is like asking your friend to fix your car. You don’t care how to fix it, that’s up to her.

        if(!user){
            history.push('/login');
            
        }

        //console.log(user)

        const getFile = async (url) => {

            const response = await fetch(url);
            const data = await response.blob();

            //console.log("this is photoURL"+url)

            return new File([data], "userPhoto.jpg", { type : 'image/jpg'}); 
                                                                                {/* File Provides information about files and allows JavaScript in a web page to access their content. */}
        }

                                                             //! "axios" used for APIs called...Axios is a Promise-based HTTP client for JavaScript which can be used in your front-end application and in your Node. js backend. By using Axios it's easy to send asynchronous HTTP request to REST endpoints and perform CRUD operations.
        axios.get('https://api.chatengine.io/users/me', {   //? The axios.get makes an async request and returns a promise.
            headers : {
                'Project-ID' : 'cb5c1515-e046-47ef-bf96-7f1d90254d5e',
                'User-Name' : user.email,
                'User-Secret' : user.uid
            }
        }).then(() => {    
                         //todo, .then() Attaches callbacks for the resolution(execution) and/or rejection of the Promise....Once a Promise is fulfilled or rejected, the respective handler function (onFulfilled or onRejected) will be called asynchronously (scheduled in the current thread loop).....see details below : code 102
            setLoading(false);
        }).catch(() => {    //!Attaches a callback for only the rejection of the Promise.
            //console.log(error.code + error.message)
            let formdata = new FormData();  
                                            //? The FormData object Provides a way to easily construct a set of key/value pairs representing form fields and their values
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);
            //console.log("hhhhhhhhhhhhhhhh"+error)

            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name)
                //console.log(avatar)
                //console.log(formdata)
//..............{ 
                // axios({ method : 'post',
                // url: 'https://api.chatengine.io/users/',    
                //                                             //! request "post" to create documents ..here we create new user....A POST request can be made using Axios to “post” data to an endpoint. This endpoint may then use this POST request to perform a certain task or trigger an event. The HTTP post request is performed by calling axios.post()
                //     data : formdata,
                //     headers : { 'PRIVATE-KEY': '' } 
                // })
//..............}
                axios.post("https://api.chatengine.io/users/", formdata, {headers : {'PRIVATE-KEY': '6ce08c72-a2d3-4f42-b0f3-68c0e13b1f61'}} )                                      
                                            //* An environment variable is a variable whose value is set outside the program, typically through functionality built into the operating system or microservice. An environment variable is made up of a name/value pair, and any number may be created and available for reference at a point in time
                                            //? During application initialization, these are loaded into process.env and accessed by suffixing the name of the environment variable 
                                            //* At runtime, the reference to the environment variable name is replaced with its npm start
                                            //current value. In this case, process.env.REACT_APP_METEORITE_STRIKE_DATASET is replaced by its value, "https://data.nasa.gov/resource/y77d-th95.json".
                                            //todo...  The primary use case for environment variables is to limit the need to modify and re-release an application due to changes in configuration data. From the example above, whenREACT_APP_METEORITE_STRIKE_DATASET's URL changes there’s no need for source code alterations, testing, and deployment of the modified application.


                .then(() => setLoading(false))
                .catch((error) => console.log(error))
            })
        })
    }, [user, history]);

    if(!user && loading) return 'Loading....'

    return(<div className = "chats-page">
        <div className = "nav-bar">
            <div className = "logo-tab">
                Unichat
            </div>
            <div className = "logout-tab" onClick = {handleLogout}>
                Logout
            </div>
        </div>
        <ChatEngine
        
        height='calc(100vh -66px)'
        projectID={process.env.REACT_APP_PROJECT_ID}
        userName={user.email}
        userSecret={user.uid}
        />
    </div>)
}

export default Chats;

//{ code 102 : Once a Promise is fulfilled or rejected, the respective handler function (onFulfilled or onRejected) will be called asynchronously (scheduled in the current thread loop). The behavior of the handler function follows a specific set of rules. 
//If a handler function:
// returns a value, the promise returned by then gets resolved with the returned value as its value.
// doesn't return anything, the promise returned by then gets resolved with an undefined value.
// throws an error, the promise returned by then gets rejected with the thrown error as its value.
// returns an already fulfilled promise, the promise returned by then gets fulfilled with that promise's value as its value.
// returns an already rejected promise, the promise returned by then gets rejected with that promise's value as its value.
// returns another pending promise object, the resolution/rejection of the promise returned by then will be subsequent to the resolution/rejection of the promise returned by the handler. Also, the resolved value of the promise returned by then will be the same as the resolved value of the promise returned by the handler. }