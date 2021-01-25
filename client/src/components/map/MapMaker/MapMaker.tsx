import React, { Component } from "react";
import { connect } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import SpritePicker from "./SpritePicker";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({});

interface IProps {
  classes?: any;
}
//interface IState {}

class MapMaker extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return <SpritePicker />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MapMaker));
