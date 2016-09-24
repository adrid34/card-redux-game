// TODO: implment in client and notify other players
function onGameLeave(gameId) {
  this.socket.leave(gameId);
}

module.exports = onGameLeave;
