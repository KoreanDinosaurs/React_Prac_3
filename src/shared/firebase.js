import firebase from 'firebase/compat/app';
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCg03OQFnHulQRMOM8IBvUP5Ft45dMhX0w",
    authDomain: "react-prac-3.firebaseapp.com",
    projectId: "react-prac-3",
    storageBucket: "react-prac-3.appspot.com",
    messagingSenderId: "306889379339",
    appId: "1:306889379339:web:f6fb9f1a06c3202a60c10e",
    measurementId: "G-RDHWPYB2DP"
}

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const apiKey = firebaseConfig.apiKey;

export { auth, apiKey }


