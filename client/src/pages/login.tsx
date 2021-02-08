import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({});

interface IProps {
  classes?: any;
}

const Login = (props: IProps) => {
  const { classes } = props;
  return (
    <div>
      <form action="">
        <TextField label="username" />
        <TextField label="password" />
        <Button variant="contained" color="primary">
          Login
        </Button>
        <Link to="/signup">You can also signUp</Link>
      </form>
    </div>
  );
};

export default withStyles(styles)(Login);
