import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { CardModel } from 'redux/modules/card';

const Minion = ({ card: { attack, defense, portrait } }) => {
  const styles = require('./Minion.scss');

  return (
    <div className={styles.Minion} style={{ backgroundImage: `url(${portrait})` }}>
      <div className={classNames(styles.MinionStat, styles.MinionAttack)}>
        { attack || 0 }
      </div>
      <div className={classNames(styles.MinionStat, styles.MinionDefense)}>
        { defense || 0 }
      </div>
    </div>
  );
};

Minion.propTypes = {
  card: PropTypes.instanceOf(CardModel).isRequired,
};

export default Minion;
