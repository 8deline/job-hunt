import React from "react";
import { Grid } from "@material-ui/core";
import DashboardSideBar from "./DashboardSideBar";
export default function Dashboard({ children }) {
  return (
    <Grid container>
      <DashboardSideBar />
      {children}
    </Grid>
  );
}
