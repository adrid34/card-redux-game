import React, { Component, PropTypes } from 'react';

export default class MinionsOnBoard extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    const styles = require('./MinionsOnBoard.scss');

    return (
      <div className={styles.MinionsOnBoard}>
        { this.props.children }
      </div>
    );
  }
}
