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
      initialValue: this.props.value,
      disableUnderline: true,
    };
  }

  componentDidMount() {
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

  handleBlur = () => {
    this.setState({ disableUnderline: true, focus: false });
    if (this.props.value === '') {
      // reload initial value
    } else {
      this.form.current.dispatchEvent(new Event('submit'));
    }
  }

  render() {
    const { handleSubmit, value, handleChange } = this.props;
    const { disableUnderline} = this.state;
    return (
      <form ref={this.form} onSubmit={handleSubmit} name={this.props.name}>
        <Input
          required
          fullWidth
          multiline={this.props.multiline}
          autoComplete='off'
          name={this.props.name}
          disableUnderline={disableUnderline}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={value}
          onChange={handleChange}
        />
      </form>
    );
  }
}

export default withStyles(styles)(CustomInput);
