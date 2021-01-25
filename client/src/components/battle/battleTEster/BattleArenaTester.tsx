import React from "react";
import { useSelector } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import PreBattleTester from "./SelectPlayersToBattle";
import { IRootState } from "../../../redux/store";
import BattleActionPanel from "./BattleActionPanel";
import BattleCardTester from "./BattleCardTester";
import { Character } from "../../../Types/Character/characterTypes";
import { BattleState } from "../../../redux/types";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  root: {
    height: "100%",
  },
  card: {
    margin: theme.general.defaultMargin,
    padding: 10,
  },
  playerContainer: {
    height: "100%",
    width: "100%",
  },
});

interface IProps {
  classes?: any;
}

const BattleArenaTester = (props: IProps) => {
  const { classes } = props;
  const battleState: BattleState = useSelector(
    (state: IRootState) => state.battle
  );

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      className={classes.root}
    >
      <Grid item xs>
        <Grid container>
          <Grid item xs>
            <BattleCardTester
              character={battleState.players && battleState.players[0]}
            />
          </Grid>
          <Grid item xs>
            <BattleCardTester
              character={battleState.players && battleState.players[1]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs="auto">
        <BattleActionPanel />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(BattleArenaTester);
