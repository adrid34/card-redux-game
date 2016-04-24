import React, { Component, PropTypes } from 'react';

export default class BoardSideNew extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    const styles = require('./BoardSide.scss');

    return (
      <div className={styles.BoardSide}>
        { this.props.children }
      </div>
    );
  }
}
