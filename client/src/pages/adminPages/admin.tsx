import React, { Component } from "react";
import { connect } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import Map from "../../components/map/Map";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  gridContent: {
    height: "100%",
  },
  mapContainer: {
    boxSizing: "border-box",
    height: "100%",
  },
});

interface IProps {
  classes?: any;
}
interface IState {
  selTab: number;
}

class admin extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selTab: 1,
    };
  }

  handleTab = (e, newValue: number) => {
    this.setState({ selTab: newValue });
    console.log(newValue);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        className={classes.gridContent}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={0}
      >
        <Grid item sm className={classes.mapContainer}>
          <Map />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(admin));

/*   */
