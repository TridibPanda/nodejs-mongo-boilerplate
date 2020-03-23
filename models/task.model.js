const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false}
});


// Export the model
module.exports = mongoose.model('Task', TaskSchema);