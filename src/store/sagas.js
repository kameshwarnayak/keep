/**
 * React Native Project
 * File Name: sagas.js
 *    for global list of sagas
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */
import { takeLatest } from 'redux-saga/effects';
import { changeNoteSaga, changeTitleSaga, deleteItemSaga } from '../views/Notes/store';
import { getNotesListSaga, addNewNoteSaga } from '../views/NotesList/store';

import { Types } from './actions';

export function* watchAuth() {
  yield takeLatest(Types.GET_NOTES_LIST, getNotesListSaga);
  yield takeLatest(Types.ADD_NEW_NOTE, addNewNoteSaga);

  yield takeLatest(Types.CHANGE_TITLE, changeTitleSaga);
  yield takeLatest(Types.CHANGE_NOTE, changeNoteSaga);
  yield takeLatest(Types.DELETE_ITEM, deleteItemSaga);
}
