import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';

import { Board } from './containers';
import './styles/app.scss';

const store = createStore(() => { return {}; });

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
