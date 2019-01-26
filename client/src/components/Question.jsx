import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableRow, TableCell, Select, MenuItem, Input, Badge } from '@material-ui/core';
import { DateTimePicker } from 'material-ui-pickers';
import { editQuestion, openQuestion } from '../actions';
import CustomEditor from './CustomEditor';

// TODO: Highlight the Next Revision fields instead of surrounding it with a badge, need to learn how to inject CSS using MaterialUI's themes

const mapStateToProps = (state) => ({
  openedQuestion: state.questions.openedQuestion
});

class Question extends Component {
  render() {
    let { question, dispatch, openedQuestion } = this.props;
    return (
      <TableRow
        hover
        selected={openedQuestion === question.id}
      >
        <TableCell
          onClick={
            () => {
              if (openedQuestion !== question.id) {
                dispatch( openQuestion(question.id) )
              }
            }
          }
        >
          <CustomEditor
            value={question.nameJSON}
            placeholder='Enter your question here...'
            readOnly
          />
        </TableCell>
        <TableCell>
          <Select
            value={question.difficulty}
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
          <Badge color='secondary' badgeContent='!' invisible={!question.next_revision || new Date() < new Date(question.next_revision)}>
            <DateTimePicker
              value={question.next_revision}
              onChange={
                (date) => {dispatch( editQuestion(question.id, {next_revision: date}) )}              
              }
              clearable
              format={'MMM d h:mm aa'}
            />
          </Badge>
        </TableCell>
      </TableRow>
    )
  }
}

export default connect(mapStateToProps)(Question);
