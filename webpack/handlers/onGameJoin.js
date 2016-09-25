const {
  createLogger,
  newGame,
  lengthOfRoom,
  clientsForRoom,
} = require('./../utils');

const logGameJoin = createLogger('GAMEJOIN', 'cyan');

function onGameJoin({ gameId }) {
  const getPlayerCount = () => lengthOfRoom(this.io, gameId);

  if (getPlayerCount() === 2) return;

  this.socket.join(gameId);
  this.io.to(gameId).emit('playerJoined', { gameId, playerCount: getPlayerCount() });

  logGameJoin('Current players:', clientsForRoom(this.io, gameId));

  if (getPlayerCount() === 2) {
    logGameJoin('[START] Time to start the game', gameId);
    const playerOneStarts = Math.random() >= 0.5;
    const [playerOne, playerTwo] = clientsForRoom(this.io, gameId);

    const playerOneNewGame = newGame(gameId, 'GuardianBanana', playerOneStarts);
    this.io.to(playerOne).emit('newGame', playerOneNewGame);
    logGameJoin('[ACTION] Sent action to playerOne', playerOneNewGame);

    const playerTwoNewGame = newGame(gameId, 'Boyd', !playerOneStarts);
    this.io.to(playerTwo).emit('newGame', playerTwoNewGame);
    logGameJoin('[ACTION] Sent action to playerTwo', playerTwoNewGame);
  }
}

module.exports = onGameJoin;
