const { create } = require('../models/Historic');

const formatHours = (date) => {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (+hour <= 12) return `${hour}:${minutes}:${seconds}`;

    return `${hour}:${minutes}:${seconds} PM`;
};

const getDate = () => {
    const date = new Date();

    const formatedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    return `${formatedDate} ${formatHours(date)}`;
};

const users = {}; // dicionário de usuários online

module.exports = (io) => io.on('connection', (socket) => {
    users[socket.id] = socket.id.substring(0, 16); // adiciona novo usuário no dicionáio com id e nickname temporário
    
    io.emit('users', users);

    socket.on('message', async ({ chatMessage, nickname }) => {
        let message = null;

        if (!nickname) {
            message = `${getDate()} ${users[socket.id]}: ${chatMessage}`;
        } else {
            message = `${getDate()} ${nickname}: ${chatMessage}`;
        }

        await create(message); // adiciona mensagem ao banco de dados
        
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        // io.emit('message', `${users[socket.id]} desconectou.`);

        delete users[socket.id];

        io.emit('users', users);
    });
});
