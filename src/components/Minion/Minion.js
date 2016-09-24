import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { CardModel } from 'redux/modules/card';

import styles from './Minion.scss';

const Minion = ({ card: { attack, defense, portrait }, exhausted }) => {
  const minionStyles = classNames(styles.Minion, {
    [styles.MinionSleeping]: exhausted,
  });

  return (
    <div className={minionStyles} style={{ backgroundImage: `url(${portrait})` }}>
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
  exhausted: PropTypes.bool,
};

export default Minion;
