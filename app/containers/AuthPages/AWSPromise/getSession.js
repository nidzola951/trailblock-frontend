/* eslint-disable */
import { getUser } from './config';

export default function() {
  const cognitoUser = getUser();

  if (cognitoUser) {
    return new Promise((resolve, reject) => {
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
        } else {
          console.log('session');
          resolve(session);
        }
      });
    });
  }
  throw new Error('no cognitiveUser value');
}
