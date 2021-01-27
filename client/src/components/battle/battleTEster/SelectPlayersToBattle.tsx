import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ADD_PLAYER } from "../../../redux/types";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import { generateEnemy } from "../../../functions/enemies/generateEnemy";
import { IRootState } from "../../../redux/store";
import { selectPlayer } from "../../../redux/actions/battleActions";
import { Character } from "../../../Types/Character/characterTypes";
import _ from "lodash";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  card: {
    margin: theme.general.defaultMargin,
  },
  battleWithButton: {
    float: "right",
    [theme.breakpoints.down("xs")]: {
      float: "none",
    },
  },
});

interface IProps {
  classes?: any;
}

const SelectPlayersToBattle = (props: IProps) => {
  const { classes } = props;
  const userCharacters = useSelector(
    (state: IRootState) => state.user.userData.characters
  );
  const otherPlayersInBattle: Array<Character> = useSelector(
    (state: IRootState) => state.battle.players
  );
  const dispatch = useDispatch();
  const getRandomEnemy = () => {
    dispatch({ type: ADD_PLAYER, payload: generateEnemy() });
  };

  const recentCharactersMarkup = userCharacters ? (
    userCharacters.map((char: Character, i) => {
      if (!_.includes(otherPlayersInBattle, char)) {
        return (
          <div key={i}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              key={i}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" color="primary">
                  {char.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.battleWithButton}
                  onClick={() =>
                    dispatch(selectPlayer(char, otherPlayersInBattle))
                  }
                >
                  Battle with this
                </Button>
              </Grid>
            </Grid>
            <Divider />
          </div>
        );
      }
    })
  ) : (
    <p>Loading...</p>
  );

  return (
    <Card className={classes.card}>
      {recentCharactersMarkup}
      <Grid container direction="row" alignItems="center" justify="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" color="primary">
            Generate enemy
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            className={classes.battleWithButton}
            onClick={getRandomEnemy}
          >
            Generate
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </Card>
  );
};

export default withStyles(styles)(SelectPlayersToBattle);
