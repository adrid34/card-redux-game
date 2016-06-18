import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import configureStore from 'redux/configureStore';
import { newGame } from 'redux/modules/game';
import { playCard } from 'redux/modules/hand';
import { newRandomCard } from 'redux/utils/cards';
import { DevTools, Board } from './containers';
import './styles/app.scss';
import sharedStyles from 'components/shared/styles.scss';

if (module.hot) {
  module.hot.accept();
}

const store = configureStore();
store.dispatch(newGame({ yourName: 'Inooid', opponentName: 'OpponentName' }));
store.dispatch(
  playCard({
    card: newRandomCard(),
    source: 'OPPONENT',
  })
);
store.dispatch(
  playCard({
    card: newRandomCard(),
    source: 'OPPONENT',
  })
);

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
