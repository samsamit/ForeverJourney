import { Character, StatusEnum } from "../../Types/Character/characterTypes";
import { getRandomAvatar } from "../../util/getRandomAvatar";
import { getUid } from "../../util/getUid";

export const generateEnemy = () => {
    const newEnemy: Character = {
      uid: getUid(),
      name: "Bot",
      race: "Robot",
      attributes: {
        atk: 1,
        hp: 10,
      },
      currentState: { attributes: { atk: 1, hp: 10 }, initiative: 2, status: StatusEnum.null },
      avatarPath: getRandomAvatar(),
    };
    return newEnemy;
  };