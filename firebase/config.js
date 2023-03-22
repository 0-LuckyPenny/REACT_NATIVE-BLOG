import * as firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGZ788aJJENsR8EMRNNGXJToQCk4CbLWw",
  authDomain: "rn-social-52def.firebaseapp.com",
  projectId: "rn-social-52def",
  storageBucket: "rn-social-52def.appspot.com",
  messagingSenderId: "32707799653",
  appId: "1:32707799653:web:8eaabc4884527aa855748c",
  measurementId: "G-TNL2YVJ1TS",
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

// export { auth };

export default firebase.initializeApp(firebaseConfig);
