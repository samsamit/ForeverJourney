import firebase from "firebase";
import DocumentData = firebase.firestore.DocumentData;
import {db} from '../util/admin';
import { UserCharacter } from "../types/types";

const {validateCharacter} = require('../util/validators');

exports.getAllCharacters = (req, res) => {
    db    
    .collection('users')
    .doc(req.user.handle)
    .collection('userCharacters')
    .get()
    .then((data: DocumentData) => {
        const characters = [];
        data.forEach(doc => {
            const docdata = doc.data();
            // @ts-ignore
            characters.push(docdata);
        });
        return res.json(characters);
    })
};

//Add character to user subcollection 'userCharacters'
exports.createCharacter = (req, res) => {
    const {valid, errors} = validateCharacter(req.body);
    if (!valid) return res.status(400).json(errors);

    const newChar: UserCharacter = req.body.createdAt ? req.body :
    {
        uid: req.body.uid,
        name: req.body.name,
        race: req.body.race,
        avatarPath: (typeof req.body.avatarPath === "undefined" ? "" : req.body.avatarPath),
        createdAt: new Date().toISOString(),
        baseAttributes: {atk: 1, hp: 10},
        userHandle: req.user.handle,
    };
    const docRef = db.collection('users').doc(req.user.handle).collection('userCharacters');
    docRef.doc(req.body.name).get()
    .then(doc => {
        if(doc.exists) return res.status(400).json({name: 'This character name is already taken'});
        else{
            docRef
            .doc(newChar.name)
            .set(newChar)
            .then(() => {
                res.json({message: 'Character created succesfully'});

            })
            .catch((err: any) => {
                res.status(500).json({error: err});
                console.log(err);
            })
        }
    })
    .catch((err: any) => {
        res.status(500).json({error: err});
        console.log(err);
    })
}
 
//TODO: update character from party also
exports.updateCharacter = (req, res) => {
    const docRef = db.collection('users').doc(req.user.handle).collection('userCharacters').doc(req.body.name);
    docRef.set(req.body)
    .then(() => res.json({message: 'Character updated succesfully'}))
    .catch(err => {
        res.status(500).json({error: err});
    })
}
/*
exports.addCharacterToUserParty = (req, res) => {
    const docRef = db.collection('users').doc(req.user.handle);
    db.runTransaction(transaction => {
        return transaction.get(docRef).then(userDoc => {
            if(!userDoc.exists){
                res.status(400).json({error: 'User not found'});
            }else{
                const newCharacters = userDoc.data().userCharacters;
                newCharacters[req.body.name] = req.body;
                transaction.update(docRef, {userCharacters: newCharacters})
            }
        })
    })
    .then(() => {
        res.json({message: 'Character added to party'});
    })
    .catch((err: any) => {
        res.status(500).json({error: err});
        console.log(err);
    })
};
*/