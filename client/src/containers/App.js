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


/*
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchTopics } from './store/actions';
import {
  withStyles, CssBaseline,
} from '@material-ui/core';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import Topics from './components/Topics';
import AddTopic from './components/AddTopic';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  grid: {
  },
  gridItem: {
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTopics());
  }
  
  handleAddTopicSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/topics', {
      title: 'New Topic',
      description: 'New Topic Description',
    })
      .then(res => this.setState(prevState => ({ topics: prevState.topics.concat(res.data) })));
  }

  handleEditTopicSubmit = (event) => {
    event.preventDefault();
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
          <AddTopic handleSubmit={this.handleAddTopicSubmit} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (state) => ({

})

// export default connect(mapStateToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
// export default withStyles(styles)(App);
*/