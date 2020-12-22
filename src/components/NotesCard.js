/**
 * React Native Project
 * File Name: NotesCard.js
 *    Card object in the Note list view
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '../constants/constants';

class NotesCard extends Component {
  handlePress = (id) => {
    this.props.navigation.replace('Notes', { id: id });
  };

  displayRows = (items) => {
    const rows = [];
    for (let i in items) {
      if (items[i].deleted === false) {
        rows.push(
          <View key={items[i].id} style={styles.rowContainer}>
            <View style={styles.checkbox}></View>
            <Text style={items[i].checked ? styles.rowTextAreaChecked : styles.rowTextAreaUnchecked}>
              {items[i].value}
            </Text>
          </View>
        );
      }
    }
    return rows;
  };

  render() {
    const { content } = this.props;
    let { title, items, id } = content;

    return (
      <TouchableOpacity onPress={() => this.handlePress(id)}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          {this.displayRows(items)}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: Colors.darkGrey,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    height: 10,
    width: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: Colors.darkGrey
  },
  text: {
    color: Colors.white
  },
  rowTextAreaUnchecked: {
    color: Colors.white
  },
  rowTextAreaChecked: {
    color: Colors.fontLight,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  cardTitle: {
    fontSize: 16,
    color: Colors.white
  }
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(null, mapDispatchToProps)(NotesCard);
