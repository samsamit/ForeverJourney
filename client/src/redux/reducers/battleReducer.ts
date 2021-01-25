import { Character, UserCharacter } from "../../Types/Character/characterTypes";
import { BattleState, REMOVE_PLAYER, ADD_PLAYER, START_BATTLE, NEXT_TURN, BATTLE_UPDATE, ADD_TARGET, FIND_TARGET, REMOVE_TARGET } from "../types";

const initialState: BattleState = {
    battleOn: false,
    playerTurn: "",
    players: [],
    targetting: {
        findTarget: false,
        targetsReady: false,
        targetRequirements: null,
        targetPlayers: [],
      },
  };
  
export default function (state = initialState, action: any) {
    switch (action.type) {
        case START_BATTLE:
            state.players.sort((a, b) => (a.currentState.initiative - b.currentState.initiative))
            return{
                ...state,
                battleOn: true,
                playerTurn: state.players[0].uid,
            }
        
        case ADD_PLAYER:
            return{
                ...state,
                players: [...state.players, action.payload],
            }
        case REMOVE_PLAYER:
            return{
                ...state,
                players: [...state.players, state.players.filter(player => player !== action.payload)],
            }
        case NEXT_TURN:
            return{
                ...state,
                playerTurn: action.payload
            }
        case BATTLE_UPDATE:
            const targets: Array<Character> = action.payload
            const newPlayers: Array<Character> = [];
            
            for(let i = 0; i < state.players.length; i++){
                for(let j = 0; j < targets.length; j++){
                    if(state.players[i].uid === targets[j].uid) newPlayers.push(targets[j]);
                    else newPlayers.push(state.players[i]);
                }
            }
            return{
                ...state,
                players: newPlayers,
                targetting: {
                    ...state.targetting,
                    findTarget: false,
                    targetsReady: false,
                    targetPlayers: []
                }
            }
        case FIND_TARGET:
            return{
                ...state,
                targetting: {
                    ...state.targetting,
                    findTarget: true,
                    targetRequirements: {
                        ...state.targetting.targetRequirements,
                        maxTargets: 1,
                    }
                }
        }

        case ADD_TARGET:
            const stopTargetting = state.targetting.targetPlayers.length + 1 >= state.targetting.targetRequirements.maxTargets;
            return{
                ...state,
                targetting: {
                    ...state.targetting,
                    targetsReady: stopTargetting,
                    targetPlayers: [...state.targetting.targetPlayers, action.payload]
                }
            }

        case REMOVE_TARGET:
            return{                
                ...state,
                targetting:{
                    ...state.targetting,
                    findTarget: true,
                    targetsReady: false,
                    targetPlayers: state.targetting.targetPlayers.filter(target => target !== action.payload) ? state.targetting.targetPlayers.filter(target => target !== action.payload) : []
                }
            }

       default:
        return state;
    }
}