import client from './client';

const attachExpoTokenToUser = token =>
  client.post('/expoPushTokens', { token });

export default {
  attachExpoTokenToUser,
};
