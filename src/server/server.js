const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');
const webpackConfig = require('../../webpack.dev.js');
const Game = require('./game.js');

// Setup an Express server
const app = express();
app.use(express.static('public'));
app.use((req, res, next) => {
  if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) {
    req.url = '/'
  }
  next()
});

if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the build/ folder in production
  app.use(express.static('build'));
}

// Listen on port
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.on('connection', socket => {
  console.log('Player connected!', socket.id);
  socket.on('join', joinGame);
  socket.on('disconnect', onDisconnect);
  socket.on('leave', onLeave);
});

const game = new Game('asdf')

// these need to be "function ..."
function joinGame({ username, oldID }) {
  game.addPlayer(this, username, oldID)
}

function onDisconnect() {
  game.disconnectPlayer(this);
}

function onLeave() {
  game.removePlayer(this);
}