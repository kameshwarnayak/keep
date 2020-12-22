/**
 * React Native Project
 * File Name: Notes.js
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */
import React, { Component } from 'react';

import { SafeAreaView, StyleSheet, StatusBar, View, ScrollView, Image, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import NotesCard from '../../components/NotesCard';
import { Colors } from '../../constants/constants';
import { isUndef } from '../../constants/functions';
import { Creators as NotesListCreators } from './store';

class NotesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onGetNotesList();
  }

  populateLeftRow() {
    const { allNotes } = this.props.notesList;
    let i = 0;
    const items = [];
    for (let index in allNotes) {
      if (i % 2 === 0) {
        let content = allNotes[index];
        items.push(<NotesCard key={index} content={content} navigation={this.props.navigation} />);
      }
      i++;
    }
    return items;
  }

  populateRightRow() {
    const { allNotes } = this.props.notesList;

    let i = 0;
    const items = [];
    for (let index in allNotes) {
      if (i % 2 === 1) {
        let content = allNotes[index];
        items.push(<NotesCard key={index} content={content} navigation={this.props.navigation} />);
      }
      i++;
    }
    return items;
  }

  addNote = () => {
    this.props.onAddNewNote({
      navigation: this.props.navigation
    });
  };

  render() {
    const { allNotes } = this.props.notesList;
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor={Colors.dark} barStyle='light-content' />
        {!isUndef(allNotes) ? (
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.columns}>{this.populateLeftRow()}</View>
              <View style={styles.columns}>{this.populateRightRow()}</View>
            </View>
          </ScrollView>
        ) : null}
        <TouchableOpacity style={styles.addNotesContainer} onPress={() => this.addNote()}>
          <View>
            <Image source={require('../../assets/images/plus.png')} style={{ height: 20, width: 20 }} />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

// Component Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark
  },
  body: {
    flex: 1,
    overflow: 'hidden'
  },
  container: {
    paddingHorizontal: 5,
    paddingTop: 10,
    flexDirection: 'row'
  },
  columns: {
    width: '50%'
  },
  addNotesContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    elevation: 20
  },
  addNotesText: {
    fontSize: 50
  }
});

const mapStateToProps = (state) => ({
  notesList: state.notesListData
});

const mapDispatchToProps = (dispatch) => ({
  onGetNotesList: (payload) => dispatch(NotesListCreators.getNotesList(payload)),
  onAddNewNote: (payload) => dispatch(NotesListCreators.addNewNote(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
