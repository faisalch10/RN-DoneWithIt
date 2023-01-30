import { useState, Fragment } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';

import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from '../components/forms';
import Screen from '../components/Screen';
import useAuth from '../auth/useAuth';
import useHttp from '../hooks/useHttp';
import authAPI from '../api/auth';
import userAPI from '../api/users';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const RegisterScreen = () => {
  const [error, setError] = useState('');
  const { logIn } = useAuth();
  const registerAPI = useHttp(userAPI.register);
  const loginAPI = useHttp(authAPI.login);

  const handleSubmit = async userInfo => {
    const result = await registerAPI.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError('Unexpected error occurred.');
      }

      return;
    }

    const { data: token } = await loginAPI.request(
      userInfo.email,
      userInfo.password
    );
    logIn(token);
  };

  return (
    <Fragment>
      <ActivityIndicator visible={registerAPI.loading || loginAPI.loading} />
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo-red.png')} />

        <AppForm
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />

          <AppFormField
            autoCorrect={false}
            icon='account'
            placeholder='Name'
            name='name'
          />

          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='email'
            keyboardType='email-address'
            placeholder='Email'
            name='email'
          />

          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock'
            placeholder='Password'
            secureTextEntry
            name='password'
          />
          <SubmitButton title='Register' />
        </AppForm>
      </Screen>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default RegisterScreen;
