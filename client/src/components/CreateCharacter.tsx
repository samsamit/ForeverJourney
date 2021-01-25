import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import { createCharacter as submitCharacter } from "../redux/actions/characterActions";
import {
  Character,
  CharacterRaceEnum,
} from "../Types/Character/characterTypes";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { getRandomAvatar } from "../util/getRandomAvatar";
import { getUid } from "../util/getUid";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  addButton: {
    margin: "auto",
  },
});

interface IProps {
  classes?: any;
  submitCharacter?: (any) => any;
  userHandle?: string;
}
interface IState {
  open: boolean;
  charName: string;
  charRace: string;
  errors?: Record<string, unknown>;
}

class CreateCharacter extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
      charName: "",
      charRace: "",
      errors: { name: "", race: "" },
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, charName: "", charRace: "" });
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
    let err;
    console.log(this.state.charName + " " + this.state.charRace);
    if (!this.state.charName) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, name: "Charecter must have name!" },
      }));
      err = true;
    }
    if (!this.state.charRace) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, race: "Charecter must have race!" },
      }));
      err = true;
    }
    if (!err) {
      const characterDetails = {
        uid: getUid(),
        name: this.state.charName,
        race: this.state.charRace,
        avatarPath: getRandomAvatar(),
      };
      this.props.submitCharacter(characterDetails);
      this.handleClose();
    }
  };
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    const races = Object.keys(CharacterRaceEnum).map((key, i) => {
      if (isNaN(Number(CharacterRaceEnum[key]))) {
        return (
          <option key={i} value={key}>
            {CharacterRaceEnum[key]}
          </option>
        );
      }
    });
    return (
      <Fragment>
        <Tooltip title="Create character" placement="top">
          <Button
            className={classes.addButton}
            endIcon={<Add />}
            onClick={this.handleOpen}
          >
            Create character
          </Button>
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
                name="charName"
                type="text"
                label="Character name"
                className={classes.textField}
                value={this.state.charName}
                onChange={this.handleChange}
                fullWidth
                helperText={errors?.name}
                error={errors?.name ? true : false}
              />
              <Select
                native
                name="charRace"
                value={this.state.charRace}
                onChange={this.handleChange}
                error={errors?.race ? true : false}
              >
                <option></option>
                {races}
              </Select>
              <FormHelperText>{errors?.race}</FormHelperText>
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
  userHandle: state.user.userData.credentials.handle,
});

const mapDispatchToProps = { submitCharacter };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateCharacter));
