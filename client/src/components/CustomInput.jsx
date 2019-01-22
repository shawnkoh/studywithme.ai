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
    const { defaultValue, action } = this.props;
    this.setState({ disableUnderline: true, focus: false });

    if (event.target.value) {
      if (event.target.value !== defaultValue ) {
        action(event.target.value);
      }
    } else {
      event.target.value = defaultValue;
    }
  }

  render() {
    const { multiline, defaultValue } = this.props;
    const { disableUnderline } = this.state;
    return (
      <Input
        required
        fullWidth
        multiline={multiline}
        autoComplete='off'
        disableUnderline={disableUnderline}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        defaultValue={defaultValue}
      />
    );
  }
}

export default withStyles(styles)(CustomInput);
