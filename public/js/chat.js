const socket = window.io();

const inputNickname = document.querySelector('#inputNickname');

const inputChatMessage = document.querySelector('#inputMessage');

const formMessage = document.querySelector('#formMessage');

const formNickname = document.querySelector('#formNickname');

// task: implementar esse evento
formNickname.addEventListener('submit', (e) => {
    e.preventDefault();

    inputNickname.value = '';
});

formMessage.addEventListener('submit', (e) => {
    e.preventDefault();

    socket.emit('message', { chatMessage: inputChatMessage.value, nickname: inputNickname.value });

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

socket.on('users', (nicknames) => {
    userList.innerHTML = '';

    // updateUsers();

    nicknames.forEach((nickname) => updateUsers(nickname));
});
