import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Paper, DialogContentText, DialogActions, Button, Grid } from '@material-ui/core';
import { closeQuestion, editQuestion, deleteQuestion } from '../actions/questions';
import Plain from 'slate-plain-serializer';
import RichTextEditor from './RichTextEditor';
import { Value } from 'slate';

const mapStateToProps = (state) => {
  let { questions, topics } = state;
  let question = questions[questions.openedQuestion]

  if (!question) {
    return {};
  }

  return ({
    question: question,
    topic: topics[question.topic_id]
  })
};

class QuestionDialog extends Component {
  state = {
  }

  handleNameChange = ({ value }) => {
    this.setState({ nameValue: value })
  }

  handleAnswerChange = ({ value }) => {
    this.setState({ answerValue: value })
  }

  handleSave = () => {
    const { question, dispatch } = this.props;
    let payload = {
      name: Plain.serialize(this.state.nameValue),
      nameJSON: JSON.stringify(this.state.nameValue.toJSON()),
      answer: Plain.serialize(this.state.answerValue),
      answerJSON: JSON.stringify(this.state.answerValue.toJSON()),
    }
    dispatch(editQuestion(question.id, payload));
    dispatch(closeQuestion());
    this.setState({initialised: false});
  }

  handleCancel = () => {
    this.props.dispatch(closeQuestion());
    this.setState({initialised: false});
  }

  handleDelete = () => {
    const { question, dispatch } = this.props;
    dispatch( deleteQuestion(question.id) );
  }

  render() {
    let { question, topic } = this.props;

    if (!question) {
      return null;
    }

    if (!this.state.initialised) {
      var nameValue;
      var answerValue;

      if (question.nameJSON) {
        nameValue = Value.fromJSON(JSON.parse(question.nameJSON))
      } else {
        nameValue = Plain.deserialize('');
      }

      if (question.answerJSON) {
        answerValue = Value.fromJSON(JSON.parse(question.answerJSON))
      } else {
        answerValue = Plain.deserialize('');
      }

      this.setState({
        initialised: true,
        nameValue: nameValue,
        answerValue: answerValue,
      })
    }

    return (
      <Dialog
        open={question}
        onClose={this.handleSave}
        fullWidth
        maxWidth='md'
        scroll='body'
      >
        <DialogTitle>{topic.title}</DialogTitle>
        <DialogContent>
          <Grid container direction='column' justify='center' spacing={32}>
            <Grid item>
              <Paper>
                <DialogContentText>Question</DialogContentText>
                <RichTextEditor
                  handleChange={this.handleNameChange}
                  placeholder='What is the question about?'
                  value={this.state.nameValue}
                />
              </Paper>
            </Grid>

            <Grid item>
              <Paper>
                <DialogContentText>Answer</DialogContentText>
                <RichTextEditor
                  handleChange={this.handleAnswerChange}
                  placeholder='What is the answer?'
                  value={this.state.answerValue}
                />
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Grid container direction='row' justify='space-between' alignItems='stretch'>
            <Grid item>
              <Button
                color='secondary'
                onClick={this.handleDelete}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button
                color='primary'
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
              <Button
                color='primary'
                onClick={this.handleSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps)(QuestionDialog);