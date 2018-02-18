const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies

exports.colors = {
  onAction: 'green',
  onGameJoin: 'cyan',
  onGameStart: 'magenta',
  onGameLeave: 'red',
};

exports.createLogger = function createLogger(prefix, color) {
  return console.log.bind(console, `[${chalk[color](prefix)}]`);
};

exports.newGame = function newGame(gameId, isStarting) {
  return {
    gameId,
    isStarting,
  };
};

exports.lengthOfRoom = function lengthOfRoom(io, roomName) {
  const room = io.sockets.adapter.rooms[roomName];

  if (room) {
    return room.length;
  }

  return 0;
};

exports.clientsForRoom = function clientsForRoom(io, roomName) {
  const room = io.sockets.adapter.rooms[roomName];

  if (room) {
    return Object.keys(room.sockets);
  }

  return [];
};

exports.isClientInRoom = function isClientInRoom(io, roomName, clientId) {
  const clients = exports.clientsForRoom(io, roomName);

  return clients.indexOf(clientId) !== -1;
};

/**
 * Binds supplied io and socket as this to given function
 * @param  {Object} io     the io object
 * @param  {Object} socket the socket object
 * @return {Function} function that takes a function argument that will receive the socket binding
 */
exports.bindSocket = function bindSocket(io, socket) {
  return functionHandler => functionHandler.bind({ io, socket });
};
