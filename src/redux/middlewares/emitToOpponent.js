export default function curryEmitToOpponent(socket) {
  return () => next => action => {
    if (!action.fromServer && action.type !== 'NEW_GAME') {
      console.log(action);
      if (action.card) {
        console.log('typeof action.card', typeof action.card);
      }
      socket.emit('action', { action });
    }
    next(action);
  };
}
