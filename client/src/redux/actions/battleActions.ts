import axios from "axios";
import _ from "lodash";
import { exit } from "process";
import { useDispatch, useSelector } from "react-redux";
import CharacterCard from "../../components/character/CharacterCard";
import { Character, CharacterClass, StatusEnum } from "../../Types/Character/characterTypes";
import { IRootState } from "../store";
import { ADD_PLAYER, BattleState, BATTLE_UPDATE, CLEAR_ERRORS, LOADING_UI, NEXT_TURN, SET_ERRORS } from "../types";
import { getUserData } from "./userActions";

export const selectPlayer = (player: Character, otherPlayers: Array<Character>) => dispatch => {
    if (!player.currentState) {
        player.currentState = {
            initiative: otherPlayers.length,
            attributes: {...player.baseAttributes},
            status: StatusEnum.null,
        };
      }
      dispatch({ type: ADD_PLAYER, payload: player });
}

export const endTurn = (currentBattleState: BattleState) => (dispatch) => {
    const currentPlayer: Character = getPlayerByUid(currentBattleState.playerTurn, currentBattleState.players);
    let nextPlayer: Character;
    currentBattleState.players.sort((a, b) => (a.currentState.initiative - b.currentState.initiative));
    currentBattleState.players.forEach(player => {
        if(player.currentState.initiative > currentPlayer.currentState.initiative){ 
            nextPlayer = player;
            exit;
        }
    });
    if(!nextPlayer) nextPlayer = currentBattleState.players[0];
    console.log(nextPlayer);
    dispatch({type: NEXT_TURN, payload: nextPlayer.uid});
};


export const dealDamage = (currentBattleState: BattleState) => (dispatch) => {
    const player = new CharacterClass(getPlayerByUid(currentBattleState.playerTurn, currentBattleState.players));
    const targets: Array<CharacterClass> = [];
    const targetuids = currentBattleState.targetting.targetPlayers;
    const players = currentBattleState.players;
    console.log(getPlayerByUid(currentBattleState.targetting.targetPlayers[0], players));
    targetuids.forEach(uid => {
        const foundPlayer = new CharacterClass(getPlayerByUid(uid, players));
        if(foundPlayer) targets.push(foundPlayer);
        else console.log("didnt find target player");
    });
    
    const outputDamage = player.basicAttack();

    targets.forEach(target => target.takeDamage(outputDamage));
    const updatedPlayers: Array<Character> = targets.map(target => target.getCharacterObject);
    dispatch({type: BATTLE_UPDATE, payload: updatedPlayers})
}
/*
//When player gets kill make rewards here
const playerKill = (Iplayer, Itarget) => {

}
*/
// TODO: show revards in ui

export const getPlayerByUid = (uid: string, array: Array<Character>): Character => {
    return array.find((player: Character) => player.uid === uid);
}