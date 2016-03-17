import React, { Component, PropTypes } from 'react';
import { Card } from 'components';

export default class Hand extends Component {
  static propTypes = {
    cards: PropTypes.array
  }

  render() {
    const styles = require('./Hand.scss');
    return (
      <div className={styles.Hand}>
        <Card name='Gabria Warden' mana={1} attack={5} defense={1} />
        <Card name='Abusive Sergeant' mana={1} attack={2} defense={1} />
        <Card name='Acolyte of Pain' mana={3} attack={1} defense={3} />
        <Card name='Azure Drake' mana={5} attack={4} defense={4} />
      </div>
    );
  }
}
