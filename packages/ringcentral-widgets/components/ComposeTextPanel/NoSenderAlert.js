import React, { Component } from 'react';
import PropTypes from 'prop-types';
import messageSenderMessages from
  'ringcentral-integration/modules/MessageSender/messageSenderMessages';
import AlertDisplay from '../AlertDisplay';
import MessageSenderAlert from '../MessageSenderAlert';

export default class NoSenderAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: !props.hasSenderNumbers && this.props.outboundSMS,
    };
    this.onDismissAlert = () => {
      this.setState({
        showAlert: false
      });
    };
    this.getRenderer = () => MessageSenderAlert;
    this.messages = [
      {
        id: '1',
        level: 'warning',
        message: messageSenderMessages.senderNumberInvalid,
      }
    ];
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

NoSenderAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  outboundSMS: PropTypes.bool.isRequired,
  hasSenderNumbers: PropTypes.bool.isRequired,
  brand: PropTypes.string,
};

NoSenderAlert.defaultProps = {
  brand: 'RingCentral'
};
