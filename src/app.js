import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';

import { Board } from './containers';
import './styles/app.scss';

if (module.hot) {
  module.hot.accept();
}


const initialState = [
  { id: 1, name: 'Gabria Warden', mana: 1, attack: 5, defense: 1 },
  { id: 2, name: 'Abusive Sergeant', mana: 1, attack: 2, defense: 1 },
  { id: 3, name: 'Acolyte of Pain', mana: 3 },
  { id: 4, name: 'Azure Drake', mana: 5, attack: 4, defense: 4 },
];

const deckReducer = (state = initialState, action) => {
  if (action.type === 'PLACE_CARD') {
    const index = action.index;
    const length = state.length;
    return [
      ...state.slice(0, index),
      ...state.slice(index + 1, length),
    ];
  }
  if (action.type === 'LOG_CARD') {
    console.log(action.card);
    return state;
  }
  return state;
};

const store = createStore(deckReducer);

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
