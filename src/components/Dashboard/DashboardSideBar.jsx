import React from "react";
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
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import { useRouteMatch } from "react-router";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";

// const DashboardSidebarNavigation = () => {
//   const classes = useStyles();
//   const { url } = useRouteMatch();

//   //   useEffect(() => {
//   //     // alert("Rendering Dashboard Sidebar Navigation");
//   //   }, []);

//   return (
//     <>
//       <div className={classes.root}>
//         <CssBaseline />
//         <Drawer
//           className={classes.drawer}
//           variant="permanent"
//           classes={{
//             paper: classes.drawerPaper,
//           }}
//           anchor="left"
//         >
//           <Toolbar
//             style={{ width: "6rem", height: "auto" }}
//             className={classes.toolbar}
//           >
//             <Link to={`${url}/`} className={classes.logoWithLink}>
//               <img
//                 className={"App-logo"}
//                 width={"100%"}
//                 height={"auto"}
//                 alt="logo"
//               />
//               React.js
//             </Link>
//           </Toolbar>
//           <div className={classes.drawerContainer}>
//             <List>
//               <Link className={classes.link} to={`${url}/inbox`}>
//                 <ListItem button>
//                   <ListItemIcon>
//                     <InboxIcon />
//                   </ListItemIcon>
//                   <ListItemText primary={"inbox"} />
//                 </ListItem>
//               </Link>
//               <Link className={classes.link} to={`${url}`}>
//                 <ListItem button>
//                   <ListItemIcon>
//                     <SettingsIcon />
//                   </ListItemIcon>
//                   <ListItemText primary={"settings and privacy"} />
//                 </ListItem>
//               </Link>
//               <Link className={classes.link} to={`/home`}>
//                 <ListItem button>
//                   <ListItemIcon>
//                     <ExitToAppIcon />
//                   </ListItemIcon>
//                   <ListItemText primary={"logout"} />
//                 </ListItem>
//               </Link>
//             </List>
//           </div>
//         </Drawer>
//       </div>
//     </>
//   );
// };

// export default DashboardSidebarNavigation;

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerContainer: {
//     overflow: "auto",
//   },
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   link: { textDecoration: "none", color: "inherit" },
//   logoWithLink: {
//     display: "flex",
//     alignItems: "center",
//     textDecoration: "none",
//     color: "inherit",
//   },
// }));

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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function DashboardSideBar() {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
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
            <Link to={`${url}`}>
              <ListItemText primary="Dashboard" />
            </Link>
          </ListItem>
        </List>
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Link to={`${url}/inbox`}>
              <ListItemText primary="Inbox" />
            </Link>
          </ListItem>
        </List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
    </div>
  );
}
