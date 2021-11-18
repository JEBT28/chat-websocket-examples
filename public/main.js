// UTILS
// Conect to websocket: Socket.io
var socket = io();


var scape = function(html) {
  return $('<div>').text(html).html();
};



// AUTH

// Modal to login to new users
$('#login').modal({ dismissible: false }).submit(function (e) {
  e.preventDefault();
  var user = $('#login input').val();

  // If user value is valid, emit the login user to the server
  if (!user) return;
  cookies({ user });
  $('#login').modal('close');
  $("#username").text(user);
  socket.emit('login', user);
  setTimeout(function(){ $('#message').focus(); }, 500);
});

//Check if exits any cookie and if exists, get the user
if (cookies('user')) {
  //Emmit the login event to the server
  $("#username").text(cookies('user'));
  socket.emit('login', cookies('user'));
  setTimeout(function(){ $('#message').focus(); }, 500);
} else { // If not, show the login modal to login in the chat
  $('#login').modal('open');
}

$('.logout').click(function(){
  cookies({ user: null });
  window.location.reload();
});

// MENSAJES

// Append the mesage element to the chat
var add = function(html) {
  var toScroll = $('.messages').prop("scrollHeight") - 50 < $('.messages').scrollTop() + $('.messages').height();
  $('.messages').append(html);

  // Scroll to the bottom of the chat
  if (toScroll) {
    $('.messages').stop(true).animate({
      scrollTop: $('.messages').prop("scrollHeight")
    }, 500);
  }
};

// Send a message 
$('form.message').submit(function(e){
  e.preventDefault();
  var $input = $(e.target).find('input');
  var text = $input.val();

  // Clean the message input
  $input.val('');

  // Emmit the message to all
  socket.emit('message', text);
});


socket.on('login', function(message) {
  add('<div class="msg login">\
    <span class="user">' + scape(message.user) + '</span> logged in.\
  </div>');
});

//Append message to chat 
socket.on('message', function(message) {
  add('<div class="msg">\
    <span class="user">' + scape(message.user) + ':</span> \
    <span class="msg">' + scape(message.text) + '</span>\
  </div>');
});

//Append the logout information
socket.on('logout', function(message) {
  add('<div class="msg logout">\
    <span class="user">' + scape(message.user) + '</span> logged out.\
  </div>');
});
