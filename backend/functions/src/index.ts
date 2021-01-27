import * as functions from 'firebase-functions';

//character routes
const {getAllCharacters, createCharacter, updateCharacter} = require('./handlers/characters');
const {
    signup,
    login,
    addUserDetails,
    getAuthenticatedUser,
} = require('./handlers/users');

const app = require('express')();

const cors = require("cors");
app.use(cors());

const {FBAuth} = require('./util/FBAuth');

//character routes
app.get('/characters', FBAuth, getAllCharacters);
app.post('/character', FBAuth, createCharacter);
app.post('/updateCharacter', FBAuth, updateCharacter);
//User routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.region('europe-west1').https.onRequest(app);
