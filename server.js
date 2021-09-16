const express = require('express');

const app = express();

app.set("view engine", 'pug')

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('index')
})

const server = app.listen(7000, () => console.log('Server listening 7000'))

//include socket io

const io = require('socket.io')(server);

io.on("connection", socket => {
    console.log('new client connected!!');
    
    socket.username = "Jallen Hunnid";

    socket.on("new_message", data => {
        io.sockets.emit("new_message", {
            message : data.message,
            username: socket.username
        });
        socket.on('change_username', data => {
            socket.username = data.username;
        })
        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', {username: socket.username}); 
        })
    });
});

