import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { List } from 'immutable';
import { DraggableCard } from 'containers';

function hasEnoughMana(card, spendableMana) {
  return card.mana <= spendableMana;
}

const Hand = ({ yourTurn, spendableMana, cards }) => {
  const styles = require('./Hand.scss');
  const cardStyles = require('./../Card/Card.scss');

  const cardsLength = cards.size;
  const cardList = cards.map((card, index) => {
    const cardClasses = classNames(cardStyles.CardYours, {
      [cardStyles[`CardTotal-${cardsLength}`]]: cardsLength,
      [cardStyles[`CardNumber-${index + 1}-of-${cardsLength}`]]: (typeof index !== undefined),
    });
    const canDrag = yourTurn && hasEnoughMana(card, spendableMana);

    return (
      <DraggableCard
        key={card.id}
        card={card}
        index={index}
        canDrag={canDrag}
        className={cardClasses}
      />
    );
  });

  return (
    <div className={styles.Hand}>
      { cardList }
    </div>
  );
};

Hand.propTypes = {
  cards: PropTypes.instanceOf(List),
  yourTurn: PropTypes.bool.isRequired,
  spendableMana: PropTypes.number.isRequired,
};

export default Hand;
