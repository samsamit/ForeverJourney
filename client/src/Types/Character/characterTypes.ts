export type Character = playerCharacter | UserCharacter;

export interface playerCharacter {
  uid: string;
  name: string;
  race: string;
  attributes: CharacterAttributes;
  avatarPath?: string;
  currentState: CharacterCurrentState;
}

export interface UserCharacter extends playerCharacter{
  charid: string;
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

export const CharacterRaceEnum = {
  Human: "Human",
  Lizardman: "Lizardman",
  Angel: "Angel",
  Demon: "Demon"
}
export enum StatusEnum {
  null,
  dead,
}

export class CharacterClass {
  character: Character;

  constructor(ICharacter: Character){
    this.character = ICharacter;
  }

  basicAttack = (): number => {
    return this.character.currentState.attributes.atk;
  }

  takeDamage = (inputDamage: number): void => {
    this.character.currentState.attributes.hp =  this.character.currentState.attributes.hp - inputDamage;
    if(this.character.currentState.attributes.hp <= 0){
      this.character.currentState.status = StatusEnum.dead;
    }
  }


  get getCharacterObject(){return this.character}
}

