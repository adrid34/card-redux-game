import React, { PropTypes } from 'react';
import { CardBack } from 'components';

import styles from './../Hand/Hand.scss';
import cardStyles from './../Card/Card.scss';

const OpponentHand = ({ handCount }) => {
  const margin = handCount * 25;
  const cardList = Array.from(new Array(handCount), (_, index) => (
    <CardBack key={index} margin={margin} className={cardStyles.CardOpponent} />
  ));

  return (
    <div className={styles.Hand}>
      { cardList }
    </div>
  );
};

OpponentHand.propTypes = {
  handCount: PropTypes.number.isRequired,
};

export default OpponentHand;
