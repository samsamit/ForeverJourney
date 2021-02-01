import React, { Component } from "react";
import { connect, useSelector } from "react-redux";
import { Styles } from "@material-ui/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CharacterCard from "../components/character/CharacterCard";
import Profile from "../components/Profile";
import { Character } from "../Types/Character/characterTypes";
import { IRootState } from "../redux/store";

const styles: Styles<Theme, Record<string, unknown>, string> = (
  theme: Theme
) => ({});

interface IProps {
  classes?: any;
  characters?: any;
}

const home = (props: IProps) => {
  const { classes } = props;
  const characters: Array<Character> = useSelector(
    (state: IRootState) => state.user.userData.characters
  );
  const recentCharactersMarkup = characters ? (
    characters.map((char: Character, i: number) => (
      <CharacterCard key={i} character={char} />
    ))
  ) : (
    <p>Loading...</p>
  );
  return (
    <Grid container>
      <Grid item sm={8} xs={12}>
        <CharacterCard />
        {recentCharactersMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(home);
