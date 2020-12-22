/**
 * React Native Project
 * File Name: App.js
 *
 * Author:
 *  1. Kameshwar Nayak
 *
 */
import React, { Component } from 'react';

import { connect } from 'react-redux';

// Navigation
import NavigationService from './src/navigation/NavigationService';
import Navigation from './src/navigation/Navigation';

import { RealmSchemaMeta } from './src/constants/constants';
import AllNotes from './src/models/AllNotes';
import NotesItem from './src/models/NotesItem';

const Realm = require('realm');

class App extends Component {
  constructor() {
    super();
    global.realm = new Realm({
      schema: [AllNotes, NotesItem],
      schemaVersion: RealmSchemaMeta.version
    });
    global.date = new Date();
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Navigation
          startScreen='NotesList'
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
