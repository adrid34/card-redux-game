exports.newGame = function newGame(gameId, opponentName, isStarting) {
  return {
    gameId,
    opponentName,
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
