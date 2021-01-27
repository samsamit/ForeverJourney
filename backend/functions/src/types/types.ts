export type Errors = {
    email: string,
    password: string,
    handle: string,
    confirmPassword: string,
    name: string,
}

export interface Character {
  uid: string;
  name: string;
  race: string;
  baseAttributes: CharacterAttributes;
  avatarPath?: string;
  currentState?: CharacterCurrentState;
}


export interface UserCharacter extends Character{
    createdAt: string;
    userHandle: string;
}

interface CharacterCurrentState {
    initiative: number;
    attributes: CharacterAttributes;
  }

export interface CharacterAttributes {
    hp: number;
    atk: number;
}