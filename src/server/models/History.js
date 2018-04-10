const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({
    username: String,
    message: String,
    dateSent: Date
});

mongoose.model('history', historySchema);
