/**
 * React Native Project
 * File Name: saga.js
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */

import { put } from 'redux-saga/effects'; //Read About it @ https://redux-saga.js.org/
import { isUndef } from '../../../constants/functions';

import { Creators as NotesListCreators } from '../../NotesList/store/action';

/**
 * Function: changeTitleSaga
 *    Change Title
 *
 * params:
 *    nil
 */
export function* changeTitleSaga(action) {
  try {
    let { id, title, createdOn } = action.payload;

    yield global.realm.write(() => {
      global.realm.create(
        'AllNotes',
        {
          id: id,
          title: title,
          createdOn: createdOn
        },
        true
      );
    });

    yield put(NotesListCreators.getNotesList({}));
  } catch (err) {
    console.log('Change Title error - ', err);
  }
}

/**
 * Function: changeNoteSaga
 *    Change Note text
 *
 * params:
 *    nil
 */
export function* changeNoteSaga(action) {
  try {
    let { id, noteid, value, checked, createdOn } = action.payload;

    yield global.realm.write(() => {
      global.realm.create(
        'NotesItem',
        {
          id: id,
          noteid: noteid,
          value: value,
          checked: checked,
          createdOn: createdOn
        },
        true
      );
    });

    yield put(NotesListCreators.getNotesList({}));
  } catch (err) {
    console.log('Change Title error - ', err);
  }
}

/**
 * Function: deleteItemSaga
 *    Delete Note item
 *
 * params:
 *    nil
 */
export function* deleteItemSaga(action) {
  try {
    let { id } = action.payload;

    yield global.realm.write(() => {
      let query = 'id="' + id + '"';
      let noteItemObj = global.realm.objects('NotesItem').filtered(query);
      realm.delete(noteItemObj);
    });

    yield put(NotesListCreators.getNotesList({}));
  } catch (err) {
    console.log('Delete Note error - ', err);
  }
}
