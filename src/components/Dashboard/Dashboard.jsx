import React from "react";
import { Grid } from "@material-ui/core";
import DashboardSideBar from "./DashboardSideBar";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

function Dashboard({ children }) {
  return (
    <Grid container>
      <DashboardSideBar />
      {children}
    </Grid>
  );
}

export default withRouter(withCookies(Dashboard));
