import { withStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { darkMode } from "../../constants";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.general.defaultMargin,
  },
  progressBarContainer: {
    position: "relative",
    textAlign: "center",
    margin: "3px 0 3px 0",
  },
  progressBar: {
    height: theme.general.statusBarHeight,
    borderRadius: 5,
    "& .MuiLinearProgress-bar": {
      backgroundColor: (props: IProps) =>
        darkMode ? props.color.dark : props.color.main,
    },
  },
  progressNumber: {
    position: "absolute",
    top: 1,
    left: 0,
    right: 0,
    fontWeight: "bold",
  },
}));

interface IProps {
  classes?: any;
  currentValue: number;
  maxValue: number;
  color: any;
}

const StatusBar = (props: IProps) => {
  const classes = useStyles(props);
  const { currentValue, maxValue } = props;

  const progress = (currentValue * 100) / maxValue;

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1} className={classes.progressBarContainer}>
        <LinearProgress
          className={classes.progressBar}
          variant="determinate"
          value={progress}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.progressNumber}
        >
          {currentValue + " / " + maxValue}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatusBar;
