import React, { Component, PropTypes } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';

import { NewPlayerForm } from 'containers';
import { setPlayerName } from 'redux/modules/name';

export class StartScreen extends Component {
  static propTypes = {
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        ref: PropTypes.string,
      }).isRequired,
    }).isRequired,
    playerName: PropTypes.string.isRequired,
    setPlayerName: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.goToRef(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    this.goToRef(nextProps);
  }

  goToRef = (props) => {
    const { router, location, playerName } = props;
    const { ref } = location.query;

    if (playerName && ref) {
      router.replace(ref);
    }
  }

  render() {
    const { playerName } = this.props;

    return (
      <div>
        <h1>Welcome to HearthStone{ playerName && `, ${playerName}` }</h1>
        { playerName ? (
          <div>
            <div><button><Link to="/game/new">Start new game</Link></button></div>
            <div><button><Link to="/game/join">Join existing game</Link></button></div>
          </div>
        ) : (
          <NewPlayerForm playerName={playerName} onSubmit={this.props.setPlayerName} />
        ) }
      </div>
    );
  }
}

const mapStateToProps = state => ({ playerName: state.player.name });
const mapDispatchToProps = dispatch => (bindActionCreators({ setPlayerName }, dispatch));

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(StartScreen);

