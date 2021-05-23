import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCDBkDIhS08PPnWpLxTuSsU_uPtPp-ww7A",
    authDomain: "boolean-web.firebaseapp.com",
    projectId: "boolean-web",
    storageBucket: "boolean-web.appspot.com",
    messagingSenderId: "989152956301",
    appId: "1:989152956301:web:0d0f38b006397b6630b7c4",
    measurementId: "G-E9L3DV35J4"
};

firebase.initializeApp(firebaseConfig)

export default firebase
export const storage = firebase.storage()
export const firestore = firebase.firestore()
export const auth = firebase.auth()