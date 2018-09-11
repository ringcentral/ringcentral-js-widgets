/**
 * @file simplify active call control page
 * detail: https://jira.ringcentral.com/browse/RCINT-8256
 */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withPhone from '../../lib/withPhone';

import CallCtrlPanel from '../../components/CallCtrlPanel';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import { ACTIONS_CTRL_MAP } from '../../components/ActiveCallPad';
import i18n from './i18n';

function mapToProps(_, { phone }) {
  const { activeCallControl } = phone;
  return {
    activeCallControl
  };
}

function mapToFunctions(_, { phone }) {
  return {};
}

class ActiveCallControl extends Component {
  click() { }
  render() {
    const { currentLocale, activeCallControl } = this.props;
    const sessionId = activeCallControl.activeSessionId;

    const { muteCtrl, transferCtrl, holdCtrl } = ACTIONS_CTRL_MAP;
    const callCtrlProps = {
      nameMatches: [],
      fallBackName: 'fallBackName',
      currentLocale,
      onMute: async () => activeCallControl.mute(sessionId),
      onUnmute: async () => activeCallControl.unmute(sessionId),
      onHold: async () => activeCallControl.hold(sessionId),
      onUnhold: async () => activeCallControl.unHold(sessionId),
      onHangup: async () => activeCallControl.hangUp(sessionId),
      onTransfer: async number => activeCallControl.transfer(number, sessionId),
      showBackButton: true,
      backButtonLabel: i18n.getString('allCalls', currentLocale),
      onBackButtonClick: () => null,
      formatPhone: () => null,
      areaCode: '650',
      countryCode: 'US',
      selectedMatcherIndex: 0,
      onSelectMatcherName: () => null,
      searchContactList: [],
      searchContact: () => null,
      layout: callCtrlLayouts.normalCtrl,
      actions: [muteCtrl, transferCtrl, holdCtrl]
    };

    const uselessProps = {
      recordStatus: '',
      onRecord: () => null,
      onStopRecord: () => null,
      onAdd: () => null,
      onMerge: () => null,
      onFlip: () => null,
      onPark: () => null,
      onKeyPadChange: () => null,
    };

    const props = {
      ...callCtrlProps,
      ...uselessProps
    };

    return <CallCtrlPanel {...props} />;
  }
}

ActiveCallControl.propTypes = {
  currentLocale: PropTypes.string,
  activeCallControl: PropTypes.object,
};

ActiveCallControl.defaultProps = {
  currentLocale: 'en-US',
  activeCallControl: {},
};

export default withPhone(connect(mapToProps, mapToFunctions)(ActiveCallControl));
