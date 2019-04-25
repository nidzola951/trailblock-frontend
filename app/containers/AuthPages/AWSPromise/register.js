/* eslint-disable */
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

import { getUserPool } from './config';

export default function(email, password) {
  const userPool = getUserPool();
  console.log(userPool);

  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email
    })
  ];
  console.log(attributeList);
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
