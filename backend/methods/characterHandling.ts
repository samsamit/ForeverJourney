import { checkCharacter, isEmpty } from "./checks";
import {Request, Response} from "express";
import Character, { MCharacterDocument } from "../models/character";

export const saveCharacter = async (req: Request, res: Response) => {
    const {valid, error} = checkCharacter(req.body.character);
    if(!valid) return res.status(400).send({error: error});

    const newCharacter: MCharacterDocument = new Character(req.body.character);
    await newCharacter.save().then(() => {
        return res.status(200).send({savedCharacter: newCharacter});
    }).catch(err => {
        console.log(err);
        if (err.name === 'MongoError' && err.code === 11000) {
            // Duplicate username
            return res.status(422).send({error: 'Character already exist!'});
          }
        return res.status(422).send({error: "Something went wrong!?"});
    })
}