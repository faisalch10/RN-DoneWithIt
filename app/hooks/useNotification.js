import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import expoPushTokenAPI from '../api/expoPushToken';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const useNotifications = customResponseListener => {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    console.log('NOTIFICATION HOOK IN USE');
    registerForPushNotifications();

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        console.log('RECEIVED:', notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        customResponseListener
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
};

const registerForPushNotifications = async () => {
  let token;

  if (Platform.OS === 'android') {
    const res = await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    expoPushTokenAPI.attachExpoTokenToUser(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
};

export default useNotifications;
