import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import backendService from "../../services/backendAPI";
import moment from "moment";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/featured/?{toddler})",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignInSide(props) {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleFormSubmission(e) {
    e.preventDefault();
    backendService
      .login(email, password)
      .then((response) => {
        if (!response.data.success) {
          console.log("Login unsuccessful");
          return;
        }

        localStorage.setItem("user", JSON.stringify(response.data.info));

        props.cookies.set("token", response.data.token, {
          path: "/",
          expires: moment.unix(response.data.expiresAt).toDate(),
        });

        props.history.push("/users/dashboard");
      })

      .catch((err) => {
        console.log(err);
      });
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleFormSubmission}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/users/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <footer className={classes.footer}>
                <Container maxWidth="lg">
                  <Typography variant="h6" align="center" gutterBottom>
                    JobsHunt
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                  >
                    © Copyright 2021. All rights reserved
                  </Typography>
                </Container>
              </footer>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withCookies(withRouter(SignInSide));
