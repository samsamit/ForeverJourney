import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Typography } from "@material-ui/core";
import { IRootState } from "../store";
import isEmpty from "lodash/isEmpty";
import { IUser } from "../interfaces/user";
import { LOGOUT_USER } from "../store/types";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({});

interface IProps {
  classes?: any;
}

const Profile = (props: IProps) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const userInfo: IUser = useSelector(
    (state: IRootState) => state.user.userInfo!
  );
  return isEmpty(userInfo) ? (
    <p>Loading...</p>
  ) : (
    <Card>
      <Typography variant="h2">{userInfo.username}</Typography>
      <Button onClick={() => dispatch({ type: LOGOUT_USER })}>Logout</Button>
    </Card>
  );
};

export default withStyles(styles)(Profile);
