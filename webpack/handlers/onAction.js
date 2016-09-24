const { clientsForRoom, isClientInRoom } = require('./../utils');

function onAction({ gameId, action }) {
  console.log('[ACTION] current clients:', clientsForRoom(this.io, gameId));
  console.log('[ACTION] Current action from:',
              `Player${clientsForRoom(this.io, gameId).indexOf(this.socket.id) + 1}`);

  // Validate if player is actually part of this game.
  if (!isClientInRoom(this.io, gameId, this.socket.id)) return;

  let newAction = action;
  if (action.target || action.source) {
    newAction = Object.assign({}, action, {
      source: action.source === 'PLAYER' ? 'OPPONENT' : 'PLAYER',
      target: action.target === 'PLAYER' ? 'OPPONENT' : 'PLAYER',
    });
  }

  console.log('[ACTION] Broadcasting an action to:', gameId);
  console.log('[ACTION] Action being sent is:', newAction);
  this.socket.broadcast.to(gameId).emit('action', { action: newAction });
}

module.exports = onAction;
