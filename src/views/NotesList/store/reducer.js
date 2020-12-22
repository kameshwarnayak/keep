/**
 * React Native Project
 * File Name: reducer.js
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */

import { createReducer } from 'reduxsauce';
import { Types } from './action';

const INITIAL_STATE = {
  allNotes: null
};

const updateNotesListReducer = (state = INITIAL_STATE, action) => {
  const { allNotes } = action.payload;

  let returnPayload = { ...state };
  if (allNotes !== undefined) {
    returnPayload = {
      ...returnPayload,
      allNotes
    };
  }

  return returnPayload;
};

const HANDLERS = {
  [Types.UPDATE_NOTES_LIST_REDUCER]: updateNotesListReducer
};

export const notesListReducer = createReducer(INITIAL_STATE, HANDLERS);
