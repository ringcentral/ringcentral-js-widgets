import React, { Component, PropTypes } from 'react';
import errorMessages from 'ringcentral-integration/modules/RateLimiter/errorMessages';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

function calculateState(duration, timestamp) {
  return {
    ttl: Math.max(Math.floor((duration - (Date.now() - timestamp)) / 1000), 0),
  };
}

class RequestRateExceededAlert extends Component {
  constructor(props) {
    super(props);
    this.state = calculateState(props.duration, props.timestamp);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(calculateState(this.props.duration, this.props.timestamp));
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(calculateState(nextProps.duration, nextProps.timestamp));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <FormattedMessage
        message={i18n.getString('rateExceeded', this.props.currentLocale)}
        values={{ ttl: this.state.ttl }}
      />
    );
  }
}

RequestRateExceededAlert.propTypes = {
  timestamp: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

RequestRateExceededAlert.handleMessage = ({ message }) => (
  message === errorMessages.rateLimitReached
);

export default RequestRateExceededAlert;
