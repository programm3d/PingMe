const express = require('express');
const http = require('http');
const { join } = require('path');
const {Server} = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

// app.get('/', (req,res)=>{
//     res.sendFile(__dirname + './public/index.html')
// })

app.use(express.static('public'))

const user = {};

io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('username', (res)=>{
        user[socket.id] = res;
    })
    socket.on('client message', (msg)=>{
        // console.log(msg);
        const name = user[socket.id]
        const text = `${name}: ${msg}`
        io.emit('message from server',text);
    });
    socket.on('disconnect',()=>{
        console.log('Cllient is disconnected', socket.id);
    })
})


server.listen(3000,()=>{
    console.log('Server started on PORT 3000');
})