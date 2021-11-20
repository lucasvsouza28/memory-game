import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyAYofyvjkC9ahwfWJKAirfTUwvNCizn7Mw",
    authDomain: "memory-game-2dc89.firebaseapp.com",
    databaseURL: "https://memory-game-2dc89-default-rtdb.firebaseio.com",
    projectId: "memory-game-2dc89",
    storageBucket: "memory-game-2dc89.appspot.com",
    messagingSenderId: "925360014363",
    appId: "1:925360014363:web:25379b0fa48b976ea724be"
  };
  
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export {
    firebase,
    auth,
    database,
}