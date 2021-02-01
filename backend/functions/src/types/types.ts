export type Errors = {
    email: string,
    password: string,
    handle: string,
    confirmPassword: string,
    name: string,
}


export type Character = playerCharacter | UserCharacter;

export interface playerCharacter {
  uid: string;
  name: string;
  race: string;
  baseAttributes: CharacterAttributes;
  avatarPath?: string;
  currentState: CharacterCurrentState;
  inParty?: boolean;
}

export interface UserCharacter extends playerCharacter{
  createdAt: Date;
  userHandle: string;
}
interface CharacterCurrentState {
  initiative: number;
  status: StatusEnum;
  attributes: CharacterAttributes;
}

export interface CharacterAttributes {
  hp: number;
  atk: number;
}

export enum StatusEnum {
  null,
  dead,
}