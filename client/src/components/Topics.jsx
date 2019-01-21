import React, { Component } from 'react';
import { Grid, withStyles } from "@material-ui/core";
import Topic from "./Topic";

const styles = {
  gridItem: {
  }
}

class Topics extends Component {  
  render() {
    const { topics, questions, classes } = this.props;
    return (
      <Grid container direction="column" justify="center" alignItems="center" spacing={24} className={classes.grid}>
        {topics.map(topic => {
          return (
            <Grid item className={classes.gridItem} xs={12}>
              <Topic topic={topic} questions={questions} />
            </Grid>
          )
        })}
      </Grid>
    )
  }
}

export default withStyles(styles)(Topics);