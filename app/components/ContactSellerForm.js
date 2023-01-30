import { Alert, Keyboard } from 'react-native';
import * as Notifications from 'expo-notifications';

import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import messagesApi from '../api/messages';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const scheduleLocalNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Awesome',
      body: 'Your message was sent to the seller',
    },
    trigger: null,
  });
};

const ContactSellerForm = ({ listing }) => {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      return Alert.alert('Error', 'Could not send the message');
    }

    resetForm();

    // * display local notificaion
    scheduleLocalNotification();
  };

  return (
    <AppForm
      onSubmit={handleSubmit}
      initialValues={{
        message: '',
      }}
    >
      <AppFormField name='message' placeholder='Message...' />

      <SubmitButton title='Contact seller' />
    </AppForm>
  );
};

export default ContactSellerForm;
