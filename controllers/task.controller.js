const Task = require('../models/task.model');
const multer = require('multer');
const upload = multer();
var fs = require('fs');
var path = require('path');
var unirest = require('unirest');

var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://heroku_l0pcjjzd:uacgb9vc7u94lcj9tp8632bonn@ds239797.mlab.com:39797/";


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.create = function (req, res) {
    let task = new Task(
        {
            name: req.body.name,
            description: req.body.description
        }
    );

    task.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Task Created successfully')
    })
};





