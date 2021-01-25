import { mapTilesXY } from "../../constants";

export const getEmptyMap = () => {
    return Array(mapTilesXY).fill(Array(mapTilesXY).fill(0));
}