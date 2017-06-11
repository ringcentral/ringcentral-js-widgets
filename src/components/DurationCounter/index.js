import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatDuration from '../../lib/formatDuration';

export default class DurationCounter extends Component {
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
    return {
      duration: Math.round(((new Date()).getTime() - this.props.startTime) / 1000),
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

DurationCounter.propTypes = {
  className: PropTypes.string,
  startTime: PropTypes.number.isRequired,
};

DurationCounter.defaultProps = {
  className: null,
};
