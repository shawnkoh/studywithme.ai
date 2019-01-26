import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, Slide, Stepper, Step, StepLabel, Grid, Button, Paper, Typography, Hidden, } from '@material-ui/core';
import CustomEditor from './CustomEditor';
import { closeQuiz, editQuestion } from '../actions'

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class Quiz extends Component {
  state = {
    activeStep: 0,
  }

  moveNextQuestion = () => {
    const { questions, dispatch } = this.props;
    let { activeStep } = this.state;
    if (activeStep+1 < questions.length) {
      this.setState({ activeStep: activeStep+1 })
    } else {
    }
  }

  handleClose = () => {
    const { dispatch } = this.props;
    this.setState({ activeStep: 0 });
    dispatch( closeQuiz() )
  }

  handleNextQuestion = (difficulty) => {
    const { questions, dispatch } = this.props;
    const { activeStep } = this.state;
    let question = questions[activeStep];

    if (activeStep+1 < questions.length) {
      this.setState({ activeStep: activeStep+1 });
    } else {
      this.handleClose()
    }
    
    let days;
    switch (difficulty) {
      case 'Easy':
        days = 7;
        break
      case 'Okay':
        days = 3;
        break;
      case 'Hard':
        days = 1;
        break
      default:
        return;
    }
    let next_revision = new Date();
    next_revision.setDate(next_revision.getDate() + days)
    let payload = {
      next_revision: next_revision,
      difficulty: difficulty,
    }
    dispatch( editQuestion(question.id, payload) );
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
      <Grid container direction='row' justify='flex-start' alignItems='stretch' style={{padding: 16}}>
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

        <Grid item xs={10} container direction='column' justify='center' alignItems='stretch' style={{padding: 4}} spacing={32}>
          <Grid item container direction='row' justify='space-between' alignItems='stretch'>
            <Grid item>
              <Typography variant='button'>Topic title</Typography>
            </Grid>
            <Grid item>
              <Button onClick={this.handleClose}>Exit</Button>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant='subtitle1'>
              <CustomEditor
                value={questions[activeStep].nameJSON}
                readOnly
              />
            </Typography>
          </Grid>

          <Grid item>
            <Paper>
              <Typography variant='body1'>
              <CustomEditor
                toolbar
                defaultLength={8}
                placeholder='Write your answer here...'
              />
              </Typography>
            </Paper>
          </Grid>

          <Grid item container direction='row' justify='center' alignItems='stretch' spacing={8}>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={() => this.handleNextQuestion('Easy')}
              >
                Easy
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                onClick={() => this.handleNextQuestion('Okay')}
              >
                Okay
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => this.handleNextQuestion('Hard')}
              >
                Hard
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => this.handleNextQuestion('Skip')}>Skip</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>

    )
  }
}

export default connect()(Quiz);

