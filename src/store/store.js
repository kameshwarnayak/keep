/**
 * React Native Project
 * File Name: store.js
 *    For global store
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import { watchAuth } from './sagas';

const composeEnhancers = compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
