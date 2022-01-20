const express = require('express');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);

const chatController = require('./controllers/chatController');

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', chatController);

const PORT = 3000;

http.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
