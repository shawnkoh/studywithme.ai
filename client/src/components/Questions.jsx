import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, CircularProgress, Tooltip } from "@material-ui/core";
import Question from './Question';
import { createQuestion } from '../actions';
import CustomEditor from './CustomEditor';
import { getQuestionsByTopic, sortQuestions } from '../queries';

const mapStateToProps = (state) => ({
  isQuestionsFetching: state.fetchStatus.isTopicsFetching,
  questions: state.questions,
});

class Header extends Component {
  renderTableSortLabel = (label, property) => {
    const { sortProperty, sortDirection, sortBy } = this.props;
    return (
      <TableCell>
        <Tooltip
          title='Sort'
          placement='bottom-start'
          enterDelay={300}
        >
          <TableSortLabel active={sortProperty === property} direction={sortDirection} onClick={() => sortBy(property)}>
            {label}
          </TableSortLabel>
        </Tooltip>
      </TableCell>
    )
  }

  // Tags are unsortable for now; have to build a custom tags component first (something like monday.com tags)
  render() {
    return (
      <TableHead>
        <TableRow>
          {this.renderTableSortLabel('Question', 'name')}
          {this.renderTableSortLabel('Difficulty', 'difficulty')}
          {this.renderTableSortLabel('Next Revision', 'next_revision')}
          <TableCell>
            <TableSortLabel>
              Tags
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    )
  }
}

class Questions extends Component {
  state = {
  }

  sortBy = (property) => {
    const { sortProperty, sortDirection } = this.state;
    var direction = 'asc';
    if (sortProperty === property) {
      direction = sortDirection === 'asc' ? 'desc' : 'asc';
    };
    this.setState({sortProperty: property, sortDirection: direction });
  }

  render() {
    const { topic_id, questions, isQuestionsFetching, dispatch } = this.props;
    const { sortProperty, sortDirection } = this.state;
    if (isQuestionsFetching) {
      return (
        <Table>
          <Header sortBy={this.sortBy} sortProperty={sortProperty} sortDirection={sortDirection} />
          <TableBody>
            <CircularProgress />
          </TableBody>
        </Table>
      )
    }

    var sortedQuestions = getQuestionsByTopic(topic_id, questions);
    if (sortProperty && sortDirection) {
      sortedQuestions = sortQuestions(sortedQuestions, sortProperty, sortDirection);
    }

    return (
      <Table>
        <Header sortBy={this.sortBy} sortProperty={sortProperty} sortDirection={sortDirection} />
        <TableBody>
          {sortedQuestions
            .map(question => (
              <Question
                question={question}
                key={question.id}
              />
            )
          )}
          <TableRow>
            <TableCell colSpan={4}>
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
                disableDefaultValue
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default connect(mapStateToProps)(Questions);
