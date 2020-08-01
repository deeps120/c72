import * as firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyAYy4lyUNWlHs-JXsUpqWpNsXTsXbDbXuY",
    authDomain: "wily-585bc.firebaseapp.com",
    databaseURL: "https://wily-585bc.firebaseio.com",
    projectId: "wily-585bc",
    storageBucket: "wily-585bc.appspot.com",
    messagingSenderId: "420079068085",
    appId: "1:420079068085:web:a1073aaddda37c46a56ffc"
  };
  firebase.initializeApp(firebaseConfig)
  export default firebase.firestore()