export default function curryEmitToOpponent(socket) {
  return store => next => (action) => {
    const { gameId, hasOpponent } = store.getState().currentGame;

    if (!action.fromServer && gameId && hasOpponent) {
      socket.emit('action', { gameId, action });
    }

    next(action);
  };
}
