const socket = window.io();

let nickname = socket.id;

const inputNickname = document.querySelector('#inputNickname');

const inputChatMessage = document.querySelector('#inputMessage');

const formMessage = document.querySelector('#formMessage');

const formNickname = document.querySelector('#formNickname');

formNickname.addEventListener('submit', (e) => {
    e.preventDefault();

    nickname = inputNickname.value;

    inputNickname.value = '';
});

formMessage.addEventListener('submit', (e) => {
    e.preventDefault();

    socket.emit('message', { chatMessage: inputChatMessage.value, nickname });

    inputChatMessage.value = '';
});

const updateMessages = (message) => {
    const messageList = document.querySelector('#messages');

    const li = document.createElement('li');

    li.innerText = message;

    messageList.appendChild(li);
};

socket.on('message', (message) => updateMessages(message));