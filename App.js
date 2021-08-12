import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

//! Here we are going to build a website with multiple routes instead of multiple pages. Because React is not designed to develop multi-page websites. So, we need to create multiple routes to handle multiple views.

import { AuthProvider } from "../contexts/AuthContext"

import Chats from "./Chats"
import Login from './Login'

function App() {
  return (
    <div style={{ fontFamily: 'Avenir'}}> 
      <Router>          { /*  React Router(BrowserRouter) is a standard library for routing in React. 
                        It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL. 
                        ?BrowserRouter/Router is a parent component and can have only single child....here "AuthProvider" is the single child */}
        <AuthProvider> 
          <Switch> {/* //!By default, routes are inclusive which means more than one Route component can match the URL path and render at the same time.
                    //? If we want to render a single component, we need to use switch....Switch groups together several routes, iterates over them and finds the first one that matches the path. Thereby, the corresponding component to the path is rendered */}
            <Route path="/chat korbo" component={Chats} /> {/* //* "Route component" will now help us to establish the link between component’s UI and the URL */}
            <Route path="/login" component={Login} />    {/* //! it's saying on path / , render the component 'Login' " */}
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App