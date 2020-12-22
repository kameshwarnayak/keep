/**
 * React Native Project
 * File Name: reducer.js
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */

import { createReducer } from 'reduxsauce';
import { Types } from './action';

const INITIAL_STATE = {};

const HANDLERS = {};

export const notesReducer = createReducer(INITIAL_STATE, HANDLERS);
