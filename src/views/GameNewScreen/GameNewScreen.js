import React, { Component, PropTypes } from 'react';
import { withRouter, Link } from 'react-router';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchNewGame } from 'redux/modules/currentGame';

export class GameNewScreen extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    fetchNewGame: PropTypes.func.isRequired,
    currentGame: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      gameId: PropTypes.string.isRequired,
      hasOpponent: PropTypes.bool.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.fetchNewGame = this.fetchNewGame.bind(this);
  }

  componentDidMount() {
    this.props.fetchNewGame(true);
  }

  fetchNewGame() {
    this.props.fetchNewGame(true);
  }

  render() {
    const { createHref } = this.props.router;
    const { loading, gameId, hasOpponent } = this.props.currentGame;
    const { protocol, host } = window.location;

    return (
      <div>
        <p>Loading: { loading ? <img src="http://chimplyimage.appspot.com/images/samples/classic-spinner/animatedCircle.gif" style={{ width: '16px', height: '16px' }} /> : 'no' }</p>
        <p>found opponent? { hasOpponent ? 'yes' : 'no' }</p>
        { gameId ? (
          <div style={{ margin: 20 }}>
            <p>Hey dude, send this link to your friend 😁</p>
            <div style={{ backgroundColor: 'lightgray', padding: 20 }}>
              { loading ? 'regenerating...' : `${protocol}//${host}/${createHref(`/game/${gameId}`)}` }
            </div>
            <button onClick={this.fetchNewGame}>Regenerate URL</button>
          </div>
        ) : null }
      </div>
    );
  }
}

function mapStateToProps({ currentGame }) {
  return { currentGame };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNewGame: bindActionCreators(fetchNewGame, dispatch),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(GameNewScreen);
