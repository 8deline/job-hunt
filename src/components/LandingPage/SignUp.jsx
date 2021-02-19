import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import backendService from "../../services/backendAPI";
import { useForm } from "react-hook-form";
import moment from "moment";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import CircularProgressWithLabel from "../Dashboard/Progress";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage:
      "url(https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/9-modern-white-office-desk-top-table-with--and-other-supplies-worachat-nannuan.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formErr: {
    color: "red",
  },
  box: {
    width: "100%",
    height: "40px",
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [formErr, setFormErr] = useState();
  const { register, handleSubmit, errors } = useForm();
  const [progress, setProgress] = useState(10);
  const [progressStatus, setProgressStatus] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [progressStatus]);
  function handleFormSubmission(e) {
    setProgress(10);
    setProgressStatus(true);
    backendService
      .register(firstName, lastName, email, password)
      .then((response) => {
        if (!response.data.success) {
          setProgressStatus(false);
          let errorMessage = response.data.message;
          setFormErr(errorMessage);
          return;
        }
        localStorage.setItem("user", JSON.stringify(response.data.info));
        localStorage.setItem("token", JSON.stringify(response.data.token));

        props.cookies.set("token", response.data.token, {
          path: "/",
          expires: moment.unix(response.data.expiresAt).toDate(),
        });
        setProgressStatus(false);
        setProgress(10);
      })
      .catch((err) => {
        setProgressStatus(false);
        setProgress(10);
        setFormErr("Error occured in form, please check values");
        console.log(err);
      });
  }

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(handleFormSubmission)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <input
                  name="firstName"
                  id="firstName"
                  onChange={handleFirstNameChange}
                  ref={register({
                    required: true,
                    minLength: 2,
                  })}
                  type="text"
                  className={classes.box}
                  disabled={progressStatus}
                  placeholder="First Name"
                />
                {errors.firstName && errors.firstName.type === "required" && (
                  <span className={classes.formErr}>This is required</span>
                )}
                {errors.firstName && errors.firstName.type === "minLength" && (
                  <span className={classes.formErr}>Minimum 2 characters</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  id="lastName"
                  name="lastName"
                  onChange={handleLastNameChange}
                  ref={register({
                    required: true,
                    minLength: 2,
                  })}
                  type="text"
                  className={classes.box}
                  disabled={progressStatus}
                  placeholder="Last Name"
                />
                {errors.lastName && errors.lastName.type === "required" && (
                  <span className={classes.formErr}>This is required</span>
                )}
                {errors.lastName && errors.lastName.type === "minLength" && (
                  <span className={classes.formErr}>Minimum 2 characters</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <input
                  id="email"
                  name="email"
                  onChange={handleEmailChange}
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Entered value does not match email format",
                    },
                  })}
                  type="email"
                  className={classes.box}
                  disabled={progressStatus}
                  placeholder="Email"
                />
                {errors.email && <span>{errors.email.message}</span>}
              </Grid>
              <Grid item xs={12}>
                <input
                  name="password"
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                  ref={register({
                    required: true,
                    minLength: 8,
                  })}
                  className={classes.box}
                  placeholder="Password"
                  disabled={progressStatus}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className={classes.formErr}>This is required</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className={classes.formErr}>Minimum 8 characters</span>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={progressStatus}
              className={classes.submit}
            >
              Sign Up{" "}
              {progressStatus && <CircularProgressWithLabel value={progress} />}
            </Button>
            {formErr !== "" ? (
              <div className={classes.formErr}>
                <span>{formErr}</span>
              </div>
            ) : (
              ""
            )}
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/users/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
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
      </Container>
    </Grid>
  );
}

export default withRouter(withCookies(SignUp));
