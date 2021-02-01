import { Character, CharacterClass, StatusEnum } from "../../Types/Character/characterTypes";
import { getRandomAvatar } from "../../util/getRandomAvatar";
import { getUid } from "../../util/getUid";

export const generateEnemy = () => {
    const newEnemy = new CharacterClass({
      uid: getUid(),
      name: "Bot",
      race: "Robot",
      baseAttributes: {
        atk: 1,
        hp: 10,
        mana: 10,
      },
      avatarPath: getRandomAvatar(),
    });
    return newEnemy.getCharacterObject;
  };