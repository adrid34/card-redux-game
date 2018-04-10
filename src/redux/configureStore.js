import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import emitToOpponent from 'redux/middlewares/emitToOpponent';
import persistPlayerName from 'redux/middlewares/persistPlayerName';
import rootReducer from 'redux/modules/rootReducer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const enhancer = socket =>
  composeEnhancers(applyMiddleware(thunk, emitToOpponent(socket), persistPlayerName));

export default function configureStore(initialState, socket) {
  const store = createStore(rootReducer, initialState, enhancer(socket));

  if (module.hot) {
    module.hot.accept(
      './modules/rootReducer',
      () => store.replaceReducer(require('./modules/rootReducer').default) // eslint-disable-line global-require
    );
  }

  return store;
}
