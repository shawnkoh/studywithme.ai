import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';

const styles = theme => ({

});

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = {
      disableUnderline: true,
      focus: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({ disableUnderline: false });
  }

  handleMouseLeave = () => {
    this.setState(previousState => ({ disableUnderline: !previousState.focus }));
  }

  handleFocus = () => {
    this.setState({ focus: true });
  }

  handleBlur = (event) => {
    const { defaultValue, action, allowActionBlank, clearAfterAction } = this.props;
    this.setState({ disableUnderline: true, focus: false })

    if (!action) {
      return;
    }

    if (defaultValue && event.target.value === defaultValue) {
      return;
    }

    if (!allowActionBlank && !event.target.value) {
      if (defaultValue) {
        event.target.value = defaultValue;
      }
      return;
    }

    if (allowActionBlank && !event.target.value && !defaultValue) {
      return;
    }
    
    action(event.target.value);

    if (clearAfterAction) {
      event.target.value = '';
    }
  }

  render() {
    const { multiline, defaultValue, placeholder, fullWidth } = this.props;
    const { disableUnderline } = this.state;
    return (
      <Input
        required
        fullWidth={fullWidth}
        multiline={multiline}
        autoComplete='off'
        disableUnderline={disableUnderline}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    );
  }
}

export default withStyles(styles)(CustomInput);
