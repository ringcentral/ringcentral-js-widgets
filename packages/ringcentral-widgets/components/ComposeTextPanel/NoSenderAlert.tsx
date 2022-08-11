import React, { Component } from 'react';

import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';

import AlertDisplay from '../AlertDisplay';
import MessageSenderAlert from '../AlertRenderer/MessageSenderAlert';

type NoSenderAlertProps = {
  currentLocale: string;
  showAlert: boolean;
  brand?: string;
};
type NoSenderAlertState = {
  showAlert: any;
};
class NoSenderAlert extends Component<NoSenderAlertProps, NoSenderAlertState> {
  getRenderer: any;
  messages: any;
  onDismissAlert: any;
  constructor(props: any) {
    super(props);
    this.state = {
      showAlert: props.showAlert,
    };
    this.onDismissAlert = () => {
      this.setState({
        showAlert: false,
      });
    };
    this.getRenderer = () => MessageSenderAlert;
    this.messages = [
      {
        id: '1',
        level: 'warning',
        message: messageSenderMessages.senderNumberInvalid,
      },
    ];
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.showAlert !== this.state.showAlert) {
      this.setState({
        showAlert: nextProps.showAlert,
      });
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    return this.state.showAlert ? (
      <AlertDisplay
        brand={this.props.brand}
        currentLocale={this.props.currentLocale}
        messages={this.messages}
        dismiss={this.onDismissAlert}
        getRenderer={this.getRenderer}
      />
    ) : null;
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
NoSenderAlert.defaultProps = {
  brand: 'RingCentral',
};
export default NoSenderAlert;
