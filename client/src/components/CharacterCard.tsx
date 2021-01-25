import React, { Component } from "react";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Character } from "../Types/Character/characterTypes";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import { Add } from "@material-ui/icons";
import { Button, CardActions } from "@material-ui/core";
import CreateCharacter from "./CreateCharacter";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({
  card: {
    margin: 20,
  },
});

interface IProps {
  key?: number;
  character?: Character;
  classes?: any;
}

class CharacterCard extends Component<IProps> {
  render() {
    const { character, classes } = this.props;
    return character ? (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" color="primary">
            {character.name}
          </Typography>
          <Typography variant="body1">&quot;{character.race}&quot;</Typography>
        </CardContent>
      </Card>
    ) : (
      <Card className={classes.card}>
        <CardActions>
          <CreateCharacter />
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(CharacterCard);
