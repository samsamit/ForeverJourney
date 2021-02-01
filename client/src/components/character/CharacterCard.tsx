import React from "react";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Character } from "../../Types/Character/characterTypes";
import dayjs from "dayjs";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { Button, CardActions, CardMedia, Hidden } from "@material-ui/core";
import CreateCharacter from "../CreateCharacter";
import { useDispatch, useSelector } from "react-redux";
import {
  addCharacterToParty,
  removeFromParty,
} from "../../redux/actions/characterActions";
import { IRootState } from "../../redux/store";
import _ from "lodash";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  card: {
    margin: theme.general.defaultMargin,
    display: "flex",
    justifyContent: "space-between",
  },
  avatar: {
    width: 100,
  },
});

interface IProps {
  key?: number;
  character?: Character;
  classes?: any;
}

const CharacterCard = (props: IProps) => {
  const { character, classes } = props;
  const dispatch = useDispatch();
  const party = useSelector((state: IRootState) => state.user.userData.party);
  const inParty = _.includes(_.keys(party), character?.name);
  const handlePartyButton = () => {
    if (inParty) dispatch(removeFromParty(character, party));
    else dispatch(addCharacterToParty(character, party));
    console.log("partiih");
  };
  return character ? (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" color="primary">
          {character.name}
        </Typography>
        <Typography variant="body1">&quot;{character.race}&quot;</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          className={classes.margin}
          endIcon={<PlaylistAddIcon />}
          onClick={handlePartyButton}
        >
          {inParty ? "Remove from party" : "Add to party"}
        </Button>
      </CardActions>
      <CardMedia
        className={classes.avatar}
        image={character.avatarPath}
        title="Contemplative Reptile"
      />
    </Card>
  ) : (
    <Card className={classes.card}>
      <CardActions style={{ width: "100%" }}>
        <CreateCharacter />
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(CharacterCard);
