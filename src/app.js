import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import ReactDOM from 'react-dom';

import handReducer from './redux/modules/hand';
import playerReducer, { newGame } from './redux/modules/player';
import { Board } from './containers';
import './styles/app.scss';

if (module.hot) {
  module.hot.accept();
}

const reducers = combineReducers({
  player: combineReducers({
    name: playerReducer,
    hand: handReducer,
  }),
});
const store = createStore(reducers);
store.dispatch(newGame('Inooid'));

class App extends Component {
  render() {
    return <Board />;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
