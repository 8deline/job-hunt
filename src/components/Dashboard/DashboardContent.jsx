import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import MainBoard from "./MainBoard";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,

    // overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    // overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: `calc(100vh - 96px)`,
  },
  root: {
    flexWrap: "wrap",
    overflowX: "scroll",
    overflowY: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  },
  card: {
    flex: "0 0 auto",
  },
}));

export default function DashboardContent() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <div className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={fixedHeightPaper}>
              {/* <div className={classes.root}>
                <GridList className={classes.gridList} cols={1}>
                  <GridListTile>
                    <div>hahaha</div>
                    <GridListTileBar title="hahhahahahahahaha" />
                  </GridListTile>
                  <GridListTile>
                    <GridListTileBar title="haha" />
                  </GridListTile>
                  <GridListTile>
                    <GridListTileBar title="haha" />
                  </GridListTile>
                  <GridListTile>
                    <GridListTileBar title="haha" />
                  </GridListTile>
                </GridList>
              </div> */}
              <div className={classes.root}>
                <div className={classes.gridList}>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                  <div className={classes.card}>wakakaka</div>
                </div>
              </div>

              {/* <MainBoard /> */}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </main>
  );
}
