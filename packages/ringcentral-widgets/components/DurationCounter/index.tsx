import React, { Component } from 'react';

import formatDuration from '../../lib/formatDuration';

type DurationCounterProps = {
  className?: string;
  startTime: number;
  offset?: number;
};
type DurationCounterState = {
  duration: number;
};
class DurationCounter extends Component<
  DurationCounterProps,
  DurationCounterState
> {
  constructor(props) {
    super(props);
    this.state = this.calculateState();
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(this.calculateState());
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  calculateState() {
    const startTime = this.props.startTime + this.props.offset;
    return {
      duration: Math.round((new Date().getTime() - startTime) / 1000),
    };
  }
  render() {
    return (
      <span className={this.props.className}>
        {formatDuration(this.state.duration)}
      </span>
    );
  }
}
DurationCounter.defaultProps = {
  className: null,
  offset: 0,
};
export default DurationCounter;
