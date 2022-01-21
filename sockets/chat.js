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

const users = {};

module.exports = (io) => io.on('connection', (socket) => {
    const randomNickname = socket.id.substring(0, 16);

    users[socket.id] = randomNickname;
    
    io.emit('users', users);

    socket.on('message', ({ chatMessage, nickname }) => {
        const message = `${getDate()} ${nickname}: ${chatMessage}`;

        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        io.emit('message', `${users[socket.id]} desconectou.`);

        delete users[socket.id];

        io.emit('users', users);
    });
});
