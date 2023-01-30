import { Fragment } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListingsScreen from '../screens/ListingsScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import OfflineNotice from '../components/OfflineNotice';
import routes from './routes';

const Stack = createNativeStackNavigator();

const FeedNavigator = () => {
  const { LISTINGS, LISTING_DETAILS } = routes;

  return (
    <Fragment>
      <OfflineNotice />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={LISTINGS} component={ListingsScreen} />
        <Stack.Screen name={LISTING_DETAILS} component={ListingDetailsScreen} />
      </Stack.Navigator>
    </Fragment>
  );
};

export default FeedNavigator;
