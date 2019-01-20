import React, { Component } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from "@material-ui/core";
import CustomInput from './CustomInput';

// const Questions = (questions, handleChange, handleSubmit) => {
// function Questions(props) {

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
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default Questions;