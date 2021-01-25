import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import { editUserDetails } from "../redux/actions/userActions";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Create";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({});

interface IProps {
  classes?: any;
  editUserDetails: (any) => any;
  credentials: any;
}

interface IState {
  open: boolean;
  bio: string;
  event?: any;
}

class EditDetails extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      bio: "",
      open: false,
    };
  }
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    if (Object.keys(this.state).includes(key)) {
      this.setState({
        [key]: value,
      } as Pick<IState, keyof IState>);
    }
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit details" placement="top">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form action="">
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                placeholder="Your story..."
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.button}
              onClick={this.handleSubmit}
              color="primary"
            >
              Save
            </Button>
            <Button
              className={classes.button}
              onClick={this.handleClose}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.userData.credentials,
});

const mapDispatchToProps = { editUserDetails };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditDetails));
