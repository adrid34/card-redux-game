import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';

import rootReducer from 'redux/modules/rootReducer';
import { newGame } from 'redux/modules/player';
import { Board } from './containers';
import './styles/app.scss';

if (module.hot) {
  module.hot.accept();
}

const store = createStore(rootReducer);
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
