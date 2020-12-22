/**
 * React Native Project
 * File Name: reducers.js
 *    for global list of reducer
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */
import { combineReducers } from 'redux';
import { notesListReducer } from '../views/NotesList/store';

const rootReducer = combineReducers({
  notesListData: notesListReducer
});

export default rootReducer;
