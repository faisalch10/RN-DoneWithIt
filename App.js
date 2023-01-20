import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Switch } from 'react-native';

import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import MessagesList from './app/screens/MessagesList';
import AccountScreen from './app/screens/AccountScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import ListingEditScreen from './app/screens/ListingEditScreen';

import Screen from './app/components/Screen';
import Card from './app/components/Card';
import Icon from './app/components/Icon';
import ListItem from './app/components/lists/ListItem';
import AppTextInput from './app/components/AppTextInput';
import AppPicker from './app/components/AppPicker';

const App = () => {
  return <WelcomeScreen />;
};

export default App;
