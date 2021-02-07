import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({});

interface IProps {
  classes?: any;
}

const signin = (props: IProps) => {
  const { classes } = props;
  const dispatch = useDispatch();
  return (
    <form action="">
      <TextField label="username" />
      <TextField label="password" />
      <Button variant="contained" color="primary">
        signin
      </Button>
    </form>
  );
};

export default withStyles(styles)(signin);
