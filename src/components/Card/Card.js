import React, { Component, PropTypes } from 'react';
import { DragSource as dragSource } from 'react-dnd';
import { CardModel } from 'redux/modules/card';

const cardSource = {
  beginDrag(props) {
    return {
      card: props.card,
      handIndex: props.index,
    };
  },
};

function collect(connect) {
  return {
    connectDragSource: connect.dragSource(),
  };
}

export class Card extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
    margin: PropTypes.number.isRequired,
    onCardClick: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.playCard = this.playCard.bind(this);
  }

  playCard() {
    const { index, card } = this.props;
    this.props.onCardClick({ card, handIndex: index });
  }

  render() {
    const { margin, connectDragSource } = this.props;
    const { name, mana, attack, defense } = this.props.card;
    const styles = require('./Card.scss');
    const marginStyle = `-${margin}px`;
    const rootClass = `${styles.Card} ${styles.CardYours}`;

    return connectDragSource(
      <div className={rootClass} style={{ margin: `auto ${marginStyle}` }}>
        <div className={styles.CardMana}>{ mana || 0 }</div>
        <h1 className={styles.CardName}>{ name }</h1>
        { attack ? <div className={styles.CardAttack}>{ attack }</div> : null }
        { defense ? <div className={styles.CardDefense}>{ defense }</div> : null }
      </div>
    );
  }
}

export default dragSource('CARD', cardSource, collect)(Card);
