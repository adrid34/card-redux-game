import React, { PropTypes } from 'react';
import { CardBack } from 'components';

function arrayByNumber(num) {
  const array = [];
  for (let i = 0; i < num; i++) {
    array.push(undefined);
  }

  return array;
}

const OpponentHand = ({ handCount }) => {
  const styles = require('./../Hand/Hand.scss');
  const cardStyles = require('./../Card/Card.scss');
  const margin = handCount * 25;

  const cardList = arrayByNumber(handCount).map((_, index) => (
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
