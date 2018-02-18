import React from 'react';
import ReactDOM from 'react-dom';
import socketClient from 'socket.io-client';

import configureStore from 'redux/configureStore';
import {
  dispatchNewGameAction,
  dispatchServerActions,
  getInitialState,
} from 'redux/utils';

import { Root } from './containers';
import './styles/app.scss';

if (module.hot) {
  module.hot.accept();
}

const socket = socketClient('http://localhost:3000');
const store = configureStore(getInitialState(), socket);
dispatchServerActions(store, socket);
dispatchNewGameAction(store, socket);

ReactDOM.render(
  <Root store={store} socket={socket} />,
  document.getElementById('app')
);
