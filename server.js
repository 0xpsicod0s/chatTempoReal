const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { resolve } = require('path');
const route = require('./routes');

app.use(express.static(resolve(__dirname, 'public')));
app.use(route);

io.on('connection', socket => {

    socket.on('disconnect', () => {
        io.emit('userLogOut', 'Um usuário se desconectou');
    });

    socket.on('message', msg => {
        io.emit('message', msg);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log('Servidor iniciado com sucesso!');
    console.log(`Acessar servidor: http://localhost:${port}`);
});