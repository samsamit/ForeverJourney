import React, { Component } from "react";
import { connect } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import { mapTilesXY } from "../../constants";
import MapTile from "./MapTile";
import { Card } from "@material-ui/core";
import { getEmptyMap } from "./mapGenerator";
import Box from "@material-ui/core/Box";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  mapCard: {
    margin: theme.general.defaultMargin,
    height: "calc(100% - " + theme.general.defaultMargin * 2 + "px)",
  },
  mapBackground: {
    backgroundColor: "blue",
    padding: 0,
    margin: "auto",
  },
});

interface IProps {
  classes?: any;
}
interface IState {
  map?: any[][];
  tileSize: number;
  mapSize?: number;
  containerDimensions?: { width: number; heigth: number };
}

class map extends Component<IProps, IState> {
  mapRef: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      tileSize: 20,
      mapSize: 100,
      containerDimensions: { width: 0, heigth: 0 },
    };
    this.mapRef = React.createRef();
  }
  componentDidMount() {
    this.createMapData();
    this.getNewSize();
    window.addEventListener("resize", this.getNewSize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.getNewSize);
  }

  getNewSize = () => {
    const newSize = Math.min(
      this.mapRef.current.offsetWidth,
      this.mapRef.current.offsetHeight
    );
    const newTileSize = newSize / mapTilesXY;
    this.setState({
      containerDimensions: {
        heigth: this.mapRef.current.offsetHeight,
        width: this.mapRef.current.offsetWidth,
      },
      tileSize: newTileSize,
      mapSize: newSize,
    });
  };

  createMapData() {
    const initialMapArray = getEmptyMap();
    this.setState({
      map: initialMapArray,
    });
  }

  render() {
    const { classes } = this.props;
    const { mapSize, tileSize, map } = this.state;
    const cardMargin = (this.state.containerDimensions.heigth - mapSize) / 2;
    return (
      <Card ref={this.mapRef} className={classes.mapCard}>
        <Box
          display="flex"
          flexWrap="wrap"
          className={classes.mapBackground}
          style={{ width: mapSize, height: mapSize, marginTop: cardMargin }}
        >
          {this.state.map?.map((x, i) =>
            x.map((y, j) => {
              return (
                <MapTile key={i + j} tileSize={tileSize}>
                  {y}
                </MapTile>
              );
            })
          )}
        </Box>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(map));
/*

*/
