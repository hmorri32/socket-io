const socket         = io();
const $messages      = $('.messages');
const $userName      = $('#username');
const $messageInput  = $('#message-text');
const $submitMessage = $('#submit-message')

const addMessage = (message) => {
  $(`<p class="message"> <strong>${message.user}</strong>: ${message.text}</p>`).appendTo($messages);
}

socket.on('connect', function() {
  console.log('connected like a motherfucker.');
});

socket.on('message', addMessage);

$submitMessage.on('click', function() {
  console.log('hey broski')

  socket.send('message', {
    user: $userName.val(),
    text: $messageInput.val()
  })
})
