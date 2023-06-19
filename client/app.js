const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const login = e => {
  e.preventDefault();

  const user = userNameInput.value.trim();
  if (user.length > 0) {
    userName = user;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  } else {
    alert('Your name can not be empty');
  }
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) {
    message.classList.add('message--self');
  }

  const header = document.createElement('h3');
  header.classList.add('message__author');
  header.innerHTML = author === userName ? 'You' : author;
  message.appendChild(header);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('message__content');
  contentDiv.innerHTML = content;
  message.appendChild(contentDiv);

  messagesList.appendChild(message);
};

const sendMessage = e => {
  e.preventDefault();

  const message = messageContentInput.value.trim();
  if (message.length > 0) {
    addMessage(userName, message);
    messageContentInput.value = '';
  } else {
    alert('Type your message');
  }
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
