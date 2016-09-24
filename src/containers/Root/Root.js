import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { App, DevTools } from 'containers';
import { StartScreen, GameNewScreen, GameScreen } from 'views';
import sharedStyles from 'components/shared/styles.scss';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object,
    socket: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.withSocket = this.withSocket.bind(this);
  }

  withSocket(component) {
    return (props) => React.createElement(component, { socket: this.props.socket, ...props });
  }

  render() {
    const { store } = this.props;

    return (
      <div className={sharedStyles.fullSize}>
        <Provider store={store}>
          <Router history={hashHistory}>
            <Route path="/" component={App}>
              <IndexRoute component={StartScreen} />
              <Route path="game">
                <Route path="new" component={this.withSocket(GameNewScreen)} />
                <Route path=":id" component={GameScreen} />
              </Route>
            </Route>
          </Router>
        </Provider>
        <DevTools store={store} />
      </div>
    );
  }
}
