import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
const socket = require('socket.io-client')('http://localhost:3000');

import rootReducer from 'redux/modules/rootReducer';
import { CardModel } from 'redux/modules/card';
import { DevTools } from 'containers';

function logSomething(name) {
  return (data) => {
    console.log(`yay, we got the event: ${name} ${data ? 'with data:' : ''}`, data);
  };
}

socket.on('connect', logSomething('connect'));
socket.on('disconnect', logSomething('disconnect'));

const ioMiddleWare = () => next => action => {
  if (!action.fromServer && action.type !== 'NEW_GAME') {
    console.log(action);
    if (action.card) {
      console.log('typeof action.card', typeof action.card);
    }
    socket.emit('action', { action });
  }
  next(action);
};

const enhancer = compose(
  applyMiddleware(thunk, ioMiddleWare),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  socket.on('action', (payload) => {
    console.log('action came in through socket!!!', payload);
    const { action } = payload;

    if (action.card) {
      action.card = new CardModel(action.card);
    }

    store.dispatch({ fromServer: true, ...action });
  });

  if (module.hot) {
    module.hot.accept('./modules/rootReducer', () => (
      store.replaceReducer(require('./modules/rootReducer').default)
    ));
  }

  return store;
}
