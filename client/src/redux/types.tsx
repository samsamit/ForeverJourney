import { Character, UserCharacter } from "../Types/Character/characterTypes";

//userReducer types
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";
export const SET_USER = "SET_USER";
export const LOADING_USER = "LOADING_USER";
export const SET_USERCHARACTERS = "SET_USERCHARACTERS";

export interface UserState {
  authenticated: boolean;
  loading: boolean;
  userData: UserData;
}

interface UserData {
  credentials: UserCredentials;
  party: Array<Character>;
  characters: Array<Character>;
}
export interface UserCredentials {
  createdAt?: string;
  role?: string;
  userId?: string;
  email?: string;
  handle?: string;
}

//uiReducer types
export const SET_ERRORS = "SET_ERRORS";
export const LOADING_UI = "LOADING_UI";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const SET_MOBILE = "SET_MOBILE";
export const SET_DESKTOP = "SET_DESKTOP";

export interface UIState {
  loading: boolean;
  errors?: any;
}

//characterReducer types

//battleReducer types
export const START_BATTLE = "START_BATTLE";
export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const NEXT_TURN = "NEXT_TURN";
export const BATTLE_UPDATE = "BATTLE_UPDATE";
export const FIND_TARGET = "FIND_TARGET";
export const ADD_TARGET = "ADD_TARGET";
export const REMOVE_TARGET = "REMOVE_TARGET";
export interface BattleState {
  battleOn: boolean;
  playerTurn: string;
  players: Array<Character>;
  targetting: {
    findTarget: boolean;
    targetsReady: boolean;
    targetRequirements: TargetRequirements;
    targetPlayers: Array<string>;
  };
}

interface TargetRequirements {
  maxTargets: number;
}
