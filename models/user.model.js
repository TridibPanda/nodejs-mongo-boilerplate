const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    img: {type:String, require: false},
    dob: {type: Date, required:false},
    email: {type: String, required: true},
    mobile:{type: Number, required: true},
    password: {type: String, required: true},
 });



exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

 // Export the model
module.exports = mongoose.model('User', UserSchema);