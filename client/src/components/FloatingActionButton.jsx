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

const FloatingActionButton = ({classes, dispatch}) => {
  return (
   <Fab onClick={() => dispatch(createTopic('', ''))} type='submit' color='primary' aria-label='Add' className={classes.fab}>
      <Add />
    </Fab>
  )
}

export default connect()(withStyles(styles)(FloatingActionButton));
