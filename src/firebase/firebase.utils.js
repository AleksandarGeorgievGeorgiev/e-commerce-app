import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyC72mVAIMmwVcx77nJpkz0HEmyB35StT8Y",
    authDomain: "e-commerce-app-69feb.firebaseapp.com",
    projectId: "e-commerce-app-69feb",
    storageBucket: "e-commerce-app-69feb.appspot.com",
    messagingSenderId: "93132576462",
    appId: "1:93132576462:web:7ecff14f049a9b13eae29f",
    measurementId: "G-PV0W2TVDKY"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();
    console.log(userRef)

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;