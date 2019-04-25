/* eslint-disable */
import { getCurrentUserSession } from './config';

export default function(username, newpassword, data = null) {
  const cognitoUser = getCurrentUserSession();

  return new Promise((resolve, reject) => {
    cognitoUser.completeNewPasswordChallenge(newpassword, data, {
      onSuccess(result) {
        resolve(result);
      },
      onFailure(err) {
        reject(err);
      }
    });
  });
}
