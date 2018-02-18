import React, { Component, PropTypes } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withSocket } from 'hoc';
import { GameLobby } from 'components';
import { setReady, toggleReady } from 'redux/modules/ready';
import { startGame, updateHasOpponent, resetCurrentGame } from 'redux/modules/currentGame';
import { setOpponentName } from 'redux/modules/name';
import { openFriendInviteModal, closeFriendInviteModal } from 'redux/modules/friendInviteModal';

export class GameLobbyScreen extends Component {
  static propTypes = {
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
      ready: PropTypes.bool.isRequired,
    }).isRequired,
    opponent: PropTypes.shape({
      name: PropTypes.string.isRequired,
      ready: PropTypes.bool.isRequired,
    }).isRequired,
    gameId: PropTypes.string.isRequired,
    hasOpponent: PropTypes.bool.isRequired,
    started: PropTypes.bool.isRequired,
    friendInviteModal: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      setReady: PropTypes.func.isRequired,
      toggleReady: PropTypes.func.isRequired,
      startGame: PropTypes.func.isRequired,
      updateHasOpponent: PropTypes.func.isRequired,
      setOpponentName: PropTypes.func.isRequired,
      resetCurrentGame: PropTypes.func.isRequired,
    }),
    playerCardActions: PropTypes.shape({
      openFriendInviteModal: PropTypes.func.isRequired,
      closeFriendInviteModal: PropTypes.func.isRequired,
    }),
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired,
    }).isRequired,
    socket: PropTypes.shape({
      id: PropTypes.string.isRequired,
      emit: PropTypes.func.isRequired,
      on: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    canCountdown: true,
  }

  componentDidMount = () => {
    this.joinGame(this.props);
    this.notifyOnPlayerJoined(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.gameId !== this.props.gameId) {
      this.joinGame(nextProps);
    }

    if (nextProps.player.ready && nextProps.opponent.ready) {
      this.startCountdown();
    } else {
      this.stopCountdown();
    }
  }

  componentWillUnmount = () => {
    if (!this.props.started) {
      this.leaveGame(this.props);
    }

    this.removeOnPlayerJoinedListener(this.props);
  }

  startCountdown = () => this.setState(() => ({ canCountdown: true }));
  stopCountdown = () => this.setState(() => ({ canCountdown: false }));

  handleCountdownFinish = () => {
    this.startGame(this.props);
    this.goInGame(this.props);
  }

  notifyOnPlayerJoined = (props) => {
    props.socket.on('playerJoined', ({ socketId, name, playerCount }) => {
      if (this.props.socket.id !== socketId) {
        props.actions.setOpponentName(name);
      }

      if (playerCount === 2) {
        props.actions.updateHasOpponent(true);
      }
    });
  }

  removeOnPlayerJoinedListener = (props) => {
    props.socket.removeAllListeners('playerJoined');
  }

  emitReadyChange = (props, readyState) => {
    const { socket, gameId } = props;

    socket.emit('readyChange', { gameId, readyState });
  }

  startGame = (props) => {
    const { socket, gameId, actions } = props;

    socket.emit('gameStart', { gameId });
    actions.startGame();
  }

  joinGame = (props) => {
    const { socket, gameId, player: { name } } = props;

    socket.emit('gameJoin', { gameId, name });
  }

  leaveGame = (props) => {
    const { socket, gameId, actions } = props;

    socket.emit('gameLeave', { gameId });
    actions.resetCurrentGame();
  }

  goInGame = (props) => {
    const { router, gameId } = props;

    router.push(`/game/${gameId}`);
  }

  toggleReadyForPlayer = () => {
    this.props.actions.toggleReady({ target: 'PLAYER' });
    this.emitReadyChange(this.props, !this.props.player.ready);
  }

  render() {
    const { canCountdown } = this.state;
    const { gameId } = this.props;
    const { createHref } = this.props.router;
    const { protocol, host } = window.location;
    const countdown = { canCountdown, onFinish: this.handleCountdownFinish };
    const inviteLink = `${protocol}//${host}/${createHref(`/game/${gameId}/join`)}`;

    return (
      <GameLobby
        {...this.props}
        inviteLink={inviteLink}
        countdown={countdown}
        toggleReady={this.toggleReadyForPlayer}
      />
    );
  }
}

const mapStateToProps = ({ player, opponent, currentGame, lobby }) => {
  const { gameId, started, hasOpponent } = currentGame;
  const { friendInviteModal } = lobby;

  return {
    player,
    opponent,
    gameId,
    started,
    hasOpponent,
    friendInviteModal,
  };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setReady,
    toggleReady,
    startGame,
    updateHasOpponent,
    setOpponentName,
    resetCurrentGame,
  }, dispatch),
  playerCardActions: bindActionCreators({
    openFriendInviteModal,
    closeFriendInviteModal,
  }, dispatch),
});

export default compose(
  withSocket,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(GameLobbyScreen);
