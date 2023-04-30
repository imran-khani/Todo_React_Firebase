import React from 'react'
import firebase from "firebase/compat/app";
import "firebase/compat/database";


    const firebaseConfig = {
        // Add your Firebase project's configuration object here
        apiKey: "AIzaSyCQryKSv8Ar_96uZnw6r8nqX_7P7QlcS6I",
        authDomain: "todo-react-d5699.firebaseapp.com",
        projectId: "todo-react-d5699",
        storageBucket: "todo-react-d5699.appspot.com",
        messagingSenderId: "391413668014",
        appId: "1:391413668014:web:f586349531287f0fbaf53f",
      };
      firebase.initializeApp(firebaseConfig);
      const database = firebase.database();
const FirebaseConfig = () => {
  return (
    <div>FirebaseConfig</div>
  )
}

export default FirebaseConfig