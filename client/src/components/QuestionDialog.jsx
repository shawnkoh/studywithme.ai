import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Paper, DialogContentText, DialogActions, Button, Grid } from '@material-ui/core';
import { closeQuestion, editQuestion } from '../actions';
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
    this.setState({ nameValue: value, nameJSON: value })
  }

  handleAnswerChange = ({ value }) => {
    this.setState({ answerValue: value })
  }

  handleSave = () => {
    const { question, dispatch } = this.props;
    let payload = {
      name: Plain.serialize(this.state.nameValue),
      nameJSON: JSON.stringify(this.state.nameJSON.toJSON()),
      answer: Plain.serialize(this.state.answerValue),
    }
    dispatch(editQuestion(question.id, payload));
    dispatch(closeQuestion());
    this.setState({initialised: false});
  }

  handleCancel = () => {
    this.props.dispatch(closeQuestion());
    this.setState({initialised: false});
  }

  render() {
    let { question, topic } = this.props;

    if (!question) {
      return null;
    }

    if (!this.state.initialised) {
      const defaultValue = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      this.setState({
        initialised: true,
        nameValue: Plain.deserialize(question.name || defaultValue),
        answerValue: Plain.deserialize(question.answer || defaultValue),
        nameJSON: Value.fromJSON(question.nameJSON || defaultValue),
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
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps)(QuestionDialog);