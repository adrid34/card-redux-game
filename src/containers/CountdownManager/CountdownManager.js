import { Component, PropTypes } from 'react';

export default class CountdownManager extends Component {
  static propTypes = {
    startTime: PropTypes.number.isRequired,
    onFinish: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  }

  state = {
    started: false,
    time: this.props.startTime || 0,
  };

  componentDidMount() {
    this.startCountdown();
  }

  componentWillUnmount() {
    clearInterval(this.countdownInterval);
  }

  startCountdown = () => {
    // If already started, don't do anything.
    if (this.state.started) return;

    this.setState(() => ({ started: true }));
    this.countdownInterval = setInterval(this.countDown, 1000);
  }

  countDown = () => {
    this.setState(() => ({ time: this.state.time - 1 }));

    if (this.state.time <= 0) {
      this.props.onFinish();
      clearInterval(this.countdownInterval);
    }
  }

  render() {
    return this.props.children({
      time: this.state.time,
    });
  }
}
