import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { CardModel } from 'redux/modules/card';

const cardSource = {
  beginDrag(props) {
    return {
      card: props.card,
      handIndex: props.index,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export class Card extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
    margin: PropTypes.number.isRequired,
    onCardClick: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
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
    const { margin, isDragging, connectDragSource } = this.props;
    const { name, mana, attack, defense } = this.props.card;
    const styles = require('./Card.scss');
    const marginStyle = `-${margin}px`;
    const rootClass = `${styles.Card} ${styles.CardYours}`;

    return connectDragSource(
      <div className={rootClass} style={{ margin: `auto ${marginStyle}`, opacity: isDragging ? 0.5 : 1 }}>
        <div className={styles.CardMana}>{ mana || 0 }</div>
        <h1 className={styles.CardName}>{ name }</h1>
        { attack ? <div className={styles.CardAttack}>{ attack }</div> : null }
        { defense ? <div className={styles.CardDefense}>{ defense }</div> : null }
      </div>
    );
  }
}

export default DragSource('CARD', cardSource, collect)(Card);
