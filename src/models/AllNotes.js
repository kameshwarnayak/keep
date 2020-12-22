/**
 * React Native Project
 * File Name: AllNotes.js
 *    Define 'AllNotes' Database Schema
 *
 * Author(s):
 *  1. Kameshwar Nayak
 */

class AllNotes {}

AllNotes.schema = {
  name: 'AllNotes',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    createdOn: 'date'
  }
};
export default AllNotes;
