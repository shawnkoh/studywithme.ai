import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, CircularProgress } from "@material-ui/core";
import Question from './Question';
import { createQuestion } from '../actions';
import CustomEditor from './CustomEditor';

const mapStateToProps = (state) => ({
  isQuestionsFetching: state.fetchStatus.isTopicsFetching,
  questions: state.questions,
});

const body = (children) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell width='60%'>
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
      {children}
    </TableBody>
  </Table>
)

class Questions extends Component {
  render() {
    const { topic_id, questions, isQuestionsFetching, dispatch } = this.props;
    if (isQuestionsFetching) {
      return (
        body (
          <TableRow>
            <TableCell colSpan={3}>
              <CircularProgress />
            </TableCell>
          </TableRow>
        )
      )
    }

    return (
      body (
        <React.Fragment>
          {Object.values(questions).map(question => {
            if (topic_id === question.topic_id) {
              return (
                <Question
                  question={question}
                  key={question.id}
                />
              )
            };
            return null;
          })}

          <TableRow>
            <TableCell colSpan={3}>
              <CustomEditor
                placeholder='New question'
                handleSave={
                  (value, valueJSON) => {
                    let payload = {
                      topic_id: topic_id,
                      name: value,
                      nameJSON: valueJSON
                    };
                    dispatch( createQuestion(payload) );
                  }
                }
                clearAfterSave
              />
            </TableCell>
          </TableRow>
        </React.Fragment>
      )
    )
  }
}

export default connect(mapStateToProps)(Questions);
