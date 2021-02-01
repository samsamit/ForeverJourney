// ###########  To backend  ###################

import _ from "lodash";

export type Character = playerCharacter | UserCharacter;
export interface playerCharacter {
  uid: string;
  name: string;
  race: string;
  baseAttributes: CharacterAttributes;
  avatarPath?: string;
  currentState?: CharacterCurrentState;
}

export interface UserCharacter extends playerCharacter{
  createdAt: Date;
  userHandle: string;
}
interface CharacterCurrentState {
  initiative: number;
  status: string;
  attributes: CharacterAttributes;
  actions: {
    offensive: number,
    defensive: number,
    passive: number,
  }
}

export interface CharacterAttributes {
  atk: number;
  hp: number;
  mana: number;
}

export const StatusEnum = {
  null: null,
  alive: "Alive",
  dead: "Dead",
}
// ################################################

export const CharacterRaceEnum = {
  Human: "Human",
  Lizardman: "Lizardman",
  Angel: "Angel",
  Demon: "Demon"
}


export class CharacterClass {
  character: Character;

  constructor(ICharacter: Character){
    this.character = ICharacter;
    if(_.isEmpty(this.character.currentState)){
      this.character.currentState = {
        initiative: 1,
        status: StatusEnum.alive,
        attributes: {...ICharacter.baseAttributes},
        actions:{
          defensive: 1,
          offensive: 1,
          passive: 1,
        }
      }
    }
  }

  basicAttack = (): number => {
    console.log("Ill make this much damage: " + this.character.currentState.attributes.atk);
    return this.character.currentState.attributes.atk;
  }

  takeDamage = (inputDamage: number): void => {
    this.character.currentState.attributes.hp = this.character.currentState.attributes.hp - inputDamage;
    if(this.character.currentState.attributes.hp <= 0){
      this.character.currentState.status = StatusEnum.dead;
    }
  }

  get getCharacterObject(){return this.character}
}

