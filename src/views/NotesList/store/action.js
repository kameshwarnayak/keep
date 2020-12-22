/**
 * React Native Project
 * File Name: action.js
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */
import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  updateNotesListReducer: ['payload'],
  getNotesList: ['payload'],
  addNewNote: ['payload']
});

export { Types, Creators };
