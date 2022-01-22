const socket = window.io();

const inputNickname = document.querySelector('#inputNickname');

const inputChatMessage = document.querySelector('#inputMessage');

const formMessage = document.querySelector('#formMessage');

const formNickname = document.querySelector('#formNickname');

let clientName = null;

formNickname.addEventListener('submit', (e) => {
    e.preventDefault();

    socket.emit('changeNickname', inputNickname.value);

    clientName = inputNickname.value;

    inputNickname.value = '';
});

formMessage.addEventListener('submit', (e) => {
    e.preventDefault();

    socket.emit('message', { chatMessage: inputChatMessage.value, nickname: clientName });

    inputChatMessage.value = '';
});

const updateMessages = (message) => {
    const messageList = document.querySelector('#messages');

    const li = document.createElement('li');

    li.dataset.testid = 'message';
    li.innerText = message;

    messageList.appendChild(li);
};

const userList = document.querySelector('#users');

const updateUsers = (nickname) => {
    const li = document.createElement('li');

    li.dataset.testid = 'online-user';
    li.innerHTML = nickname;

    userList.appendChild(li);
};

socket.on('message', (message) => updateMessages(message));

socket.on('users', (users) => {
    userList.innerHTML = '';
    
    updateUsers(users[socket.id]);

    const nicknames = Object.values(users).filter((nickname) => nickname !== users[socket.id]);

    nicknames.forEach((nickname) => updateUsers(nickname));
});
