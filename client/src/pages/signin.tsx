import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import { signin } from "../actions/userHandling";
import { IRootState } from "../store";
import { CLEAR_ERRORS } from "../store/types";
import isEmpty from "lodash/isEmpty";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({});

interface IProps {
  classes?: any;
}

const Signin = (props: IProps) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: IRootState) => state.user.loggedIn);
  const errors = useSelector((state: IRootState) => state.ui.errors);
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData);
    signin(formData);
    console.log("done");
  };

  const handleChange = (e: any) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
    if (!isEmpty(errors)) dispatch({ type: CLEAR_ERRORS });
  };

  if (loggedIn) return <Redirect to="/" />;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          helperText={errors.username}
        />
        <TextField
          label="password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helperText={errors.password}
        />
        <Button variant="contained" color="primary" type="submit">
          Signin
        </Button>
        <Link to="/signup">You can also signUp</Link>
      </form>
    </div>
  );
};

export default withStyles(styles)(Signin);
