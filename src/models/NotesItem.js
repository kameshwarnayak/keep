/**
 * React Native Project
 * File Name: NotesItem.js
 *    Define 'NotesItem' Database Schema
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */

class NotesItem {}

NotesItem.schema = {
  name: 'NotesItem',
  primaryKey: 'id',
  properties: {
    id: 'string',
    noteid: 'string',
    value: 'string',
    checked: 'bool',
    createdOn: 'date'
  }
};
export default NotesItem;
