// Event function to notify all users that an user has logged in
exports.login = ctx => {
    ctx.socket.user = ctx.data;
    console.log(`Login - ${ctx.socket.user}`);
    return ctx.io.emit('login', {
      user: ctx.socket.user,
      time: new Date()
    });
  };
  
  // event function to send a message to all users
  exports.message = ctx => {
    console.log(`Message - ${ctx.socket.user}: ${ctx.data}`);
    ctx.io.emit('message', {
      user: ctx.socket.user,
      text: ctx.data,
      time: new Date()
    });
  };
  
  // Even function to notify all users that an user has logged out
  exports.logout = ctx => {
    console.log(`Logout - ${ctx.socket.user}`);
    if (!ctx.socket.user) return; // Para los que entran y salen sin hacer login
    return ctx.io.emit('logout', {
      user: ctx.socket.user,
      time: new Date()
    });
  };
  