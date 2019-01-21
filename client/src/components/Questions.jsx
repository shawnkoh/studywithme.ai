import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from "@material-ui/core";
import CustomInput from './CustomInput';
import Question from './Question';

class Questions extends Component {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width='100%'>
              <TableSortLabel>Question</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Difficulty</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Next Revision</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {this.props.questions.map(question => {
            if (this.props.topic_id === question.topic_id) {
              return (
                <Question question={question} />
              )
            };
            return null;
          })}

          <TableRow>
            <TableCell colSpan={3}>
              <CustomInput
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default Questions;