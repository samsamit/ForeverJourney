import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import { signin } from "../actions/userHandling";
import { IRootState } from "../store";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({});

interface IProps {
  classes?: any;
}

const Signin = (props: IProps) => {
  const { classes } = props;
  const loggedIn = useSelector((state: IRootState) => state.user.loggedIn);
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
        />
        <TextField
          label="password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
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
