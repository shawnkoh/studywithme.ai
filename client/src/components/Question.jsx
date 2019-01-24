import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableRow, TableCell, Select, MenuItem, Input } from '@material-ui/core';
import CustomInput from './CustomInput';
import { DateTimePicker } from 'material-ui-pickers';
import { editQuestion, openQuestion } from '../actions';

const mapStateToProps = (state) => ({
  openedQuestion: state.questions.openedQuestion
});

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
    let { question, dispatch, openedQuestion } = this.props;
    return (
      <TableRow
        hover
        onClick={
          () => {
            if (openedQuestion !== question.id) {
              dispatch( openQuestion(question.id) )
            }
          }
        }
        selected={openedQuestion === question.id}
      >
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
          <Select
            value={question.difficulty}
            onChange={
              (event) => {dispatch( editQuestion(question.id, {difficulty: event.target.value}) )}
            }
            displayEmpty
            autoWidth
            input={<Input fullWidth />}
          >
            <MenuItem value="" />
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Okay">Okay</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </Select>
        </TableCell>
        <TableCell>
          <DateTimePicker
            value={question.next_revision}
            onChange={
              (date) => {dispatch( editQuestion(question.id, {next_revision: date}) )}              
            }
            clearable
            format={'MMM d h:mm aa'}
          />
        </TableCell>
      </TableRow>
    )
  }
}

export default connect(mapStateToProps)(Question);
