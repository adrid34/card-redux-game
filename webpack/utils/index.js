function newGame(gameId, opponentName, isStarting) {
  return {
    gameId,
    opponentName,
    isStarting,
  };
}

function lengthOfRoom(io, name) {
  const room = io.sockets.adapter.rooms[name];

  if (room) {
    return room.length;
  }

  return 0;
}

function clientsForRoom(io, name) {
  const room = io.sockets.adapter.rooms[name];

  if (room) {
    return Object.keys(room.sockets);
  }

  return [];
}

function isClientInRoom(io, roomName, clientId) {
  const clients = clientsForRoom(io, roomName);

  return clients.indexOf(clientId) !== -1;
}

module.exports = {
  newGame,
  lengthOfRoom,
  clientsForRoom,
  isClientInRoom,
};
