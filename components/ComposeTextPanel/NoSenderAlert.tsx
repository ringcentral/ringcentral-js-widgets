import React, { Component } from 'react';

import messageSenderMessages from '@ringcentral-integration/commons/modules/MessageSender/messageSenderMessages';

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
  constructor(props) {
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.showAlert !== this.state.showAlert) {
      this.setState({
        showAlert: nextProps.showAlert,
      });
    }
  }
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
NoSenderAlert.defaultProps = {
  brand: 'RingCentral',
};
export default NoSenderAlert;
