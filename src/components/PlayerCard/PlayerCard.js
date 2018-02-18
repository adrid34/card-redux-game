import React, { PropTypes } from 'react';
import styles from './PlayerCard.scss';

const PlayerCard = ({
  playerName,
  ready = false,
  button = null,
  showReady = true,
}) => (
  <section className={styles.PlayerCard}>
    <div className={styles.PlayerCardAvatar} />
    <h1 className={styles.PlayerCardName}>{ playerName }</h1>
    <div>{ showReady && (ready ? 'Ready' : 'Not ready') }</div>
    { button && button }
  </section>
);

PlayerCard.propTypes = {
  playerName: PropTypes.string.isRequired,
  ready: PropTypes.bool,
  button: PropTypes.node,
  showReady: PropTypes.bool,
};

export default PlayerCard;
