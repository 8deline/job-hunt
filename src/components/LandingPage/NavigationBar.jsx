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
  title: {
    flexGrow: 1,
  },
  titleLink: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  header: {
    background: "#ffa000",
  },
  links: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      color: "black",
    },
  },
  LoginButton: {
    background: "#ffff00",
    marginRight: theme.spacing(1),
    "&:hover": {
      background: "white",
    },
  },
  SignUpButton: {
    background: "#c6ff00",
    "&:hover": {
      background: "white",
    },
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
            <Link to={`${url}`} className={classes.titleLink}>
              JobsHunt
            </Link>
          </Typography>
          <Button className={classes.LoginButton}>
            <Link to={`${url}users/login`} className={classes.links}>
              Login
            </Link>
          </Button>
          <Button className={classes.SignUpButton}>
            <Link to={`${url}users/register`} className={classes.links}>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
