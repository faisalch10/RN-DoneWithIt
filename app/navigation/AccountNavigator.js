import { Fragment } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountScreen from '../screens/AccountScreen';
import MessagesScreen from '../screens/MessagesScreen';
import OfflineNotice from '../components/OfflineNotice';
import routes from './routes';

const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
  const { ACCOUNT, MESSAGES } = routes;

  return (
    <Fragment>
      <OfflineNotice />
      <Stack.Navigator>
        <Stack.Screen name={ACCOUNT} component={AccountScreen} />
        <Stack.Screen name={MESSAGES} component={MessagesScreen} />
      </Stack.Navigator>
    </Fragment>
  );
};

export default AccountNavigator;
