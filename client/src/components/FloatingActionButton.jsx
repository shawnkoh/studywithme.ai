import React from 'react';
import { connect } from 'react-redux';
import { Fab, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { createTopic } from '../actions';

const styles = theme => ({
  fab: {
  position: 'fixed',
  bottom: theme.spacing.unit * 2,
  right: theme.spacing.unit * 2,
  }
});

const FloatingActionButton = ({handleFabSubmit, classes, dispatch}) => {
  return (
    <Fab onClick={() => dispatch(createTopic('new title', 'description'))} type='submit' color='primary' aria-label='Add' className={classes.fab}>
      <Add />
    </Fab>
  )
}

const mapStateToProps = (state) => ({
  handleFabSubmit: state.handleFabSubmit,
});

export default connect(mapStateToProps)(withStyles(styles)(FloatingActionButton));
