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

module.exports = (io) => io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
        const message = `${getDate()} ${nickname}: ${chatMessage}`;

        io.emit('message', message);
    });
});
