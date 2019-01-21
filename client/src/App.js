import React, { Component } from 'react';
import axios from 'axios';
import {
  withStyles, CssBaseline,
} from '@material-ui/core';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import Topics from './components/Topics';
import AddTopic from './components/AddTopic';
import NotificationsSwitch from './components/notifications-switch';
import UserSettings from './components/user-settings';
import FetchButton from './components/FetchButton';
import { actions } from './store/actions';

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
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.getTopics();
    this.getQuestions();
  }

  getTopics = () => {
    axios.get('/api/topics')
      .then(res => this.setState({ topics: res.data }));
  }

  getQuestions = () => {
    axios.get('/api/questions')
      .then(res => this.setState({ questions: res.data }));
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
    const { topics, questions } = this.state;
    const { classes } = this.props;
    if (topics) {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <ResponsiveDrawer />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <FetchButton />
            <NotificationsSwitch />
            <hr />
            <UserSettings />
            <Topics topics={topics} questions={questions} />
            <AddTopic handleSubmit={this.handleAddTopicSubmit} />
          </main>
        </div>
      );
    }
    return null;
  }
}

export default withStyles(styles)(App);
