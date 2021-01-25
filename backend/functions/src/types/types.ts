export type Errors = {
    email: String,
    password: String,
    handle: String,
    confirmPassword: String,
}

export interface Character {
  uid: string;
  name: string;
  race: string;
  attributes: CharacterAttributes;
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