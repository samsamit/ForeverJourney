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

const login = (props: IProps) => {
  const { classes } = props;
  const dispatch = useDispatch();
  return (
    <div>
      <form action="">
        <TextField label="username" />
        <TextField label="password" />
        <Button variant="contained" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
};

export default withStyles(styles)(login);
