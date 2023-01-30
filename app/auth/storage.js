import * as SecureStorage from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const KEY = 'authToken';

const storeToken = async token => {
  try {
    await SecureStorage.setItemAsync(KEY, token);
  } catch (err) {
    console.log('ERROR while storing token', err);
  }
};

const getToken = async () => {
  try {
    const token = await SecureStorage.getItemAsync(KEY);
    return token;
  } catch (err) {
    console.log('ERROR while getting the token', err);
  }
};

const getUser = async () => {
  const token = await getToken();

  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStorage.deleteItemAsync(KEY);
  } catch (err) {
    console.log('ERROR while deleting the token');
  }
};

export default {
  getToken,
  storeToken,
  getUser,
  removeToken,
};
