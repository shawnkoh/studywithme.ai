import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody,
  Card, CardHeader, CardActions, CardContent,
  IconButton,
  Collapse,
  CircularProgress, LinearProgress,
} from '@material-ui/core';
import { ExpandMoreRounded } from '@material-ui/icons';
import axios from 'axios';
import SimpleMenu from './SimpleMenu';
import NewQuestion from './NewQuestion';
import CustomInput from './CustomInput';
import Questions from './Questions';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  progress: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
  },
});

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  componentDidMount() {
    this.getTopic();
  }

  getTopic = () => {
    axios.get(`/api/topics/${this.props.id}`)
      .then(res => this.setState({ topic: res.data }));
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  handleChange = (event) => {
    const newTopic = Object.assign({}, this.state.topic);
    newTopic[event.target.name] = event.target.value;
    this.setState({ topic: newTopic });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // there is probably a much better way to do this using FormData; not sure how yet, TBC
    let payload = {[event.target.name]: this.state.topic[event.target.name]};
    axios.patch(`/api/topics/${this.state.topic.id}`, payload);
  }

  render() {
    const { topic } = this.state;
    const { classes, theme } = this.props;

    const shortDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
    });

    if (topic) {
      const table = (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="100%">
                <TableSortLabel>Question</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Difficulty</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Next Revision</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { topic.questions.map(qn => { return (
              <TableRow hover>
                <TableCell width="100%">
                  {qn.name}
                </TableCell>
                <TableCell>
                  {qn.difficulty}
                </TableCell>
                <TableCell>
                  {shortDate.format(new Date(qn.next_revision))}
                </TableCell>
              </TableRow>
            ); })}
            <TableRow>
              <TableCell colSpan={3}>
                <NewQuestion />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      return (
        <Card className={classes.card}>
          <CardHeader
            action={<SimpleMenu />}
            title={
              <CustomInput
              name='title'
              value={topic.title}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              />
            }
            subheader={
              <CustomInput
                name='description'
                multiline='true'
                value={topic.description}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            }
          />
          <CardActions>
            <LinearProgress
              width="100%"
              variant="determinate"
              value={66}
              className={classes.progress}
            />
            <IconButton onClick={this.handleExpandClick}>
              <ExpandMoreRounded />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} time="auto" unmountOnExit>
            <CardContent>
              <Questions questions={topic.questions} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            </CardContent>
          </Collapse>
        </Card>
      );
    }
    return <CircularProgress />;
  }
}

Topic.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Topic);
