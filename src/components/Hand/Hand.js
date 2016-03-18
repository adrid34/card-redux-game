import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { Card } from 'components';

export default class Hand extends Component {
  static propTypes = {
    cards: PropTypes.instanceOf(List),
    dispatch: PropTypes.func,
  }

  render() {
    const { cards } = this.props;
    const styles = require('./Hand.scss');

    const cardList = cards.map((card, index) => (
      <Card card={card} key={card.id} index={index} />
    ));

    return (
      <div className={styles.Hand}>
        { cardList }
      </div>
    );
  }
}
