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
import { CALL_CTRL_ALERT } from '../../components/CallControlAlert';
import i18n from './i18n';
import { pickEleByProps, pickFallBackName } from './utils';

function mapToProps(_, { phone }) {
  const {
    activeCallControl, regionSettings, activeCalls, contactMatcher,
    alert, routerInteraction,
  } = phone;
  return {
    activeCallControl,
    regionSettings,
    activeCalls,
    contactMatcher,
    alert,
    routerInteraction,
  };
}

function mapToFunctions(_, { phone }) {
  return {};
}

class ActiveCallControl extends Component {
  async holdCall(sessionId) {
    const { activeCallControl } = this.props;
    const { activeSession } = activeCallControl;
    const { isOnHold } = activeSession;
    if (isOnHold) {
      this.props.alert.warning({ message: CALL_CTRL_ALERT.muteFail });
    }
    await activeCallControl.hold(sessionId);
  }

  async muteCall(sessionId) {
    const { activeCallControl } = this.props;
    const { activeSession } = activeCallControl;
    const { isOnMute } = activeSession;
    if (isOnMute) {
      this.props.alert.warning({ message: CALL_CTRL_ALERT.holdFail });
    }
    await activeCallControl.mute(sessionId);
  }

  render() {
    const {
      currentLocale,
      activeCallControl,
      regionSettings,
      activeCalls,
      contactMatcher,
      routerInteraction
    } = this.props;

    const sessionId = activeCallControl.activeSessionId || '3977048006';
    const activeCall = pickEleByProps(
      { sessionId },
      activeCalls.calls
    )[0];

    const fallBackName = pickFallBackName(activeCall, contactMatcher.dataMapping);
    const { muteCtrl, transferCtrl, holdCtrl } = ACTIONS_CTRL_MAP;
    const callCtrlProps = {
      fallBackName,
      currentLocale,
      nameMatches: [],
      onMute: async () => this.muteCall(sessionId),
      onUnmute: async () => activeCallControl.unmute(sessionId),
      onHold: async () => this.holdCall(sessionId),
      onUnhold: async () => activeCallControl.unHold(sessionId),
      onHangup: async () => activeCallControl.hangUp(sessionId),
      onTransfer: async number => activeCallControl.transfer(number, sessionId),
      showBackButton: true,
      backButtonLabel: i18n.getString('allCalls', currentLocale),
      onBackButtonClick: async () => routerInteraction.push('/dialer'),
      formatPhone: () => null,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
      selectedMatcherIndex: 0,
      onSelectMatcherName: () => null,
      searchContactList: [],
      searchContact: () => null,
      layout: callCtrlLayouts.normalCtrl,
      startTime: activeCall.startTime,
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
  regionSettings: PropTypes.object,
  activeCalls: PropTypes.object,
  contactMatcher: PropTypes.object,
  alert: PropTypes.object,
  routerInteraction: PropTypes.object,
};

ActiveCallControl.defaultProps = {
  currentLocale: 'en-US',
  activeCallControl: {},
  regionSettings: {},
  activeCalls: {},
  contactMatcher: {},
  alert: {},
  routerInteraction: {},
};

export default withPhone(connect(mapToProps, mapToFunctions)(ActiveCallControl));
