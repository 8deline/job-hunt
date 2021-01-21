import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    background: "#512da8",
  },
  links: {
    textDecoration: "none",
    "&&:hover": {
      textDecoration: "none",
    },
    color: "white",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { url } = useRouteMatch();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to={`${url}`} className={classes.links}>
              JobsHunt
            </Link>
          </Typography>
          <Button>
            <Link to={`${url}login`} className={classes.links}>
              Login
            </Link>
          </Button>
          <Button>
            <Link to={`${url}register`} className={classes.links}>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
