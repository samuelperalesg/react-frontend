import firebase  from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAZbIM6teMsF8COcIvfdRpm-ccmNd9gMMc",
  authDomain: "learning-firebase-d4dda.firebaseapp.com",
  projectId: "learning-firebase-d4dda",
  storageBucket: "learning-firebase-d4dda.appspot.com",
  messagingSenderId: "689207004454",
  appId: "1:689207004454:web:7ac1129523fc98de7745e7"
}

// activate firebase app
firebase.initializeApp(firebaseConfig)

// configure settings
const auth = firebase.auth()

// set up provider(s)
const provider = new firebase.auth.GoogleAuthProvider()

// set up auth functions
function login() {
  return auth.signInWithPopup(provider)
}

function logout() {
  return auth.signOut()
}

export { login, logout, auth }