import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import socketClient from 'socket.io-client';

import configureStore from 'redux/configureStore';
import dispatchServerActions from 'redux/utils/dispatchServerActions';
import { newGame } from 'redux/modules/game';
import { DevTools, Board } from './containers';
import './styles/app.scss';
import sharedStyles from 'components/shared/styles.scss';

if (module.hot) {
  module.hot.accept();
}

const socket = socketClient('http://localhost:3000');
const store = configureStore(undefined, socket);
dispatchServerActions(store, socket);

store.dispatch(newGame({
  yourName: 'Inooid',
  opponentName: 'OpponentName',
  isPlayerStarting: Math.random() >= 0.5,
}));

const App = () => (
  <Board />
);

ReactDOM.render(
  <Provider store={store}>
    <div className={sharedStyles.fullSize}>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);
