import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import MainBoard from "./MainBoard";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: "auto",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2550&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  container: {
    // paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(2),
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    maxWidth: "1700px",
    padding: "0",
  },
  paper: {
    // padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: `calc(100vh - 64px)`,
  },
}));

export default function DashboardContent() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container className={classes.container}>
        {/* <Grid container spacing={3}> */}
        {/* <Grid item xs={12}> */}
        <div className={fixedHeightPaper}>
          <MainBoard />
        </div>
        {/* </Grid> */}
        {/* </Grid> */}
      </Container>
    </main>
  );
}
