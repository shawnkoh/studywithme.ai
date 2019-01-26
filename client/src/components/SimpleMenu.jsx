import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MoreVertRounded, BookRounded, ArrowForwardRounded, DeleteRounded,
} from '@material-ui/icons';
import { IconButton, ListItemIcon, ListItemText, } from '@material-ui/core';
import { deleteTopic, openQuiz } from '../actions';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDelete = () => {
    const { topic, dispatch } = this.props;
    dispatch(deleteTopic(topic.id));
    this.handleClose();
  }
  
  handleReviseAll = () => {
    const { questions, dispatch } = this.props;
    dispatch(openQuiz(questions));
    this.handleClose();
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertRounded />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleReviseAll}>
            <ListItemIcon><BookRounded /></ListItemIcon>
            <ListItemText primary="Revise All" />
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <ListItemIcon><ArrowForwardRounded /></ListItemIcon>
            <ListItemText primary="Move to topic" />
          </MenuItem> 
          <MenuItem onClick={this.handleDelete}>
            <ListItemIcon>
              <DeleteRounded />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;