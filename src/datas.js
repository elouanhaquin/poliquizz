// Import the functions you need from the SDKs you need
import { app } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUKrBnc4etVMsjCE6BbIA_82D9iIjcmUE",
  authDomain: "poliquizz.firebaseapp.com",
  projectId: "poliquizz",
  storageBucket: "poliquizz.appspot.com",
  messagingSenderId: "244478545020",
  appId: "1:244478545020:web:88b3a9678594283f610df9",
  measurementId: "G-2VCX3D4KRK"
};

// Initialize Firebase
/*const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);*/

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
