import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({});

interface IProps {
  classes?: any;
}

const login = (props: IProps) => {
  const { classes } = props;
  const dispatch = useDispatch();
  return <div></div>;
};

export default withStyles(styles)(login);
