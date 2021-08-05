const socket = io();
const form = document.querySelector('.form');
const input = document.querySelector('.message');
const nickname = document.querySelector('.nickname');
const batePapo = document.querySelector('.bate-papo');

form.addEventListener('submit', e => {
    e.preventDefault();

    if (input.value && nickname.value) {
        const messageObj = {
            nickname: nickname.value,
            input: input.value
        };
        socket.emit('message', messageObj);
        input.value = '';
    }
});

socket.on('userLogOut', exit => {
    const disconnect = document.createElement('div');
    disconnect.classList.add('alert-danger');
    disconnect.classList.add('text-center');
    disconnect.textContent = exit;
    batePapo.appendChild(disconnect);
    window.scrollTo(0, document.body.scrollHeight);    
});

socket.on('message', msg => {
    const message = document.createElement('div');
    message.innerHTML = `<strong>${msg.nickname}:</strong> ${msg.input}`
    batePapo.appendChild(message);
    window.scrollTo(0, document.body.scrollHeight);
});