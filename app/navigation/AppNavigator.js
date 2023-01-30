import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import ListingEditScreen from '../screens/ListingEditScreen';
import NewListingButton from './NewListingButton';
import useNotifications from '../hooks/useNotification';
import navigation from '../navigation/rootNavigation';
import colors from '../config/colors';
import routes from './routes';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { LISTING_EDIT } = routes;
  // const navigation = useNavigation(); // * WE DON'T HAVE TO MAKE REF FOR NAVIGATION

  useNotifications(notification => {
    navigation.navigate('Settings', {
      screen: 'Account',
    });
  });

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Feed'
        component={FeedNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={LISTING_EDIT}
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton onPress={() => navigation.navigate(LISTING_EDIT)}>
              <MaterialCommunityIcons
                name='plus-circle'
                color={colors.white}
                size={40}
              />
            </NewListingButton>
          ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name='Settings'
        component={AccountNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='account' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
