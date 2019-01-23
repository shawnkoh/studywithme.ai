import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableRow, TableCell } from '@material-ui/core';
import CustomInput from './CustomInput';
import { DateTimePicker } from 'material-ui-pickers';
import { editQuestion } from '../actions';

class Question extends Component {

  shortenDate = (date) => {
    if (!date) {
      return;
    }

    let formatter = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
    });

    return formatter.format(new Date(date));
  }

  render() {
    let { question, dispatch } = this.props;
    return (
      <TableRow hover>
        <TableCell>
          <CustomInput
            defaultValue={question.name}
            allowActionBlank
            action={
              (name) => {dispatch( editQuestion(question.id, {name: name}) )}
            }
          />
        </TableCell>
        <TableCell>
          <CustomInput
            defaultValue={question.difficulty}
            allowActionBlank
            action={
              (difficulty) => {dispatch( editQuestion(question.id, {difficulty: difficulty}) )}
            }
          />
        </TableCell>
        <TableCell>
          <DateTimePicker
            value={question.next_revision}
            onChange={
              (date) => {dispatch( editQuestion(question.id, {next_revision: date}) )}              
            }
            clearable
          />
        </TableCell>
      </TableRow>
    )
  }
}

export default connect()(Question);