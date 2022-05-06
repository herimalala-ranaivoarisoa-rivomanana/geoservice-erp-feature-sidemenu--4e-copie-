import React from 'react';
import { AuthService } from '@project/services';
import { removeFromLS, writeToLS } from '@project/utils';
import { useHistory } from 'react-router';

export interface IAuthStore {
  user: any,
  updateUser: (usr: any) => void,
  isAuthenticated: () => boolean,
  signInGoogle: () => Promise<void>,
  signOut: (callback?: any) => Promise<void>,
  token?: string;
}

const useAuthStore = () => {
  const history = useHistory();
  const [user, setUser] = React.useState<any>(undefined);
  const [token, setToken] = React.useState<string | undefined>(undefined);

  const updateUser = (usr: any) => {
    setUser(usr);
  }

  const isAuthenticated = () => typeof window !== 'undefined' && !!window.localStorage.getItem('userToken');

  const signInGoogle = async () => {
    AuthService.SignInWithGoogle()
      .catch(err => console.log('From store -> Google signin issue', err));
  };

  const handleAuthStateChange = (user: any) => {
    if (user) {
      setUser({
        email: user.email,
        name: user.displayName,
        id: user.uid,
        imageUrl: user.photoURL,
      });
      setToken(user.accessToken);
      writeToLS('userToken', user.accessToken);
      const currentPath = history.location.pathname === '/' ? '/home' : history.location.pathname;
      history.push(currentPath);
    } else {
      console.warn('session expired');
      setUser(undefined);
      setToken(undefined);
      removeFromLS('userToken');
    }
  }

  const signOut = async (callback?: any) => {
    AuthService.SignOut()
      .then(() => {
        setToken(undefined);
        setUser(undefined);
        removeFromLS('userToken');
        if (callback) callback();
        console.log('logged out');
      })
      .catch(err => console.log('Logout error', err));
  }

  React.useEffect(() => {
    // init google service auth plugin
    AuthService.InitGoogleAuth()
      .then(() => {
        AuthService.OnAuthStateChanged(handleAuthStateChange);
      })
      .catch((err: any) => console.log('Google auth init failed', err));
  }, []);

  return {
    user,
    updateUser,
    isAuthenticated,
    signInGoogle,
    signOut,
    token,
  } as IAuthStore;
}

export default useAuthStore;