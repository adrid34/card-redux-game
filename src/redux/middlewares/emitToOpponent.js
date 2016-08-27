export default function curryEmitToOpponent(socket) {
  return () => next => action => {
    if (!action.fromServer) {
      console.log(action);
      socket.emit('action', { action });
    }
    next(action);
  };
}
