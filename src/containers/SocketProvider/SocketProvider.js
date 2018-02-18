import { Component, PropTypes, Children } from 'react';

export default class SocketProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    socket: PropTypes.shape({
      on: PropTypes.func.isRequired,
    }).isRequired,
  }

  static childContextTypes = {
    socket: PropTypes.object.isRequired,
  }

  getChildContext() {
    const { socket } = this.props;
    return { socket };
  }

  render() {
    return Children.only(this.props.children);
  }
}
