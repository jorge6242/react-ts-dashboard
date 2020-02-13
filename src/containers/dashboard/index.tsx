import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MenuIcon from "@material-ui/icons/Menu";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useStore } from '../../store';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    }
  }),
);

interface ResponsiveDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children?: any;
  container?: Element;
}

export default function Dashboard(props: ResponsiveDrawerProps) {
  const { container, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { logout } = useStore('useLoginStore')

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handeClick = (path: string) => {
    history.push(path);
  };

  const handleLogout = () => logout()

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={() => handeClick("/dashboard/category")}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Category"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Products"} onClick={() => handeClick("/dashboard/product")} />
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
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.header}>
         <Typography variant="h6" noWrap>
            Condominio
          </Typography>
          <Typography variant="h6" noWrap>
          <Button variant="contained" onClick={() => handleLogout()}>Logout</Button>
          </Typography>
         </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
            {children && children }
      </main>
    </div>
  );
}
