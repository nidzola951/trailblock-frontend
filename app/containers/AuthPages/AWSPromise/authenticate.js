/* eslint-disable */
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import { getUserPool, setCurrentUserSession } from './config';

export default function(username, password) {
  const authenticationData = {
    Username: username,
    Password: password
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: username,
    Pool: getUserPool()
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result) {
        setCurrentUserSession(cognitoUser);
        console.log(cognitoUser);
        resolve(result);
      },
      onFailure(err) {
        reject(err);
      },
      newPasswordRequired(userAttributes, requiredAttributes) {
        setCurrentUserSession(cognitoUser);
        reject({
          code: 'PasswordResetRequiredException',
          message: 'New Password Required',
          newPasswordRequired: true
        });
      }
    });
  });
}
