import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchTopics,
  fetchQuestions,
} from '../actions';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import {
  withStyles, CssBaseline,
} from '@material-ui/core';
import Topics from '../components/Topics';
import FloatingActionButton from '../components/FloatingActionButton';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  }
});

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTopics());
    dispatch(fetchQuestions());
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <ResponsiveDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Topics />
          <FloatingActionButton />
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  topics: state.topics,
});

export default connect(mapStateToProps)(withStyles(styles)(App));
