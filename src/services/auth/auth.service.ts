import { FirebaseService } from '@project/services';
import { auth } from '../firebase/firebase.service';

/**
 * @property { string } email
 * @property { password } email
 */
export interface ILoginCredential {
  email: string;
  password: string;
}

/**
 * Authentication services API
 */
class AuthService {
  /**
   * Login Service
   * @param { ILoginCredential } credentials              Credentials to request authentication
   */
  static async Login(credentials: ILoginCredential){
    try {
      // do your api call
    } catch (err: any) {
      // handle error
    }
  }

  static async SignInWithGoogle() {
    try {
      const googleUser = await FirebaseService.GoogleAuth.signIn();
      if (!googleUser?.authentication?.idToken) throw new Error('Nothing returned');
      const credential = FirebaseService.GoogleAuthProvider.credential(googleUser?.authentication?.idToken);
      await FirebaseService.signInWithCredential(FirebaseService.auth, credential);
      const { authentication, ...user} = googleUser;
      return {
        token: credential.idToken,
        user: user,
      };
    } catch (err: any) {
        console.log('Google Auth error', err);
        return null;
    }
  }

  /**
   * Setup listener if user data changed 
   * 
   * @param cb          take a callback function to receive user data, and execute it if defined
   */
  static async OnAuthStateChanged(cb?: any) {
    auth.onAuthStateChanged((user) => {
      if (cb) cb(user);
    })
  }

  static async SignOut() {
    await auth.signOut()
      .then(value => console.log('logout firebase', value))
      .catch(err => console.log('firebase logout err', err));
    // await Promise.all([FirebaseService.auth.signOut, GoogleAuth.signOut]);
  }

  // initialize google auth plugins
  static async InitGoogleAuth() {
    FirebaseService.initGoogleAuth();
  }
}

export default AuthService;
