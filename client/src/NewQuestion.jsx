import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

class NewQuestion extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  
  handleChange(event) {

  }

  render() {
    return (
      <form>
        <TextField
          fullWidth
          multiline
          placeholder="Add a new question"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default NewQuestion;