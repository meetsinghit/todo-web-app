import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDP7_ACRQTjqb0Exu6hIWl4YtL9SZ5Dpxk",
    authDomain: "todo-app-ms.firebaseapp.com",
    databaseURL: "https://todo-app-ms.firebaseio.com",
    projectId: "todo-app-ms",
    storageBucket: "todo-app-ms.appspot.com",
    messagingSenderId: "424391043501",
    appId: "1:424391043501:web:a779050ba8edb059895924",
    measurementId: "G-MJPLPH9J7K"
}); 

const db = firebaseApp.firestore();

export default db;
//exporting the db to use in other files