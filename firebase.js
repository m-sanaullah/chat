import firebase from "firebase/app";    //! here "firebase.js" is for initializing our chat app and authenticating user
import "firebase/auth";

//!there are many options(key:value)/object in firebase to configure your app's services as your requirement
//? "initializeApp" Creates and initializes a Firebase app instance/object

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyBEINfbZjb5s6Jt7T_0HWOdXmqjBh9zKFI",
  authDomain: "unichat-13d26.firebaseapp.com",
  projectId: "unichat-13d26",
  storageBucket: "unichat-13d26.appspot.com",
  messagingSenderId: "577494160727",
  appId: "1:577494160727:web:35d58fccc3ff534c59da12",
  measurementId: "G-BEL5MK0QE0"
}).auth();    



//!  A method is a function which is a property of an object. 
//?There are two kind of methods: Instance Methods which are built-in tasks performed by an object instance, or Static Methods which are tasks that are called directly on an object constructor.
//Note: In JavaScript functions themselves are objects, so, in that context, a method is actually an object reference to a function.



//! namespace mane holo kind of 1ta location/path e onek file store kora jate jokhon tokhon access kora jai
//? "global namespace" are essential for simplifying "storage management" and identifying multiple network-based file systems. A global namespace (GNS) helps in managing distributed file storage{firebase} and allows users to access and file data from anywhere, regardless of physical location


//function firebase.initializeApp(options: Object, name?: string): firebase.app.App 
// (method) firebase.app.App.auth(): firebase.auth.Auth

//? firebase.auth.Auth == firebase.app.App.auth()
