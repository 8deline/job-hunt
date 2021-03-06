import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import { useRouteMatch } from "react-router";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import moment from "moment";
import backendAPI from "../../services/backendAPI";
import ListIcon from "@material-ui/icons/List";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  menuLinks: {
    textDecoration: "none",
    color: "black",
  },
  profileMenu: {
    color: "white",
    backgroundColor: "#9e9e9e",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
  span: {
    fontWeight: "bold",
  },
  activity: {
    marginBottom: "3%",
    marginLeft: "5%",
    marginRight: "5%",
    textAlign: "justify",
  },
  activityTime: {
    color: "grey",
    fontStyle: "italic",
  },
  activityHeading: {
    marginLeft: "5%",
    marginBottom: "3%",
  },
  activitylist: {
    padding: "0",
  },
  activitytext: {
    fontSize: "1.5em",
    marginLeft: "-5%",
  },
  activityIcon: {
    color: "black",
    fontSize: "2em",
  },
}));

function DashboardSideBar(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNotification, setAnchorNotification] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNotification = (event) => {
    getNotification();
    setAnchorNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    getNotification();
    setAnchorNotification(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleLogout(e) {
    e.preventDefault();
    props.cookies.remove("token", { path: "/" });
    localStorage.removeItem("user");
    props.history.push("/");
    return;
  }

  function isAuthenticated() {
    const token = props.cookies.get("token");
    if (!token || token === "undefined" || token === "null") {
      return false;
    }
    return true;
  }

  function getNotification() {
    backendAPI
      .notification()
      .then((res) => {
        setNotification(res.data.allResult.activity.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getNotification();
  }, []);

  const notificationMsg = [];
  notification?.forEach((element) => {
    if (element.description === "deleted") {
      notificationMsg.push(
        <div className={classes.activity}>
          <Typography>
            You {element.description}{" "}
            <span className={classes.span}>
              {element.status || element.companyname + ", " + element.jobname}
            </span>
          </Typography>
          <Typography variant="caption" className={classes.activityTime}>
            {moment(element.created_at).fromNow()}
          </Typography>
        </div>
      );
    } else if (element.description === "added") {
      notificationMsg.push(
        <div className={classes.activity}>
          <Typography>
            You {element.description}{" "}
            <span className={classes.span}>
              {element.companyname
                ? element.companyname + ", " + element.jobname
                : "" || element.status}
            </span>{" "}
            {element.companyname ? "to " + element.status : " to this board"}
          </Typography>
          <Typography variant="caption" className={classes.activityTime}>
            {moment(element.created_at).fromNow()}
          </Typography>
        </div>
      );
    } else if (element.description === "moved") {
      notificationMsg.push(
        <div className={classes.activity}>
          <Typography gutterBottom>
            You {element.description}{" "}
            <span className={classes.span}>
              {element.companyname + ", " + element.jobname}
            </span>{" "}
            from {element.olditem} to {element.status}
          </Typography>
          <Typography variant="caption" className={classes.activityTime}>
            {moment(element.created_at).fromNow()}
          </Typography>
        </div>
      );
    } else if (element.description === "updated") {
      notificationMsg.push(
        <div className={classes.activity}>
          <Typography>
            You {element.description}{" "}
            {element.editnontitle
              ? "details from "
              : "from " +
                element.olditem +
                (element.olditemjob ? ", " + element.olditemjob : "") +
                " to "}
            <strong>
              {element.status || element.companyname + ", " + element.jobname}{" "}
            </strong>
          </Typography>
          <Typography variant="caption" className={classes.activityTime}>
            {moment(element.created_at).fromNow()}
          </Typography>
        </div>
      );
    } else if (element.description === "rearranged") {
      notificationMsg.push(
        <div className={classes.activity}>
          <Typography>
            You {element.description} order for{" "}
            <strong>
              {element.status || element.companyname + ", " + element.jobname}{" "}
            </strong>
          </Typography>
          <Typography variant="caption" className={classes.activityTime}>
            {moment(element.created_at).fromNow()}
          </Typography>
        </div>
      );
    }
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>

          <IconButton color="inherit">
            <Badge color="secondary" onClick={handleClickNotification}>
              <NotificationsIcon />
            </Badge>

            <Menu
              id="simple-menu"
              anchorEl={anchorNotification}
              keepMounted
              open={Boolean(anchorNotification)}
              onClose={handleCloseNotification}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              elevation={0}
              getContentAnchorEl={null}
            >
              <div className={classes.activityHeading}>
                <ListItem className={classes.activitylist}>
                  <ListItemIcon>
                    <ListIcon className={classes.activityIcon} />
                  </ListItemIcon>
                  <ListItemText className={classes.textandIcon}>
                    <strong className={classes.activitytext}>Activity</strong>
                  </ListItemText>
                </ListItem>
              </div>
              {notificationMsg.length > 0 ? (
                notificationMsg
              ) : (
                <MenuItem>No new notification</MenuItem>
              )}
            </Menu>
          </IconButton>

          <IconButton>
            <Button
              className={classes.profileMenu}
              startIcon={<AccountCircleIcon />}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {isAuthenticated() && (
                <span>{backendAPI.getCurrentUser().first_name}</span>
              )}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              elevation={0}
              getContentAnchorEl={null}
            >
              <MenuItem>
                <Link to="/" className={classes.menuLinks}>
                  Home
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  onClick={(e) => handleLogout(e)}
                  className={classes.menuLinks}
                >
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Link to={`${url}`} className={classes.menuLinks}>
              <ListItemText primary="Dashboard" className={classes.menuLinks} />
            </Link>
          </ListItem>
        </List>
        <List>
          <ListItem button>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <Link to={`${url}/inbox`} className={classes.menuLinks}>
              <ListItemText primary="Inbox" />
            </Link>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

export default withRouter(withCookies(DashboardSideBar));
