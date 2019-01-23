import React from 'react';
import { connect } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Topic from './Topic';

const mapStateToProps = (state) => ({
  isTopicsFetching: state.fetchStatus.isTopicsFetching,
  topics: state.topics,
});

const Topics = ({isTopicsFetching, topics}) => {
  if (isTopicsFetching) {
    return (
      <Grid container justify='center'>
          <CircularProgress />
      </Grid>
    )
  }

  return (
    <Grid container direction='column' justify='center' alignItems='stretch' spacing={24}>
      {Object.values(topics).map(topic => (
        <Grid item xs={12} key={topic.id}>
          <Topic topic={topic} />
        </Grid>
      ))}
    </Grid>
  )
}

export default connect(mapStateToProps)(Topics);
