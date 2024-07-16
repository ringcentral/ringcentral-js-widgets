import { errorMessages } from '@ringcentral-integration/commons/modules/RateLimiter';
import React, { Component } from 'react';

import FormattedMessage from '../../FormattedMessage';

import i18n from './i18n';

function calculateState(duration: any, timestamp: any) {
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
  timer: any;
  constructor(props: any) {
    super(props);
    this.state = calculateState(props.duration, props.timestamp);
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(calculateState(this.props.duration, this.props.timestamp));
    }, 1000);
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.setState(calculateState(nextProps.duration, nextProps.timestamp));
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    return (
      <FormattedMessage
        message={i18n.getString('rateExceeded', this.props.currentLocale)}
        values={{ ttl: this.state.ttl }}
      />
    );
  }
}
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 't... Remove this comment to see the full error message
RequestRateExceededAlert.handleMessage = ({ message }: any) =>
  message === errorMessages.rateLimitReached;
export default RequestRateExceededAlert;
