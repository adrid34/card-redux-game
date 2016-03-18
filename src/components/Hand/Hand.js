import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card } from 'components';

export class Hand extends Component {
  static propTypes = {
    cards: PropTypes.array,
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.placeCard = this.placeCard.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  placeCard(card, index) {
    this.props.dispatch({ card, index, type: 'PLACE_CARD' });
  }

  render() {
    const { cards } = this.props;
    const styles = require('./Hand.scss');
    return (
      <div className={styles.Hand}>
        { cards.map((card, index) => (
          <Card {...card} key={card.id} index={index} onClick={this.placeCard} />
        )) }
      </div>
    );
  }
}

export default connect((state) => ({ cards: state }))(Hand);
