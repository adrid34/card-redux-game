import React, { PropTypes } from 'react';

import { CountdownManager } from 'containers';
import { Countdown, PlayerCard, InvitePlayerModal } from 'components';

import styles from './GameLobby.scss';

const GameLobby = ({
  player,
  opponent,
  inviteLink,
  hasOpponent,
  countdown,
  toggleReady,
  friendInviteModal,
  playerCardActions: { openFriendInviteModal, closeFriendInviteModal },
}) => (
  <div className={styles.Lobby}>
    <div className={styles.LobbyInnerWrapper}>
      {countdown.canCountdown && (
        <CountdownManager startTime={5} onFinish={countdown.onFinish}>
          {({ time }) => <Countdown>{time}</Countdown>}
        </CountdownManager>
      )}

      <section className={styles.LobbyVersus}>
        <PlayerCard playerName={player.name} ready={player.ready} />

        <div className={styles.LobbyVersusText}>VS</div>

        {hasOpponent ? (
          <PlayerCard playerName={opponent.name} ready={opponent.ready} />
        ) : (
          <PlayerCard
            playerName="Waiting..."
            showReady={false}
            button={
              <div>
                <button onClick={openFriendInviteModal}>Invite friend</button>
                <InvitePlayerModal
                  inviteLink={inviteLink}
                  isOpen={friendInviteModal.isOpen}
                  onClose={closeFriendInviteModal}
                />
              </div>
            }
          />
        )}
      </section>
      <div className={styles.LobbyReadyWrapper}>
        <button className={styles.LobbyReadyButton} onClick={toggleReady}>
          {player.ready ? 'Unready' : 'I am ready!'}
        </button>
      </div>
    </div>
  </div>
);

GameLobby.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired,
  }).isRequired,
  opponent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired,
  }).isRequired,
  inviteLink: PropTypes.string.isRequired,
  countdown: PropTypes.shape({
    canCountdown: PropTypes.bool.isRequired,
    onFinish: PropTypes.func.isRequired,
  }).isRequired,
  hasOpponent: PropTypes.bool.isRequired,
  toggleReady: PropTypes.func.isRequired,
  friendInviteModal: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  playerCardActions: PropTypes.shape({
    openFriendInviteModal: PropTypes.func.isRequired,
    closeFriendInviteModal: PropTypes.func.isRequired,
  }),
};

export default GameLobby;
