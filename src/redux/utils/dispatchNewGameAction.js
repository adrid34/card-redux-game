import { newGame } from 'redux/modules/game';

export default function dispatchNewGameAction(store, socket) {
  socket.on('newGame', (payload) => {
    const { opponentName, isStarting } = payload;
    const { player } = store.getState();
    const action = newGame({
      opponentName,
      yourName: player.name,
      isPlayerStarting: isStarting,
      fromServer: true,
    });

    store.dispatch(action);
  });
}
