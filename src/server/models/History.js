const mongoose = require('mongoose');
const { Schema } = mongoose;

const historicalSchema = new Schema({
    username: String,
    message: String,
    dateSent: Date
});

mongoose.model('historical', historicalSchema);
