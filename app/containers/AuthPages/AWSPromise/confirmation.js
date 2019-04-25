/* eslint-disable */
import { CognitoUser } from 'amazon-cognito-identity-js';

import { getUserPool } from './config';

export default function(email, code) {
  const userData = {
    Username: email,
    Pool: getUserPool()
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
