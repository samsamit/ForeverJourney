"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../util/admin");
exports.getAllCharacters = (req, res) => {
    admin_1.db
        .collection('users')
        .doc(req.user.handle)
        .collection('userCharacters')
        .get()
        .then((data) => {
        const characters = [];
        data.forEach(doc => {
            const docdata = doc.data();
            // @ts-ignore
            characters.push(docdata);
        });
        return res.json(characters);
    });
};
//Add character to user subcollection 'userCharacters'
exports.createCharacter = (req, res) => {
    var _a, _b;
    if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.name.trim()) === '')
        return res.status(400).json({ name: 'Character must have name!' });
    if (((_b = req.body) === null || _b === void 0 ? void 0 : _b.race.trim()) === '')
        return res.status(400).json({ name: 'Character must have race!' });
    const dbRef = admin_1.db.collection('users').doc(req.user.handle).collection('userCharacters');
    const newChar = {
        uid: req.body.uid,
        name: req.body.name,
        race: req.body.race,
        avatarPath: req.body.avatarPath,
        createdAt: new Date().toISOString(),
        attributes: { atk: 1, hp: 10 },
        userHandle: req.user.handle,
    };
    dbRef.doc(req.body.name).get()
        .then(doc => {
        if (doc.exists)
            return res.status(400).json({ name: 'This character name is already taken' });
        else {
            dbRef
                .add(newChar)
                .then(() => {
                res.json({ message: 'Character created succesfully' });
            })
                .catch((err) => {
                res.status(500).json({ error: err });
                console.log(err);
            });
        }
    })
        .catch((err) => {
        res.status(500).json({ error: err });
        console.log(err);
    });
};
//Working example of transaction
/*
exports.postCharacter = (req, res) => {
    if(req.body?.name.trim() === '') return res.status(400).json({name: 'Character must have name!'});
    if(req.body?.race.trim() === '') return res.status(400).json({name: 'Character must have race!'});
    const newChar = {
        name: req.body.name,
        race: req.body.race,
        createdAt: new Date().toISOString(),
    };
    const docRef = db.collection('users').doc(req.user.handle);
    db.runTransaction(transaction => {
        return transaction.get(docRef).then(userDoc => {
            if(!userDoc.exists){
                docRef.set({userCharacters: newChar});
            }else{
                const newCharacters =userDoc.data().userCharacters;
                newCharacters[req.body.name] = newChar;
                transaction.update(docRef, {userCharacters: newCharacters})
            }
        })
    })
    .then(() => {
        res.json({message: 'Character created succesfully'});
    })
    .catch((err: any) => {
        res.status(500).json({error: err});
        console.log(err);
    })
};
*/ 
//# sourceMappingURL=characters.js.map