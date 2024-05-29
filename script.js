const socket = io();

const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message.trim() !== '') {
    appendMessage('You', message, 'user');
    socket.emit('sendMessage', message);
    messageInput.value = '';
  }
});

socket.on('receiveMessage', (data) => {
  appendMessage(data.sender, data.message, 'character');
});

function appendMessage(sender, message, type) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type);
  messageElement.textContent = `${sender}: ${message}`;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
}
