import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card, CardHeader, CardActions, CardContent,
  IconButton,
  Collapse,
  LinearProgress,
  Button,
  Badge,
} from '@material-ui/core';
import { ExpandMoreRounded } from '@material-ui/icons';
import SimpleMenu from './SimpleMenu';
import CustomInput from './CustomInput';
import Questions from './Questions';
import { editTopic, openQuiz, } from '../actions';
import { overdueQuestions } from '../queries';

const styles = theme => ({
  progress: {
    flexGrow: 1,
  },
  card: {
  },
});

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  handleReviseNow = () => {
    const { questions, dispatch } = this.props;
    const overdue = overdueQuestions(questions);
    dispatch( openQuiz(overdue) );
  }

  render() {
    const { topic, questions, classes, dispatch } = this.props;
    const overdue = overdueQuestions(questions).length;
    return (
      <Card className={classes.card}>
        <form>
        <CardHeader
          action={
            <SimpleMenu
              overdue={overdue}
              topic={topic}
              questions={questions}
              dispatch={dispatch}
            />
          }
          title={
            <CustomInput
              fullWidth
              defaultValue={topic.title}
              action={(newTitle) => {dispatch( editTopic(topic.id, {title: newTitle}) )}}
              placeholder='Title'
              allowActionBlank={true}
            />
          }
          subheader={
            <CustomInput
              fullWidth
              defaultValue={topic.description}
              multiline
              action={(newDescription) => {dispatch( editTopic(topic.id, {description: newDescription}) )}}
              placeholder='Description'
              allowActionBlank={true}
            />
          }
        />
        </form>

        <CardActions>
          <LinearProgress
            width='100%'
            variant='determinate'
            value={66}
            className={classes.progress}
          />
          <Badge color='secondary' badgeContent={overdue}>
            <Button
              disabled={overdue === 0}
              onClick={this.handleReviseNow}
            >
            Revise Now
          </Button>
          </Badge>
          <IconButton onClick={this.handleExpandClick}>
            <ExpandMoreRounded />
          </IconButton>
        </CardActions>

        <Collapse in={this.state.expanded} time="auto" unmountOnExit>
          <CardContent>
            <Questions topic_id={topic.id} />
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

export default connect()(withStyles(styles, { withTheme: true})(Topic));

Topic.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
