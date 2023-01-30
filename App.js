import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import Screen from './app/components/Screen';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import navigationTheme from './app/navigation/navigationTheme';
import { navigationRef } from './app/navigation/rootNavigation';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();

    if (!user) {
      setIsReady(true);
      await SplashScreen.hideAsync();
      return;
    }
    setUser(user);
    setIsReady(true);
    await SplashScreen.hideAsync();
  };

  // * BELOW CODE RELATED TO EXPO-APP-LOADING PACKAGE WHICH IS DEPRECATED!!. BUT STILL USEFUL IF YOU HAVE TO WORK ON SOME OLDER CODEBASES.

  // if (!isReady)
  //   return (
  //     <AppLoading
  //       startAsync={restoreUser}
  //       onFinish={() => setIsReady(true)}
  //       onError={err => console.log(err)}
  //     />
  //   );

  useEffect(() => {
    restoreUser();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
