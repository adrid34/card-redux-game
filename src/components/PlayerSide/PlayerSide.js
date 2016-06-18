import React, { Component, PropTypes } from 'react';

export default class PlayerSide extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    const styles = require('./PlayerSide.scss');

    return (
      <div className={styles.PlayerSide}>
        { this.props.children }
      </div>
    );
  }
}
