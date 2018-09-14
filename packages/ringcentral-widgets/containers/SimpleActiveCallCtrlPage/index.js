/**
 * @file simplify active call control page
 * detail: https://jira.ringcentral.com/browse/RCINT-8256
 */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatNumber from 'ringcentral-integration/lib/formatNumber';

import withPhone from '../../lib/withPhone';

import CallCtrlPanel from '../../components/CallCtrlPanel';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import { ACTIONS_CTRL_MAP } from '../../components/ActiveCallPad';
import i18n from './i18n';
import { pickEleByProps, pickFallBackInfo } from './utils';

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
/* eslint-disable react/prefer-stateless-function */
class ActiveCallControl extends Component {
  render() {
    const {
      currentLocale,
      activeCallControl,
      regionSettings,
      activeCalls,
      contactMatcher,
      routerInteraction
    } = this.props;

    const sessionId = activeCallControl.activeSessionId;
    const activeCall = pickEleByProps(
      { sessionId: String(sessionId) },
      activeCalls.calls
    )[0] || {};

    const { fallBackName, fallBackNumber } = pickFallBackInfo(
      activeCall,
      contactMatcher.dataMapping,
      currentLocale
    );
    const { muteCtrl, transferCtrl, holdCtrl } = ACTIONS_CTRL_MAP;
    const callCtrlProps = {
      fallBackName,
      currentLocale,
      phoneNumber: fallBackNumber,
      nameMatches: [],
      onMute: async () => activeCallControl.mute(sessionId),
      onUnmute: async () => activeCallControl.unmute(sessionId),
      onHold: async () => activeCallControl.hold(sessionId),
      onUnhold: async () => activeCallControl.unHold(sessionId),
      onHangup: async () => activeCallControl.hangUp(sessionId),
      onTransfer: async number => activeCallControl.transfer(number, sessionId),
      showBackButton: true,
      backButtonLabel: i18n.getString('allCalls', currentLocale),
      onBackButtonClick: async () => routerInteraction.goBack(),
      formatPhone: phoneNumber => formatNumber({
        phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
      }),
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
      selectedMatcherIndex: 0,
      onSelectMatcherName: () => null,
      searchContactList: this.props.searchContactList,
      searchContact: value => this.props.searchContact(value),
      layout: callCtrlLayouts.normalCtrl,
      startTime: activeCall.startTime,
      actions: [muteCtrl, transferCtrl, holdCtrl],
      isOnMute: false,
      isOnHold: false,
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
  searchContact: PropTypes.func,
  searchContactList: PropTypes.array,
};

ActiveCallControl.defaultProps = {
  currentLocale: 'en-US',
  activeCallControl: {},
  regionSettings: {},
  activeCalls: {},
  contactMatcher: {},
  alert: {},
  routerInteraction: {},
  searchContact() {},
  searchContactList: []
};

export default withPhone(connect(mapToProps, mapToFunctions)(ActiveCallControl));
