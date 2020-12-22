/**
 * React Native Project
 * File Name: actions.js
 *    for global list of types and creators
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */
import { Types as NotesListTypes, Creators as NotesListCreators } from '../views/NotesList/store';
import { Types as NotesTypes, Creators as NotesCreators } from '../views/Notes/store';

const Types = {
  ...NotesListTypes,
  ...NotesTypes
};

const Creators = {
  ...NotesListCreators,
  ...NotesCreators
};

export { Types, Creators };
