import React, { Component } from 'react';
import { Fab, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const styles = theme => ({
  fab: {
  position: 'fixed',
  bottom: theme.spacing.unit * 2,
  right: theme.spacing.unit * 2,
  }
});

class AddTopic extends Component {
  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Fab type="submit" color="primary" aria-label="Add" className={classes.fab}>
          <Add />
        </Fab>
      </form>
    )
  }
}

export default withStyles(styles)(AddTopic);
