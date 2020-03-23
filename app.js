// app.js
const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();
const multer = require('multer');
const upload = multer();


// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/demo';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const task = require('./routes/task.route'); // Imports routes for the tasks
app.use('/tasks', task);

const user = require('./routes/user.route'); // Imports routes for the users
app.use('/users', user);



app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running on port 4000');
})



