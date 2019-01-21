import React, { Component } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import CustomInput from './CustomInput';

class Question extends Component {
  shortenDate = (date) => {
    let formatter = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
    });

    return formatter.format(new Date(date));
  }

  render() {
    let { question } = this.props;
    return (
      <TableRow hover>
        <TableCell width='100%'>
          <CustomInput
            name={question.name}
            value={question.name}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </TableCell>
        <TableCell>
          {question.difficulty}
        </TableCell>
        <TableCell>
          {this.shortenDate(question.next_revision)}
        </TableCell>
      </TableRow>
    )
  }
}

export default Question;