import React, { Component } from "react";
import { connect } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import {} from "../redux/types";
import { Card, IconButton, Paper, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { Link as routerLink } from "react-router-dom";
import CalendarToday from "@material-ui/icons/CalendarToday";
import dayjs from "dayjs";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import { logoutUser } from "../redux/actions/userActions";
import EditDetails from "./EditDetails";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  card: {
    margin: 20,
    padding: 20,
  },
  profile: {
    padding: 20,
    textAlign: "center",
  },
  profileImage: {
    width: "90%",
    borderRadius: "50%",
    objectFit: "cover",
    margin: 10,
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

interface IProps {
  user?: any;
  classes?: any;
  logoutUser?: () => any;
}
//interface IState {}

class Profile extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        userData: {
          credentials: { handle, createdAt, bio },
        },
        loading,
        authenticated,
      },
    } = this.props;
    const profileMarkup = !loading ? (
      authenticated ? (
        <Card className={classes.card}>
          <div className={classes.profile}>
            <img
              className={classes.profileImage}
              src={window.location.origin + "/images/profilePicture.png"}
              alt="ProfilePic"
            />
            <div className={classes.profileDetails}>
              <Link
                component={routerLink}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </Link>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <Tooltip title="Logout" placement="top">
              <IconButton onClick={this.handleLogout}>
                <KeyboardReturn color="primary"></KeyboardReturn>
              </IconButton>
            </Tooltip>
            <EditDetails></EditDetails>
          </div>
        </Card>
      ) : (
        <Card className={classes.card}>
          <Typography variant="body2" align="center">
            No profile found, Please login again.
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={routerLink}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={routerLink}
              to="/signup"
            >
              SignUp
            </Button>
          </div>
        </Card>
      )
    ) : (
      <p>Loading</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
