import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { DraggableCard } from 'containers';

export default class Hand extends Component {
  static propTypes = {
    cards: PropTypes.instanceOf(List),
  }

  render() {
    const { cards } = this.props;
    const styles = require('./Hand.scss');
    const margin = cards.count() * 6;

    const cardList = cards.map((card, index) => (
      <DraggableCard
        card={card}
        key={card.uniqId}
        index={index}
        margin={margin}
      />
    ));

    return (
      <div className={styles.Hand}>
        { cardList }
      </div>
    );
  }
}
