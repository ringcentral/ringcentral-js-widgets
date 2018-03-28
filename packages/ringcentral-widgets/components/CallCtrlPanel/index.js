import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActiveCallDialPad from '../ActiveCallDialPad';
import ActiveCallPanel from '../ActiveCallPanel';
import FlipPanel from '../FlipPanel';
import TransferPanel from '../TransferPanel';

class CallCtrlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowKeyPad: false,
      isShowFlipPanel: false,
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

    this.showFlipPanel = () => {
      this.setState({
        isShowFlipPanel: true
      });
    };

    this.hideFlipPanel = () => {
      this.setState({
        isShowFlipPanel: false
      });
    };

    this.toggleTransferPanel = () => {
      this.setState(prevState => ({
        isShowTransferPanel: !prevState.isShowTransferPanel
      }));
    };
  }

  render() {
    if (this.state.isShowKeyPad) {
      return (
        <ActiveCallDialPad
          onChange={this.props.onKeyPadChange}
          hiddenDialPad={this.hiddenKeyPad}
          onHangup={this.props.onHangup}
          currentLocale={this.props.currentLocale}
        />
      );
    }
    if (this.state.isShowFlipPanel) {
      return (
        <FlipPanel
          isOnFlip={this.props.isOnFlip}
          flipNumbers={this.props.flipNumbers}
          currentLocale={this.props.currentLocale}
          formatPhone={this.props.formatPhone}
          hideFlipPanel={this.hideFlipPanel}
          onFlip={this.props.onFlip}
          complete={this.props.onHangup}
        />
      );
    }
    if (this.state.isShowTransferPanel) {
      return (
        <TransferPanel
          onTransfer={this.props.onTransfer}
          currentLocale={this.props.currentLocale}
          toggleTransferPanel={this.toggleTransferPanel}
          isOnTransfer={this.props.isOnTransfer}
          searchContactList={this.props.searchContactList}
          searchContact={this.props.searchContact}
          formatPhone={this.props.formatPhone}
          phoneTypeRenderer={this.props.phoneTypeRenderer}
          recipientsContactInfoRenderer={this.props.recipientsContactInfoRenderer}
          recipientsContactPhoneRenderer={this.props.recipientsContactPhoneRenderer}
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
        recordStatus={this.props.recordStatus}
        onBackButtonClick={this.props.onBackButtonClick}
        onMute={this.props.onMute}
        onUnmute={this.props.onUnmute}
        onHold={this.props.onHold}
        onUnhold={this.props.onUnhold}
        onRecord={this.props.onRecord}
        onStopRecord={this.props.onStopRecord}
        onShowKeyPad={this.showKeyPad}
        onHangup={this.props.onHangup}
        onPark={this.props.onPark}
        onAdd={this.props.onAdd}
        nameMatches={this.props.nameMatches}
        fallBackName={this.props.fallBackName}
        areaCode={this.props.areaCode}
        countryCode={this.props.countryCode}
        selectedMatcherIndex={this.props.selectedMatcherIndex}
        onSelectMatcherName={this.props.onSelectMatcherName}
        avatarUrl={this.props.avatarUrl}
        brand={this.props.brand}
        showContactDisplayPlaceholder={this.props.showContactDisplayPlaceholder}
        onShowFlipPanel={this.showFlipPanel}
        onToggleTransferPanel={this.toggleTransferPanel}
        flipNumbers={this.props.flipNumbers}
        calls={this.props.calls}
        sourceIcons={this.props.sourceIcons}
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
  isOnFlip: PropTypes.bool,
  isOnTransfer: PropTypes.bool,
  flipNumbers: PropTypes.array,
  calls: PropTypes.array.isRequired,
  recordStatus: PropTypes.string.isRequired,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStopRecord: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onPark: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired,
  onFlip: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
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
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  searchContactList: PropTypes.array.isRequired,
  searchContact: PropTypes.func.isRequired,
  phoneTypeRenderer: PropTypes.func,
  recipientsContactInfoRenderer: PropTypes.func,
  recipientsContactPhoneRenderer: PropTypes.func,
};

CallCtrlPanel.defaultProps = {
  startTime: null,
  isOnMute: false,
  isOnHold: false,
  isOnTransfer: false,
  isOnFlip: false,
  flipNumbers: [],
  phoneNumber: null,
  children: undefined,
  avatarUrl: null,
  backButtonLabel: 'Active Calls',
  sessionId: undefined,
  callStatus: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
};

export default CallCtrlPanel;
