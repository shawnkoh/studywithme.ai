import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Topic from './Topic';
import QuestionDialog from './QuestionDialog';
import { getQuestionsByTopic } from '../queries';

const mapStateToProps = (state) => ({
  isTopicsFetching: state.fetchStatus.isTopicsFetching,
  isQuestionsFetching: state.fetchStatus.isQuestionsFetching,
  topics: state.topics,
  questions: state.questions,
});

const Topics = ({isTopicsFetching, isQuestionsFetching, topics, questions}) => {
  if (isTopicsFetching || isQuestionsFetching) {
    return (
      <Grid container justify='center'>
          <CircularProgress />
      </Grid>
    )
  }

  return (
    <Fragment>
      <Grid container direction='column' justify='center' alignItems='stretch' spacing={24}>
        {Object.values(topics).map(topic => (
          <Grid item xs={12} key={topic.id}>
            <Topic topic={topic} questions={getQuestionsByTopic(topic.id, questions)} />
          </Grid>
        ))}
      </Grid>

      <QuestionDialog />
    </Fragment>
  )
}

export default connect(mapStateToProps)(Topics);
