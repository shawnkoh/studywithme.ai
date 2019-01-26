import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, Slide, Stepper, Step, StepLabel, Grid, Button, Paper, Typography, } from '@material-ui/core';
import CustomEditor from './CustomEditor';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class Quiz extends Component {
  state = {
    activeStep: 0,
  }
  render() {
    const { open, questions } = this.props
    const { activeStep } = this.state;
    if (!questions) return null;

    return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
    >
      <Grid container direction='row' justify='flex-start' alignItems='stretch'>
        <Grid item xs>
          <Stepper
            activeStep={activeStep}
            orientation='vertical'
          >
            {questions.map(question => (
              <Step key={question.id}>
                <StepLabel>Question {question.id}</StepLabel>
              </Step>
            ))}
            </Stepper>
        </Grid>

        <Grid item xs={10}>
          <Grid container direction='column' spacing={32} justify='center' alignItems='stretch'>
            <Grid item>
              <Button>Exit</Button>
            </Grid>

            <Grid item>
              <Typography>MA1301</Typography>
            </Grid>

            <Grid item>
              <Paper>
                <CustomEditor readOnly />
              </Paper>
            </Grid>

            <Grid item>
              <Paper>
                <CustomEditor toolbar defaultLength={8} />
              </Paper>
            </Grid>

            <Grid item>
              <Grid container direction='row' justify='center' alignItems='stretch' spacing={8}>
                <Grid item>
                  <Button variant='contained' color='primary'>Easy</Button>
                </Grid>
                <Grid item>
                  <Button variant='contained'>OK</Button>
                </Grid>
                <Grid item>
                  <Button variant='contained' color='secondary'>Hard</Button>
                </Grid>
                <Grid item>
                  <Button>Skip</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>

    )
  }
}

export default connect()(withStyles(styles, { withTheme: true})(Quiz));