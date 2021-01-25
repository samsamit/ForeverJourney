import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppIcon from "../images/AppIcon.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  form: {
    textAlign: "center",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  appIcon: {
    width: "50%",
    margin: "20px auto 20px auto",
  },
  textField: {},
  button: {
    margin: "20px auto 20px auto",
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 20,
  },
});

interface IProps {
  classes?: any;
  loginUser?: (userData: any) => any;
  authenticated?: boolean;
  UI?: any;
}
interface IState {
  email?: string;
  password?: string;
  errors?: Record<string, unknown>;
}

class Login extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.UI.errors !== prevState.errors) {
      return {
        errors: nextProps.UI.errors,
      };
    } else return null;
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };
  handleChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  debugLogin = () => {
    const userData = {
      email: "samu.tiainen@hotmail.com",
      password: "testipassu",
    };
    this.props.loginUser(userData);
  };

  render() {
    const {
      classes,
      UI: { loading },
      authenticated,
    } = this.props;
    const { errors } = this.state;
    return authenticated ? (
      <Redirect to="/" />
    ) : (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img className={classes.appIcon} src={AppIcon} alt="App icon" />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              helperText={errors?.email}
              error={errors?.email ? true : false}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              helperText={errors?.password}
              error={errors?.password ? true : false}
            />
            {errors?.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors?.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              color="primary"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={30} className={classes.progress} />
              ) : (
                "Login"
              )}
            </Button>
            <br />
            <small>
              Dont have an account? Sign up <Link to="/signup">here!</Link>
            </small>
          </form>
          <Button
            color="secondary"
            variant="outlined"
            onClick={this.debugLogin}
          >
            debugLogin
          </Button>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => ({
  authenticated: state.user.authenticated,
  UI: state.UI,
});

const mapActionsToProps = { loginUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
