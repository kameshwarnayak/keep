/**
 * React Native Project
 * File Name: saga.js
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */

import { put } from 'redux-saga/effects'; //Read About it @ https://redux-saga.js.org/
import { isUndef } from '../../../constants/functions';

import { Creators as NotesListCreators } from './action';
let uuid = require('react-native-uuid');

/**
 * Function: getNotesListSaga
 *    Get Notes Details
 *
 * params:
 *    nil
 */
export function* getNotesListSaga(action) {
  try {
    let allNotes = {};
    let allNotesObj = global.realm.objects('AllNotes').sorted('createdOn', true);
    let notesItemObj = global.realm.objects('NotesItem');
    for (let notes of allNotesObj) {
      let notesObj = {
        id: notes.id,
        title: notes.title,
        items: {},
        createdOn: notes.createdOn
      };

      let query = 'noteid="' + notes.id + '"';
      let curNotesItems = notesItemObj.filtered(query).sorted('createdOn');
      for (let item of curNotesItems) {
        notesObj['items'][item.id] = {
          id: item.id,
          value: item.value,
          checked: item.checked,
          deleted: false,
          createdOn: item.createdOn
        };
      }
      allNotes[notes.id] = notesObj;
    }
    let payload = { allNotes };

    yield put(NotesListCreators.updateNotesListReducer(payload));
  } catch (err) {
    console.log('Notes get error - ', err);
    // yield put(Creators.fetchLandingDataFailure({ err }));
  }
}
/**
 * Function: addNewNoteSaga
 *    Get Notes Details
 *
 * params:
 *    nil
 */
export function* addNewNoteSaga(action) {
  try {
    let { navigation } = action.payload;

    let newId = uuid.v4();
    yield global.realm.write(() => {
      global.realm.create(
        'AllNotes',
        {
          id: newId,
          title: '',
          createdOn: new Date()
        },
        true
      );
    });
    yield put(NotesListCreators.getNotesList({}));
    navigation.replace('Notes', { id: newId });
  } catch (err) {
    console.log('Notes add error - ', err);
  }
}
