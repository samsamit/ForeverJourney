import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import { Character } from "../../../Types/Character/characterTypes";
import { IRootState } from "../../../redux/store";
import {
  Button,
  ButtonBase,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Hidden,
  Typography,
} from "@material-ui/core";
import {
  ADD_TARGET,
  BattleState,
  REMOVE_PLAYER,
  REMOVE_TARGET,
} from "../../../redux/types";
import SelectPlayersToBattle from "./SelectPlayersToBattle";
import StatusBar from "../../character/StatusBar";
import _ from "lodash";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  root: {
    boxSizing: "border-box",
    margin: theme.general.defaultMargin,
  },
  media: {
    height: 140,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  targetting: {
    "&:hover": {
      boxShadow: `0 0 10px ${theme.palette.primary.main}`,
    },
  },
  targetted: {
    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
  },
  myTurn: {
    border: `solid 10px ${theme.palette.success.main}`,
  },
  waitingForTurn: {
    border: "solid 10px rgba(255,255,255,.5)",
  },
});

interface IProps {
  classes?: any;
  character: Character;
  battleState?: any;
}

const BattleCardTester = (props: IProps) => {
  const [targetted, setTargetted] = useState(false);
  const [myTurn, setmyTurn] = useState(false);
  const { classes, character } = props;
  const doWeHaveCharacter = !_.isEmpty(character) && !_.isUndefined(character);
  const dispatch = useDispatch();
  const battleState: BattleState = useSelector(
    (state: IRootState) => state.battle
  );

  const targetTrakking = battleState.targetting.findTarget;

  useEffect(() => {
    setmyTurn(battleState.playerTurn === character?.uid);
  }, [battleState.playerTurn]);

  const charAttributes = doWeHaveCharacter && (
    <Grid container direction="row" justify="center" alignItems="center">
      {Object.keys(character.baseAttributes).map((key, i) => {
        return (
          <Grid key={i} item xs>
            <Typography variant="body2" color="textSecondary" component="p">
              {key + " " + character.baseAttributes[key]}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );

  const characterClick = () => {
    if (targetTrakking) dispatch({ type: ADD_TARGET, payload: character?.uid });
    if (targetted) dispatch({ type: REMOVE_TARGET, payload: character?.uid });
    //TODO: else show character info or som shit
  };

  useEffect(() => {
    setTargetted(battleState.targetting.targetPlayers.includes(character?.uid));
  });

  const cardClasses = `
    ${classes.root} 
    ${targetTrakking ? classes.targetting : null}
    ${targetted ? classes.targetted : null}
    ${myTurn ? classes.myTurn : classes.waitingForTurn}
  `;

  const selectCharacter = <SelectPlayersToBattle />;
  const showCharacter = doWeHaveCharacter && (
    <Card className={cardClasses}>
      <CardActionArea onClick={characterClick}>
        <CardMedia
          className={classes.media}
          image={character.avatarPath}
          title="Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {character.name + targetted}
          </Typography>
          {charAttributes}
          <StatusBar
            currentValue={character.currentState.attributes.hp}
            maxValue={character.baseAttributes.hp}
          />
        </CardContent>
      </CardActionArea>
      <Hidden xsUp={battleState.battleOn}>
        <CardActions>
          <Button
            size="small"
            color="primary"
            fullWidth
            onClick={() =>
              dispatch({ type: REMOVE_PLAYER, payload: character })
            }
          >
            Switch
          </Button>
        </CardActions>
      </Hidden>
    </Card>
  );

  return doWeHaveCharacter ? showCharacter : selectCharacter;
};

export default withStyles(styles)(BattleCardTester);
