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
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

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
  history?: any;
  signupUser?: (newUserData: any, history: any) => any;
  authenticated?: boolean;
  UI?: any;
}
interface IState {
  email?: string;
  password?: string;
  confirmPassword?: string;
  handle?: string;
  loading?: boolean;
  errors?: Record<string, unknown>;
}

class Signup extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      loading: false,
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
    this.setState({ loading: true });
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(userData, this.props.history);
  };
  handleChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      authenticated,
      UI: { loading },
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
            SignUp
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
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
              helperText={errors?.handle}
              error={errors?.handle ? true : false}
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              helperText={errors?.confirmPassword}
              error={errors?.confirmPassword ? true : false}
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
                "SignUp"
              )}
            </Button>
            <br />
            <small>
              Already have an account? Login up <Link to="/login">here!</Link>
            </small>
          </form>
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
const mapActionsToProps = { signupUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup));
