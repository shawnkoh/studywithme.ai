import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MoreVertRounded, BookRounded, ArrowForwardRounded, DeleteRounded,
} from '@material-ui/icons';
import { IconButton, ListItemIcon, ListItemText } from '@material-ui/core';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

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
          <MenuItem onClick={this.handleClose}>
            <ListItemIcon><BookRounded /></ListItemIcon>
            <ListItemText primary="Revise Now" />
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <ListItemIcon><ArrowForwardRounded /></ListItemIcon>
            <ListItemText primary="Move to subject" />
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
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