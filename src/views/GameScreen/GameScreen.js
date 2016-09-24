import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Board } from 'containers';

export class GameScreen extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    currentGame: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      gameId: PropTypes.string.isRequired,
      hasOpponent: PropTypes.bool.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    if (!this.props.currentGame.gameId) {
      this.props.router.push('/');
    }
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
