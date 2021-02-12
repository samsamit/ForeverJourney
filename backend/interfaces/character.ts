interface ICharacter {
    name: string,
    race: IRace,
    attributes: IAttributes,
}

interface IAttributes {
    atk: number,
    hp: number
}
interface IRace {
    name: string,
    baseStats: IAttributes,
}
