// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxjlZU4KdLKOArZ4UVuyGmRzwTP-hzAEk",
    authDomain: "reactnativeauthenticationflow.firebaseapp.com",
    projectId: "reactnativeauthenticationflow",
    storageBucket: "reactnativeauthenticationflow.appspot.com",
    messagingSenderId: "312655991403",
    appId: "1:312655991403:web:ae7d29d359281ee916572e"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const auth = firebase.auth();

export { auth };