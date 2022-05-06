import {
    initializeApp,
} from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithCustomToken,
    signInWithPopup,
    signInWithCredential,
} from "firebase/auth";
import { GoogleAuth } from  "@codetrix-studio/capacitor-google-auth";
import config from '@project/config';

const firebaseConfig = {
    apiKey: config.services.firebase.webApiKey,
    authDomain: `${config.services.firebase.projectId}.firebaseapp.com`,
    projectId: config.services.firebase.projectId
}

/* const googleAuthConfig = {
    client_id: config.services.firebase.clientId,
    scopes: ['profile', 'email'],
} */

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
auth.languageCode = 'fr';

const googleProvider = new GoogleAuthProvider();

const initGoogleAuth = () => {
    GoogleAuth.initialize();
}

export {
    firebase,
    auth,
    onAuthStateChanged,
    signInWithCustomToken,
    signInWithCredential,
    signInWithPopup,
    initGoogleAuth,
    GoogleAuth,
    GoogleAuthProvider,
    googleProvider,
};