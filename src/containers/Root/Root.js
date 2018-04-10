import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { App, SocketProvider } from 'containers';
import { GameLobbyScreen, GameScreen, StartScreen } from 'views';
import { fetchNewGame, joinGame } from 'redux/modules/currentGame';
import sharedStyles from 'components/shared/styles.scss';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
    socket: PropTypes.shape({
      on: PropTypes.func.isRequired,
    }).isRequired,
  };

  requireName = (nextState, replace) => {
    const { name } = this.props.store.getState().player;

    if (!name) {
      replace({
        pathname: '/',
        query: { ref: nextState.location.pathname },
      });
    }
  };

  redirectToLobby = (replace, id) => {
    replace(`/game/${id}/lobby`);
  };

  redirectIfNoGameId = (nextState, replace) => {
    const { gameId } = this.props.store.getState().currentGame;

    if (!gameId) {
      replace('/');
    }
  };

  createGameAndRedirect = (nextState, replace, callback) => {
    this.props.store
      .dispatch(fetchNewGame(true))
      .then((gameId) => {
        this.redirectToLobby(replace, gameId);
        callback();
      })
      .catch((e) => {
        console.log(e);
        replace('/');
      });
  };

  joinGameAndRedirect = (nextState, replace) => {
    const { id } = nextState.params;

    this.props.store.dispatch(joinGame(id));

    this.redirectToLobby(replace, id);
  };

  render() {
    const { store, socket } = this.props;

    return (
      <div className={sharedStyles.fullSize}>
        <Provider store={store}>
          <SocketProvider socket={socket}>
            <Router history={hashHistory}>
              <Route path="/" component={App}>
                <IndexRoute component={StartScreen} />
                <Route path="game" onEnter={this.requireName}>
                  <Route path="new" onEnter={this.createGameAndRedirect} />
                  <Route path=":id">
                    <Route onEnter={this.redirectIfNoGameId}>
                      <IndexRoute component={GameScreen} />
                      <Route path="lobby" component={GameLobbyScreen} />
                    </Route>
                    <Route path="join" onEnter={this.joinGameAndRedirect} />
                  </Route>
                </Route>
              </Route>
            </Router>
          </SocketProvider>
        </Provider>
      </div>
    );
  }
}
