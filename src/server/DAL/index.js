/* eslint no-console:0 */
'use strict';

const tedious = require('tedious');
const config = require('../config');

const Connection = tedious.Connection;
const Request = tedious.Request;

module.exports = (sqlQuery, successCallback, failCallback) => {
  const connection = new Connection(config.database);

  connection.on('connect', connected);
  connection.on('infoMessage', infoError);
  connection.on('errorMessage', infoError);
  connection.on('end', end);

  function connected(err) {
    if (err) {
      console.error('database connection failed: ', err);
      return;
    }
    executeStatement();
  }

  function closeConnection() {
    connection.close();
  }

  function executeStatement() {
    const request = new Request(sqlQuery, statementComplete);
    request.on('columnMetadata', columnMetadata);
    request.on('row', row);
    request.on('done', requestDone);

    connection.execSql(request);
  }

  function requestDone(rowCount, more) {
    console.log('rowCount: %s, more: %s', rowCount, more);
    // close connection:
    closeConnection();
  }

  function statementComplete(err, rowCount) {
    if (err) {
      console.log('Statement failed: ' + err);
      failCallback({ error : 'queryFailed', details: err });
    } else {
      console.log(rowCount + ' rows');
    }
  }

  function end() {
    console.log('Connection closed');
  }

  function infoError(info) {
    console.log(info.number + ' : ' + info.message);
  }

  // function debug(message) {
  //   //console.log(message);
  // }

  function columnMetadata(columnsMetadata) {
    columnsMetadata.forEach(
      column => {
        console.log(column);
      }
    );
  }

  function row(columns) {
    let values = '';
    columns.forEach(
      (column) => {
        let value;
        if (column.value === null) {
          value = 'NULL';
        } else {
          value = column.value;
        }
        values = values + value + '\t';
      }
    );
    console.log(values);
  }
};
