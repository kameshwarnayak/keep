/**
 * React Native Project
 * File Name: Navigation.js
 *    Define the routes
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Notes from '../views/Notes/Notes';
import NotesList from '../views/NotesList/NotesList';
import { isUndef } from '../constants/functions';

const Stack = createStackNavigator();

export default class Navigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={!isUndef(this.props.startScreen) ? this.props.startScreen : 'NotesList'}
        >
          <Stack.Screen name='NotesList' component={NotesList} />
          <Stack.Screen name='Notes' component={Notes} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
