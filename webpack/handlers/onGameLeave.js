const {
  colors,
  createLogger,
} = require('./../utils');

const log = createLogger('GAMELEAVE', colors.onGameLeave);

// TODO: implment in client and notify other players
function onGameLeave({ gameId }) {
  log(`${this.socket.username} has left the game: ${gameId}`);
  this.socket.leave(gameId);
}

module.exports = onGameLeave;
