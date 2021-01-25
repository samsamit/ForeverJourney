import React, { Component } from "react";
import { connect } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import { handleDarkMode } from "../../../util/handleDarkMode";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  root: {
    width: "50%",
    margin: theme.general.defaultMargin,
    border: "1px black solid",
    zIndex: 100,
    position: "absolute",
  },
});

interface IProps {
  classes?: any;
  handle?: any;
}
interface IState {
  cardPos?: { x: number; y: number };
}

class SpritePicker extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cardPos: {
        x: 0,
        y: 0,
      },
    };
  }

  componentDidMount() {
    document
      .getElementById("handle")
      .addEventListener("mousedown", this.handleMouseDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener("mousedown", this.moveToolbar);
    document.body.removeEventListener("mouseup", this.moveToolbar);
    document.body.removeEventListener("mousemove", this.moveToolbar);
  }

  handleMouseDown = (e) => {
    e.preventDefault();
    document.getElementById("handle").style.pointerEvents = "none";
    document.body.addEventListener("mousemove", this.moveToolbar);
    document.body.addEventListener("mouseup", () => {
      document.body.removeEventListener("mousemove", this.moveToolbar);
      document.getElementById("handle").style.pointerEvents = "initial";
    });
  };

  moveToolbar = (e) => {
    const pos = {
      x: e.clientX,
      y: e.clienY,
    };
    this.setState({
      cardPos: {
        x: pos.x,
        y: pos.y,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const {
      cardPos: { x, y },
    } = this.state;
    return (
      <Card className={classes.root} style={{ top: y, left: x }}>
        <AppBar id="handle" position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sprite picker
            </Typography>
          </Toolbar>
        </AppBar>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SpritePicker));
