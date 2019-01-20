import React, { Component } from 'react';
import axios from 'axios';
import {
  withStyles, CssBaseline, Fab, Grid,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import ResponsiveDrawer from './ResponsiveDrawer';
import Topic from './Topic';

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
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.getTopics();
  }

  getTopics = () => {
    axios.get('/api/topics')
      .then(res => this.setState({ topics: res.data }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/topics', {
      title: 'Test',
      description: 'Testing Axios',
    })
      .then(res => this.setState(prevState => ({ topics: prevState.topics.concat(res.data) })));
  }

  render() {
    const { topics } = this.state;
    const { classes } = this.props;
    if (topics) {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <ResponsiveDrawer />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Grid container direction="column" justify="center" alignItems="center" spacing={24} className={classes.grid}>
              {topics.map(topic => {
                return (
                  <Grid item className={classes.gridItem} xs={12}>
                    <Topic id={topic.id} />
                  </Grid>
                )
              })}
            </Grid>

            <form onSubmit={this.handleSubmit}>
              <Fab type="submit" color="primary" aria-label="Add" className={classes.fab}>
                <Add />
              </Fab>
            </form>
          </main>
        </div>
      );
    }
    return null;
  }
}

export default withStyles(styles)(App);
