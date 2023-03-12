$(document).ready(function () {
  // Establish WebSocket connection
  var socket = new WebSocket('ws://' + window.location.host);

  // Send message when Send button is clicked
  $('#send-button').click(function () {
    var username = $('#username-input').val();
    var message = $('#message-input').val();

    // Send message only if both username and message are not empty
    if (username.trim() && message.trim()) {
      var data = {
        type: 'chat-message',
        username: username,
        message: message,
      };
      socket.send(JSON.stringify(data));

      // Clear message input field
      $('#message-input').val('');
    }
  });

  // Display received message
  function displayMessage(message) {
    var username = message.username;
    var content = message.content;
    var time = new Date(message.timestamp).toLocaleTimeString();

    // Create new message element
    var $message = $('<div>').addClass('message');
    var $username = $('<span>').addClass('username').text(username + ': ');
    var $content = $('<span>').addClass('content').text(content);
    var $time = $('<span>').addClass('time').text(time);

    // Append message to chat box
    $message.append($username, $content, $time);
    $('#chat-box').append($message);

    // Scroll to bottom of chat box
    $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
  }

  // Handle WebSocket messages
  socket.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'chat-message') {
      displayMessage(data);
    } else if (data.type === 'viewer-count') {
      $('#viewer-count').text('Current Viewers: ' + data.count);
    }
  };

  // Prompt user to enter a username
  var username = prompt('Please enter your username:');
  $('#username-input').val(username);

  // Send 'join' message to server with username
  var data = {
    type: 'join',
    username: username,
  };
  socket.send(JSON.stringify(data));
});
