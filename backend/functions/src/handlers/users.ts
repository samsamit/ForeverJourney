const {db} = require('../util/admin');
//const firebaseConfig = require('../util/firebaseConfig');
const firebaseConfig = {
    apiKey: "AIzaSyBAn-L4YNy_G55cGnsa9L1HBl0ZLnpN18Q",
    authDomain: "forever-journey.firebaseapp.com",
    databaseURL: "https://forever-journey-default-rtdb.firebaseio.com",
    projectId: "forever-journey",
    storageBucket: "forever-journey.appspot.com",
    messagingSenderId: "491987639530",
    appId: "1:491987639530:web:48a534ba1b11c3afcd8b93",
    measurementId: "G-MJ9EK5Q089",
};

import firebase from 'firebase';

firebase.initializeApp(firebaseConfig);
const {validateSignupData, validateLoginData, reduceUserDetails} = require('../util/validators');

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    const {valid, errors} = validateSignupData(newUser);
    if (!valid) return res.status(400).json(errors);

    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({handle: 'This handle is already taken'})
            } else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(idToken => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({token});
        })
        .catch(err => {
            console.log(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({email: 'Email already in use'});
            } else {
                return res.status(500).json({general: err.code});
            }
        });
};

exports.login = (req, res) => {
    let user = {
        email: req.body.email,
        password: req.body.password,
    };

    const {valid, errors} = validateLoginData(user);
    if (!valid) return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user?.getIdToken();
        })
        .then(token => {
            return res.json({token})
        })
        .catch((err: any) => {
            console.log(err);
            return res.status(403).json({general: 'Wrong credentials, please try again'});
        });
};

exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);

    db.doc(`/users/${req.user.handle}`).update(userDetails)
        .then(() => {
            return res.json({meassage: 'Details added successfully'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        })
};

exports.getAuthenticatedUser = (req, res) => {
  let userData = {
      credentials: undefined,
      characters: [],
  };
  db.doc(`/users/${req.user.handle}`).get()
      .then(doc=>{
          if (doc.exists){
              userData.credentials = doc.data();
              return db.collection('characters').where('userHandle', '==', req.user.handle).get();
          }
      })
      .then(data =>{
          userData.characters = [];
          data?.forEach(doc => {
              let docData = doc.data();
              // @ts-ignore
              userData.characters.push(docData);
          });
          console.log(userData);
          return res.json(userData);
      })
      .catch(err =>{
          console.error(err);
          return res.status(500).json({error: err.code});
      })
};
