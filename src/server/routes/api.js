const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const fs = require("fs");

const GAME_COLLECTION = "games";
const SCHEMA_NAME = "GOD";


// Connect To mongo
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) return console.log(err);
        var db = client.db(SCHEMA_NAME);
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Post Games
router.post('/games/create', (req, res) => {
    
    var game = req.body;
    game.createDate = new Date();
    
    if (!req.body) {
        sendError(400, "Invalid input, no data provided");
    }
    connection((db) => {
        db.collection(GAME_COLLECTION)
        .insertOne(game)
        .then(result => {
            response.data = 'Game Saved';
            res.json(response.data);
        })
        .catch((err) => {
            sendError(err, res);
        });
    });
});

// Get Games
router.get('/games/get', (req, res) => {
    
    connection((db) => {
        db.collection(GAME_COLLECTION)
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });

});

// Get Rules
router.get('/rules/get', (req, res) => {

    try {
        var content = fs.readFileSync("rules.json");
        var jsonContent = JSON.parse(content);
        response.data = jsonContent;
        res.json(response);
      } catch (err) {
        sendError(err, res);
      }

    
});

module.exports = router;