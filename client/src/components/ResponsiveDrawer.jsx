import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import {
  ArrowBackRounded, TagFacesRounded, Settings, FaceRounded, ListRounded, StoreRounded,
} from '@material-ui/icons';
import { CssBaseline, Badge, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { overdueQuestions } from '../queries';
import Search from './Search';
import { openSupport } from '../actions';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    // backgroundColor: "#353C57",
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { overdue, classes, theme, dispatch } = this.props;
    const drawer = (
      <div>
        <Toolbar>
          <Typography variant='subtitle1'>
            studywithme.ai
          </Typography>
        </Toolbar>

        <Divider />

        <ListItem disabled button>
          <ListItemIcon>
            <FaceRounded />
          </ListItemIcon>
          <ListItemText primary="shawnkoh" />
        </ListItem>

        <Divider />

        <List component="nav">
          <ListItem button selected>
            <Badge color="secondary" badgeContent={overdue.length}>
              <ListItemIcon><ListRounded /></ListItemIcon>
              <ListItemText primary="Topics" />
            </Badge>
          </ListItem>

          <ListItem disabled button>
            <ListItemIcon><StoreRounded /></ListItemIcon>
            <ListItemText primary="Archived" />
          </ListItem>
        </List>

        <Divider />

        <List component="nav">
          <ListItem disabled button>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>

          <ListItem button onClick={() => dispatch( openSupport() )}>
            <ListItemIcon><TagFacesRounded /></ListItemIcon>
            <ListItemText primary="About me" />
          </ListItem>

          <ListItem disabled button>
            <ListItemIcon><ArrowBackRounded /></ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Search />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  overdue: overdueQuestions(state.questions),
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ResponsiveDrawer));
