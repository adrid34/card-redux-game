const {
  colors,
  createLogger,
  clientsForRoom,
  isClientInRoom,
} = require('./../utils');

const logAction = createLogger('ACTION', colors.onAction);

function onAction({ gameId, opponentHandCount, action }) {
  logAction('current clients:', clientsForRoom(this.io, gameId));
  logAction('Current action from:',
            `Player${clientsForRoom(this.io, gameId).indexOf(this.socket.id) + 1}`);

  // Validate if player is actually part of this game.
  if (!isClientInRoom(this.io, gameId, this.socket.id)) return;

  let newAction = Object.assign({}, action, { opponentHandCount });
  if (action.target || action.source) {
    newAction = Object.assign({}, newAction, {
      source: action.source === 'PLAYER' ? 'OPPONENT' : 'PLAYER',
      target: action.target === 'PLAYER' ? 'OPPONENT' : 'PLAYER',
    });
  }

  logAction('Broadcasting an action to:', gameId);
  logAction('Action being sent is:', newAction);
  this.socket.broadcast.to(gameId).emit('action', { action: newAction });
}

module.exports = onAction;
