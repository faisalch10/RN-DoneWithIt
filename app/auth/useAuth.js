import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import authStorage from './storage';

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = token => {
    const user = jwtDecode(token);
    setUser(user);
    authStorage.storeToken(token);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return {
    user,
    setUser,
    logOut,
    logIn,
  };
};

export default useAuth;
