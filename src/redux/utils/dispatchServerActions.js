import { CardModel } from 'redux/modules/card';

export default function dispatchServerActions(store, socket) {
  socket.on('action', (payload) => {
    console.log('action came in through socket!!!', payload);
    const { action } = payload;

    if (action.card) {
      action.card = new CardModel(action.card);
    }

    store.dispatch({ fromServer: true, ...action });
  });
}
