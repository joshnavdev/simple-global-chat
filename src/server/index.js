const path = require('path');
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8000;

// Setting up the models
require('./models/History');

//models
const History = mongoose.model('history');

//Conecntig with MongoDB
const mongoURI = "mongodb://joshua:password@ds139919.mlab.com:39919/simple-chat-app";
mongoose.connect(mongoURI)
    .then(resp => {
        console.log('Connected to mongoDB');
    });

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + './index.html');
});

io.on('connection', (socket) => {
    console.log(socket.id);
    const address = socket.request.connection._peername;
    console.log(address)

    socket.on('SEND_MESSAGE', async data => {
        const { username, message } = data;
        const history = new History({
            username,
            message,
            dateSent: Date.now()
        });

        await history.save();
        io.emit('RECEIVE_MESSAGE', data);
    });

    socket.on('disconnect', () => {
        console.log(socket.id + ' has left');
    })
});

server.listen(port);

