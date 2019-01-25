import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableRow, TableCell, Select, MenuItem, Input } from '@material-ui/core';
import { DateTimePicker } from 'material-ui-pickers';
import { editQuestion, openQuestion } from '../actions';
import CustomEditor from './CustomEditor';

const mapStateToProps = (state) => ({
  openedQuestion: state.questions.openedQuestion
});

class Question extends Component {
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
          <CustomEditor
            value={question.nameJSON}
            placeholder='Enter your question here...'
            readOnly
          />
        </TableCell>
        <TableCell>
          <Select
            value={question.difficulty}
            onClick={
              (event) => {
                event.stopPropagation();
              }
            }
            onChange={
              (event) => {
                dispatch( editQuestion(question.id, {difficulty: event.target.value}) )
              }
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
