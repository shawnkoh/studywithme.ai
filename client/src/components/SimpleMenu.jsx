import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MoreVertRounded, BookRounded, ArrowForwardRounded, DeleteRounded,
} from '@material-ui/icons';
import { IconButton, ListItemIcon, ListItemText, Badge } from '@material-ui/core';
import ConditionalWrap from './ConditionalWrap';

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
    this.props.handleDelete();
    this.handleClose();
  };

  handleReviseNow = () => {
    this.props.handleReviseNow();
    this.handleClose();
  }

  render() {
    const { overdue } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <ConditionalWrap
            condition={overdue}
            wrap={children => <Badge color='secondary' badgeContent={overdue}>{children}</Badge>}
          >
            <MoreVertRounded />
          </ConditionalWrap>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleReviseNow}>
            <ConditionalWrap
              condition={overdue}
              wrap={children=> <Badge color='secondary' badgeContent={overdue}>{children}</Badge>}
            >
              <ListItemIcon><BookRounded /></ListItemIcon>
              <ListItemText primary="Revise Now" />
            </ConditionalWrap>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <ListItemIcon><ArrowForwardRounded /></ListItemIcon>
            <ListItemText primary="Move to subject" />
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