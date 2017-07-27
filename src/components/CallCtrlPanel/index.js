import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActiveCallDialPad from '../ActiveCallDialPad';
import ActiveCallPanel from '../ActiveCallPanel';

class CallCtrlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowKeyPad: false,
    };

    this.hiddenKeyPad = () => {
      this.setState({
        isShowKeyPad: false,
      });
    };

    this.showKeyPad = () => {
      this.setState({
        isShowKeyPad: true,
      });
    };
  }

  render() {
    if (this.state.isShowKeyPad) {
      return (
        <ActiveCallDialPad
          onChange={this.props.onKeyPadChange}
          hiddenDialPad={this.hiddenKeyPad}
          hangup={this.props.hangup}
          currentLocale={this.props.currentLocale}
        />
      );
    }
    return (
      <ActiveCallPanel
        backButtonLabel={this.props.backButtonLabel}
        currentLocale={this.props.currentLocale}
        formatPhone={this.props.formatPhone}
        phoneNumber={this.props.phoneNumber}
        sessionId={this.props.sessionId}
        callStatus={this.props.callStatus}
        startTime={this.props.startTime}
        isOnMute={this.props.isOnMute}
        isOnHold={this.props.isOnHold}
        isOnRecord={this.props.isOnRecord}
        onBackButtonClick={this.props.onBackButtonClick}
        onMute={this.props.onMute}
        onUnmute={this.props.onUnmute}
        onHold={this.props.onHold}
        onUnhold={this.props.onUnhold}
        onRecord={this.props.onRecord}
        onStopRecord={this.props.onStopRecord}
        onShowKeyPad={this.showKeyPad}
        hangup={this.props.hangup}
        onAdd={this.props.onAdd}
        nameMatches={this.props.nameMatches}
        fallBackName={this.props.fallBackName}
        areaCode={this.props.areaCode}
        countryCode={this.props.countryCode}
        selectedMatcherIndex={this.props.selectedMatcherIndex}
        onSelectMatcherName={this.props.onSelectMatcherName}
        avatarUrl={this.props.avatarUrl}
        brand={this.props.brand}
        showContactDisplayPlaceHolder={this.props.showContactDisplayPlaceHolder}
      >
        {this.props.children}
      </ActiveCallPanel>
    );
  }
}

CallCtrlPanel.propTypes = {
  callStatus: PropTypes.string,
  sessionId: PropTypes.string,
  phoneNumber: PropTypes.string,
  nameMatches: PropTypes.array.isRequired,
  fallBackName: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  startTime: PropTypes.number,
  isOnMute: PropTypes.bool,
  isOnHold: PropTypes.bool,
  isOnRecord: PropTypes.bool,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStopRecord: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  hangup: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  onKeyPadChange: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  children: PropTypes.node,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  selectedMatcherIndex: PropTypes.number.isRequired,
  onSelectMatcherName: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string,
  backButtonLabel: PropTypes.string,
  brand: PropTypes.string,
  showContactDisplayPlaceHolder: PropTypes.bool,
};

CallCtrlPanel.defaultProps = {
  startTime: null,
  isOnMute: false,
  isOnHold: false,
  isOnRecord: false,
  phoneNumber: null,
  children: undefined,
  avatarUrl: null,
  backButtonLabel: 'Active Calls',
  sessionId: undefined,
  callStatus: null,
  brand: 'RingCentral',
  showContactDisplayPlaceHolder: true,
};

export default CallCtrlPanel;
