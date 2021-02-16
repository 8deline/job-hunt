import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import MainBoard from "./MainBoard";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: "auto",
    backgroundImage:
      "url(https://source.unsplash.com/featured/?nature,scenery)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  container: {
    maxWidth: "1700px",
    padding: "0",
  },
  paper: {
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
        <div className={fixedHeightPaper}>
          <MainBoard />
        </div>
      </Container>
    </main>
  );
}
