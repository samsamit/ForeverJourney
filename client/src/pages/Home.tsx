import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store";
import { Grid } from "@material-ui/core";
import Profile from "../components/Profile";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({});

interface IProps {
  classes?: any;
}

const Home = (props: IProps) => {
  const { classes } = props;
  const dispatch = useDispatch();
  return (
    <Grid container>
      <Grid item md>
        <Profile />
      </Grid>
      <Grid item md>
        something...
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Home);
