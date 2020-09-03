
import app from 'firebase/app'
import App from '../../App';
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyCIjFO27aMPPxhpVN9MQ2zbmEdQ-gcBDd4",
    authDomain: "react-fire-auth-5a8cb.firebaseapp.com",
    databaseURL: "https://react-fire-auth-5a8cb.firebaseio.com",
    projectId: "react-fire-auth-5a8cb",
    storageBucket: "react-fire-auth-5a8cb.appspot.com",
    messagingSenderId: "1029291587303",
    appId: "1:1029291587303:web:744571d4aed7499512d442",
    measurementId: "G-GKHYWZPD7R"
  };

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth
    }
     // Auth API // 
    doCreateUserWithEamilAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
        
    doSignOut = () => this.auth.signOut();  
    
    doPasswordReset = email =>
      this.auth.sendPasswordResetEmail(email)
    
    doPasswordUpdate = password => 
        this.auth.updatePassword(password)  
    }


  export default Firebase