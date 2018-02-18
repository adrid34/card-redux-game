const {
  colors,
  createLogger,
  lengthOfRoom,
  clientsForRoom,
} = require('./../utils');

const logGameJoin = createLogger('GAMEJOIN', colors.onGameJoin);

function onGameJoin({ gameId, name }) {
  const getPlayerCount = () => lengthOfRoom(this.io, gameId);

  if (getPlayerCount() === 2) return;

  this.socket.username = name;
  this.socket.join(gameId);
  this.io.to(gameId).emit('playerJoined', {
    gameId,
    name,
    socketId: this.socket.id,
    playerCount: getPlayerCount(),
  });

  if (getPlayerCount() === 2) {
    const enemySocketId = clientsForRoom(this.io, gameId).find(id => id !== this.socket.id);
    const enemyPlayerName = this.io.sockets.connected[enemySocketId].username;

    this.io.to(this.socket.id).emit('playerJoined', {
      gameId,
      name: enemyPlayerName,
      socketId: enemySocketId,
      playerCount: getPlayerCount(),
    });
  }

  logGameJoin('Current players:', clientsForRoom(this.io, gameId));
}

module.exports = onGameJoin;
