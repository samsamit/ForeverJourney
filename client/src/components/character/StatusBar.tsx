import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Typography } from "@material-ui/core";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  root: {
    margin: theme.general.defaultMargin,
  },
  progressBar: {
    borderRadius: theme.general.statusBarHeight,
  },
});

interface IProps {
  classes?: any;
  currentValue: number;
  maxValue: number;
}

const StatusBar = (props: IProps) => {
  const { classes, currentValue, maxValue } = props;
  const dispatch = useDispatch();

  const progress = (currentValue * 100) / maxValue;

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          className={classes.progressBar}
          variant="determinate"
          value={progress}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {currentValue + " / " + maxValue + " = " + progress}
        </Typography>
      </Box>
    </Box>
  );
};

export default withStyles(styles)(StatusBar);
