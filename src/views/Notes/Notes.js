/**
 * React Native Project
 * File Name: Notes.js
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */
import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { arrayValues, Colors } from '../../constants/constants';
import { isUndef } from '../../constants/functions';
import CheckBox from '@react-native-community/checkbox';
import { Creators as NotesCreators } from './store';

let uuid = require('react-native-uuid');

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      items: null,
      title: null,
      createdOn: null
    };
  }

  handleBack = () => {
    this.props.navigation.replace('NotesList');
  };
  componentDidMount() {
    const { allNotes } = this.props.notesList;
    const { id } = this.props.route.params;
    const { items, title, createdOn } = allNotes[id];
    this.setState({
      id: id,
      items: items,
      title: !isUndef(title) ? title : '',
      createdOn: createdOn
    });
  }

  addNewItem = () => {
    const { items } = this.state;
    let newList = { ...items };
    let newId = uuid.v4();
    let newRow = {
      id: newId,
      value: '',
      checked: false,
      deleted: false,
      createdOn: new Date()
    };
    newList[newId] = newRow;
    this.setState({
      items: newList
    });
  };

  deleteItem = (id) => {
    const { items } = this.state;
    let newList = { ...items };
    newList[id]['deleted'] = true;
    this.setState({
      items: newList
    });
    this.props.onDeleteItem({ id: id });
  };

  checkItem = (id, newValue) => {
    const { items } = this.state;
    let newList = { ...items };
    newList[id]['checked'] = newValue;
    this.setState({
      items: newList
    });
    this.props.onChangeNote({
      id: id,
      noteid: this.state.id,
      value: newList[id]['value'],
      checked: newValue,
      createdOn: newList[id]['createdOn']
    });
  };

  editItem = (id, newValue) => {
    const { items } = this.state;
    let newList = { ...items };
    newList[id]['value'] = newValue;
    this.setState({
      items: newList
    });
    this.props.onChangeNote({
      id: id,
      noteid: this.state.id,
      value: newValue,
      checked: newList[id]['checked'],
      createdOn: newList[id]['createdOn']
    });
  };

  changeTitle = (newTitle) => {
    this.props.onChangeTitle({
      title: newTitle,
      id: this.state.id,
      createdOn: this.state.createdOn
    });
    this.setState({
      title: newTitle
    });
  };

  displayTopbar = () => {
    return (
      <View style={styles.topbarContainer}>
        <TouchableOpacity onPress={() => this.handleBack()}>
          <View style={styles.button}>
            <Image source={require('../../assets/images/back-arrow.png')} style={{ height: 16, width: 16 }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  displayTitle = () => {
    return (
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleTextArea}
          multiline={false}
          placeholder='Title'
          placeholderTextColor={Colors.fontLight}
          onChangeText={(title) => this.changeTitle(title)}
          value={this.state.title}
        />
      </View>
    );
  };
  displayRows = () => {
    const { items } = this.state;
    let rowItems = [];

    for (let i in items) {
      if (items[i].deleted === false) {
        rowItems.push(
          <View key={i} style={styles.rowContainer}>
            <CheckBox
              style={styles.checkboxStyles}
              tintColors={{ true: Colors.darkGrey, false: Colors.lightGrey }}
              disabled={false}
              value={items[i].checked}
              onValueChange={(newValue) => {
                this.checkItem(i, newValue);
              }}
            />
            <TextInput
              style={items[i].checked ? styles.rowTextAreaChecked : styles.rowTextAreaUnchecked}
              multiline={true}
              placeholder=''
              placeholderTextColor={Colors.fontLight}
              onChangeText={(newValue) => this.editItem(i, newValue)}
              value={items[i].value}
            />
            <TouchableOpacity onPress={() => this.deleteItem(items[i].id)} style={styles.addNewRowContainer}>
              <Image source={require('../../assets/images/close.png')} style={styles.deleteSymbol} />
            </TouchableOpacity>
          </View>
        );
      }
    }
    rowItems.push(
      <TouchableOpacity onPress={() => this.addNewItem()} key={uuid.v4()} style={styles.addNewRowContainer}>
        <Image source={require('../../assets/images/plus.png')} style={styles.plusSymbol} />
        <Text style={styles.addNewRowText}>List Item</Text>
      </TouchableOpacity>
    );
    return rowItems;
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar backgroundColor={Colors.dark} barStyle='light-content' />
          {!isUndef(this.state.id) ? (
            <>
              {this.displayTopbar()}
              {this.displayTitle()}
              <ScrollView>{this.displayRows()}</ScrollView>
            </>
          ) : null}
        </SafeAreaView>
      </>
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
  topbarContainer: {
    height: 40,
    justifyContent: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40
  },
  titleContainer: {
    paddingHorizontal: 10
  },
  titleTextArea: {
    color: Colors.fontLight,
    fontSize: 18,
    paddingHorizontal: 15
  },
  rowContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
    // backgroundColor: 'green'
  },
  checkboxStyles: {
    padding: 10
  },
  rowTextAreaUnchecked: {
    color: Colors.white,
    fontSize: 14,
    width: '80%'
  },
  rowTextAreaChecked: {
    color: Colors.fontLight,
    fontSize: 14,
    width: '80%',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  addNewRowContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  plusSymbol: {
    marginRight: 5,
    height: 16,
    width: 16
  },
  deleteSymbol: {
    height: 12,
    width: 12
  },
  addNewRowText: {
    color: Colors.white
  }
});

const mapStateToProps = (state) => ({
  notesList: state.notesListData
});

const mapDispatchToProps = (dispatch) => ({
  onChangeTitle: (payload) => dispatch(NotesCreators.changeTitle(payload)),
  onChangeNote: (payload) => dispatch(NotesCreators.changeNote(payload)),
  onDeleteItem: (payload) => dispatch(NotesCreators.deleteItem(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
