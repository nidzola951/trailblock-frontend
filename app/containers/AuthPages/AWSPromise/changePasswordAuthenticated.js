/* eslint-disable */
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

import { getUserPool } from './config';

export default function(username, oldPassword, newPassword) {
  var data = { UserPoolId: 'us-east-2_GpQV5Ufz4', ClientId: '494eusi2c6dk8gq12pt0khtart' };
  var userPool = new CognitoUserPool(data);
  var cognitoUser = userPool.getCurrentUser();

  console.log(cognitoUser);

  if (cognitoUser != null) {
    return new Promise((resolve, reject) => {
      cognitoUser.getSession(function(err, session) {
        if (err) {
          reject(err);
          console.log('ovde');
          return;
        }
        cognitoUser.changePassword(oldPassword, newPassword, function(err, data) {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        });
      });
    });
  }
}
