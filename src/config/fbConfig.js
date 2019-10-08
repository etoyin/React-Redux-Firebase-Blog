import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBWTSejLucoeFsGe_BVMH_WqV2D37vEACo",
    authDomain: "my-react-blog-44ca8.firebaseapp.com",
    databaseURL: "https://my-react-blog-44ca8.firebaseio.com",
    projectId: "my-react-blog-44ca8",
    storageBucket: "",
    messagingSenderId: "1037862403870",
    appId: "1:1037862403870:web:4dc3dedfb113bef6ae530f",
    measurementId: "G-G9CX8YD6VS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase;