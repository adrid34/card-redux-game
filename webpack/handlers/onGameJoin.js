const {
  newGame,
  lengthOfRoom,
  clientsForRoom,
} = require('./../utils');

function onGameJoin({ gameId }) {
  const getPlayerCount = () => lengthOfRoom(this.io, gameId);

  if (getPlayerCount() === 2) return;

  this.socket.join(gameId);
  this.io.to(gameId).emit('playerJoined', { playerCount: getPlayerCount() });

  console.log('[GAMEJOIN] Current players:', clientsForRoom(this.io, gameId));

  if (getPlayerCount() === 2) {
    console.log('[GAMEJOIN] [START] Time to start the game', gameId);
    const playerOneStarts = Math.random() >= 0.5;
    const [playerOne, playerTwo] = clientsForRoom(this.io, gameId);

    this.io.to(playerOne).emit('newGame', newGame(gameId, 'GuardianBanana', playerOneStarts));
    this.io.to(playerTwo).emit('newGame', newGame(gameId, 'Boyd', !playerOneStarts));
  }
}

module.exports = onGameJoin;
