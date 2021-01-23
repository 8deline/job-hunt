import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/featured/?{coding})",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "70vh",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.6)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(9),
      paddingRight: 0,
    },
    width: "80%",
    margin: "0 auto",
  },
  links: {
    color: "white",
    fontSize: "20px",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  card: {
    display: "flex",
    height: "50vh",
  },
  cardDetails: {
    flex: 1,
  },
  cardcontentpara: {
    marginBottom: "10%",
    textAlign: "justify",
  },
  cardcontent: {
    marginBottom: "10%",
  },
  cardMedia: {
    width: "50%",
  },
  gridspacing: {
    marginBottom: "8%",
  },
}));

export default function MainFeaturedPost() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.mainFeaturedPost}>
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
              >
                Eager for a job? JobsHunt helps you to prepare more effectively
                and get more interviews.
              </Typography>
              <Typography variant="h4" color="inherit" paragraph>
                JobsHunt's boards, lists and cards enable you to organize and
                prioritize applications in a fun, flexible and rewarding way
              </Typography>
              <Link to="users/login" className={classes.links}>
                Get Started Now
              </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Container>
        <Grid item xs={12} md={12} className={classes.gridspacing}>
          <CardActionArea>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography
                    component="h2"
                    variant="h3"
                    className={classes.cardcontent}
                  >
                    Info at your fingertips
                  </Typography>
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    className={classes.cardcontentpara}
                  >
                    Help yourself with jobs details by adding comments, due
                    dates and your personal experiences to help you make the
                    right choice.
                  </Typography>

                  <Button variant="contained" color="primary">
                    <Link to="users/login" className={classes.links}>
                      Start Doing Now
                    </Link>
                  </Button>
                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia
                  className={classes.cardMedia}
                  image={
                    "https://clickup.com/blog/wp-content/uploads/2019/01/to-do-list-apps-1400x1050.png"
                  }
                />
              </Hidden>
            </Card>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} md={12}>
          <CardActionArea>
            <Card className={classes.card}>
              <Hidden xsDown>
                <CardMedia
                  className={classes.cardMedia}
                  image={
                    "https://buzztechnics.com/wp-content/uploads/2020/04/buzztechs-elearning.png"
                  }
                />
              </Hidden>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography
                    component="h2"
                    variant="h3"
                    className={classes.cardcontent}
                  >
                    Manage your applications
                  </Typography>
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    className={classes.cardcontentpara}
                  >
                    Whether it's for applications, interviews or your own
                    personal experiences, JobsHunt helps you to stay organized.
                  </Typography>

                  <Button variant="contained" color="secondary">
                    <Link to="users/login" className={classes.links}>
                      Work Smarter Now
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </CardActionArea>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
