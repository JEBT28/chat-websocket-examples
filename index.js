const server = require('server');
const { get, socket } = server.router;
const { file } = server.reply;
const chat = require('./chat');

// Start the server in port 3000
server([

  // Show the index page when the user access to default route
  get('/', file('./public/index.html')),

  // Rutas para el chat
  socket('login',      chat.login),
  socket('message',    chat.message),
  socket('logout',     chat.logout),  // Logout manually
  socket('disconnect', chat.logout),  // Logout when the user close the browser

  // To any request that not match any route, show the 404 page (Not found)
  get('*', ctx => 404)
]);
