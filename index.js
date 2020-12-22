/**
 * React Native Project
 *
 * File Name: index.js
 *
 * Author:
 *  1. Kameshwar Nayak
 *
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';

import { store } from './src/store/store';
const app = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => app);
