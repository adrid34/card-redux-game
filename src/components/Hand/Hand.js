import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { List } from 'immutable';
import { DraggableCard } from 'containers';

const Hand = ({ cards }) => {
  const styles = require('./Hand.scss');
  const cardStyles = require('./../Card/Card.scss');

  const cardsLength = cards.size;
  const cardList = cards.map((card, index) => {
    const cardClasses = classNames(cardStyles.CardYours, {
      [cardStyles[`CardTotal-${cardsLength}`]]: cardsLength,
      [cardStyles[`CardNumber-${index + 1}-of-${cardsLength}`]]: (typeof index !== undefined),
    });

    return <DraggableCard key={card.uniqId} card={card} index={index} className={cardClasses} />;
  });

  return (
    <div className={styles.Hand}>
      { cardList }
    </div>
  );
};

Hand.propTypes = {
  cards: PropTypes.instanceOf(List),
};

export default Hand;
