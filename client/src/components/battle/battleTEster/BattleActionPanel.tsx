import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import { BattleState, FIND_TARGET, START_BATTLE } from "../../../redux/types";
import { Card, Grid } from "@material-ui/core";
import { dealDamage, endTurn } from "../../../redux/actions/battleActions";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  root: {
    margin: theme.general.defaultMargin,
  },
  actionCard: {
    padding: 10,
  },
});

interface IProps {
  classes?: any;
}

const BattleActionPanel = (props: IProps) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const battleState: BattleState = useSelector(
    (state: IRootState) => state.battle
  );

  const canStartBattle = battleState.players && battleState.players.length > 1;

  const startBattle = () => {
    if (canStartBattle) dispatch({ type: START_BATTLE });
    else console.log("Need 2 characters");
  };

  const startAttack = () => {
    dispatch({ type: FIND_TARGET });
  };
  const finishAttack = () => {
    dispatch(dealDamage(battleState));
  };

  const getAttackButtonText = () => {
    if (
      battleState.targetting.findTarget &&
      !battleState.targetting.targetsReady
    ) {
      const targetsRemaining =
        battleState.targetting.targetRequirements.maxTargets -
        battleState.targetting.targetPlayers.length;
      return "Select targets (" + targetsRemaining + ")";
    } else if (
      battleState.targetting.targetsReady &&
      battleState.targetting.findTarget
    ) {
      return "Deal damage!";
    } else {
      return "Attack";
    }
  };

  const battleActionContext = (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() =>
            battleState.targetting.targetsReady &&
            battleState.targetting.findTarget
              ? finishAttack()
              : startAttack()
          }
        >
          {getAttackButtonText()}
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="primary" fullWidth>
          2
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="primary" fullWidth>
          3
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => dispatch(endTurn(battleState))}
        >
          EndTurn
        </Button>
      </Grid>
    </Grid>
  );

  const context = battleState.battleOn ? (
    <Card className={classes.actionCard}>{battleActionContext}</Card>
  ) : (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      disabled={!canStartBattle}
      onClick={startBattle}
    >
      {canStartBattle ? "Start battle!" : "Select characters."}
    </Button>
  );

  return <Box className={classes.root}>{context}</Box>;
};

export default withStyles(styles)(BattleActionPanel);
