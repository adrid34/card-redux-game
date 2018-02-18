/* eslint-disable class-methods-use-this */
import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Board } from 'containers';

export class GameScreen extends Component {
  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    currentGame: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      gameId: PropTypes.string.isRequired,
      hasOpponent: PropTypes.bool.isRequired,
    }).isRequired,
  }

  render() {
    return <Board />;
  }
}

function mapStateToProps({ currentGame }) {
  return { currentGame };
}

export default compose(
  connect(mapStateToProps),
  withRouter,
)(GameScreen);
