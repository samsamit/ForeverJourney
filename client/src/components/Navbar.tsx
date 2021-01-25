import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  navRoot: {
    width: "100%",
    height: "100%",
  },
  navContainer: {
    padding: 0,
    margin: "20px auto 0 auto",
  },
  navBox: {
    flexDirection: "column",
  },
});

interface IState {
  open: boolean;
}

interface IProps {
  classes?: any;
  loginUser?: (userData: any) => any;
  authenticated?: boolean;
  UI?: any;
}

class Navbar extends Component<IProps, IState> {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" className={classes.navRoot}>
        <Toolbar className={classes.navContainer}>
          <Box width="100%" display="flex" className={classes.navBox}>
            <Button color="inherit" component={RouterLink} to="/Login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/SignUp">
              SignUp
            </Button>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/admin">
              Admin
            </Button>
            <Button color="inherit" component={RouterLink} to="/mapMaker">
              Map
            </Button>
            <Button color="inherit" component={RouterLink} to="/Battle">
              Battle
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
