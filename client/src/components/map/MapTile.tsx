import React, { Component } from "react";
import { connect } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  tileBase: {
    boxSizing: "border-box",
    border: "0.5px solid black",
    backgroundColor: theme.map.tileActiveColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

interface IProps {
  tileSize: number;
  classes?: any;
}
//interface IState {}

class mapTile extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes, tileSize } = this.props;
    return (
      <Box
        className={classes.tileBase}
        style={{ width: tileSize, height: tileSize }}
      >
        <p className={classes.text}>tile</p>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(mapTile));
