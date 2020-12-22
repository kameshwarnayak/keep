/**
 * React Native Project
 * File Name: action.js
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */
import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  changeTitle: ['payload'],
  changeNote: ['payload'],
  deleteItem: ['payload']
});

export { Types, Creators };
