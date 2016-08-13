import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';

import emitToOpponent from 'redux/middlewares/emitToOpponent';
import rootReducer from 'redux/modules/rootReducer';
import { DevTools } from 'containers';

const enhancer = socket => compose(
  applyMiddleware(thunk, emitToOpponent(socket)),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState, socket) {
  const store = createStore(rootReducer, initialState, enhancer(socket));

  if (module.hot) {
    module.hot.accept('./modules/rootReducer', () => (
      store.replaceReducer(require('./modules/rootReducer').default)
    ));
  }

  return store;
}
