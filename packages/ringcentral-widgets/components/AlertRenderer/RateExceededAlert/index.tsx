import React, { Component } from 'react';

import errorMessages from '@ringcentral-integration/commons/modules/RateLimiter/errorMessages';

import FormattedMessage from '../../FormattedMessage';
import i18n from './i18n';

function calculateState(duration, timestamp) {
  return {
    ttl: Math.max(Math.floor((duration - (Date.now() - timestamp)) / 1000), 0),
  };
}
type RequestRateExceededAlertProps = {
  timestamp: number;
  duration: number;
  currentLocale: string;
};
type RequestRateExceededAlertState = {
  ttl: number;
};
class RequestRateExceededAlert extends Component<
  RequestRateExceededAlertProps,
  RequestRateExceededAlertState
> {
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
RequestRateExceededAlert.handleMessage = ({ message }) =>
  message === errorMessages.rateLimitReached;
export default RequestRateExceededAlert;
