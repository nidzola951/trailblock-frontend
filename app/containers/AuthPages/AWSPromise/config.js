/* eslint-disable */
import { Config, CognitoIdentityCredentials } from 'aws-sdk';

import { CognitoUserPool } from 'amazon-cognito-identity-js';

const appConfig = {
  region: 'us-east-2',
  IdentityPoolId: '',
  UserPoolId: 'us-east-2_GpQV5Ufz4',
  ClientId: '494eusi2c6dk8gq12pt0khtart'
};

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId
});

let currentUser;

export const get = () => appConfig;

export const getUserPool = () => userPool;

export const getUser = () => userPool.getCurrentUser();

export const setCurrentUserSession = user => {
  console.log('setujemm usera');
  console.log(user);
  currentUser = user;
};

export const getCurrentUserSession = () => currentUser;
