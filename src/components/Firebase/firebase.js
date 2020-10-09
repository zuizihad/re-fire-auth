import app from 'firebase/app'
import 'firebase/database'
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
        /* Helper*/ 
        this.serverValue = app.database.ServerValue;
        this.emailAuthProvider = app.auth.EmailAuthProvider;
        this.auth = app.auth();
        this.db = app.database();
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
        this.twitterProvider = new app.auth.TwitterAuthProvider();
    }
     // Auth API // 
    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);
  
    doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);
  
    doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

    doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);
    doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

    doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      //url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      url: 'http://localhost:3000'
    });

    doSignOut = () => this.auth.signOut();
  
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password); 

    //Merge Auth and DB user API
    onAuthUserListener = (next, fallback) => 
      this.auth.onAuthStateChanged(authUser => {
        if(authUser) {
          this.user(authUser.uid)
            .once('value')
            .then(snapshot => {
              const dbUser = snapshot.val();

              //default empty roles
              if(!dbUser.roles) {
                dbUser.roles = {};
              }

              //merge auth and db user
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                ...dbUser,
              }
              next(authUser);
            })
        }else {
          fallback();
        }
      })

    // *** User API *** //
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    // *** Message API ***//
    message = uid => this.db.ref(`messages/${uid}`);
    messages = () => this.db.ref('messages');
    
    }
  


  export default Firebase