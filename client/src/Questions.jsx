import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from "@material-ui/core";
import CustomInput from './CustomInput';

class Questions extends Component {
  handleChange = () => {

  }

  handleSubmit = () => {

  }

  shortenDate = (date) => {
    let formatter = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
    });

    return formatter.format(new Date(date));
  }

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
          {this.props.questions.map(qn => {
            return (
              <TableRow hover>
                <TableCell width='100%'>
                  <CustomInput
                    name={qn.name}
                    value={qn.name}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                  />
                </TableCell>
                <TableCell>
                  {qn.difficulty}
                </TableCell>
                <TableCell>
                  {this.shortenDate(qn.next_revision)}
                </TableCell>
              </TableRow>
            )
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