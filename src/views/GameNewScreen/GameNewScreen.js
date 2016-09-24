import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  updateHasOpponent,
  joinGame,
  fetchNewGame,
} from 'redux/modules/currentGame';

export class GameNewScreen extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    joinGame: PropTypes.func.isRequired,
    fetchNewGame: PropTypes.func.isRequired,
    updateHasOpponent: PropTypes.func.isRequired,
    currentGame: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      gameId: PropTypes.string.isRequired,
      hasOpponent: PropTypes.bool.isRequired,
    }).isRequired,
    socket: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.addGameJoinedEventHandler = this.addGameJoinedEventHandler.bind(this);
    this.fetchNewGame = this.fetchNewGame.bind(this);
    this.joinNewGame = this.joinNewGame.bind(this);
    this.goInGame = this.goInGame.bind(this);
    this.openAlert = this.openAlert.bind(this);
  }

  componentDidMount() {
    const { socket } = this.props;

    this.props.fetchNewGame(true).then(gameId => {
      this.emitGameJoin(socket, gameId);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { gameId } = this.props.currentGame;

    if (gameId !== nextProps.currentGame.gameId) {
      this.addGameJoinedEventHandler(nextProps.currentGame.gameId);
    }
  }

  emitGameJoin(socket, gameId) {
    socket.emit('gameJoin', { gameId });
  }

  addGameJoinedEventHandler(gameId) {
    const { socket } = this.props;

    socket.on('playerJoined', ({ playerCount }) => {
      if (playerCount === 2) {
        this.props.updateHasOpponent(true);
        this.goInGame(gameId);
      }
    });
  }

  fetchNewGame() {
    this.props.fetchNewGame(true);
  }

  joinNewGame(gameId) {
    const { socket } = this.props;

    this.props.joinGame(gameId);
    this.emitGameJoin(socket, gameId);
  }

  goInGame(gameId) {
    const { router } = this.props;

    router.push(`/game/${gameId}`);
  }

  openAlert() {
    const gameId = prompt('What game do you want to join?');
    console.log('filled in gameId', gameId);

    if (gameId) {
      this.joinNewGame(gameId);
    }
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
              { loading ?
                'regenerating...' :
                `${protocol}//${host}/${createHref(`/game/${gameId}`)}`
              }
            </div>
            <button onClick={this.fetchNewGame}>Regenerate URL</button>
            <button onClick={this.openAlert}>Join specific game</button>
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
    joinGame: bindActionCreators(joinGame, dispatch),
    fetchNewGame: bindActionCreators(fetchNewGame, dispatch),
    updateHasOpponent: bindActionCreators(updateHasOpponent, dispatch),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(GameNewScreen);
