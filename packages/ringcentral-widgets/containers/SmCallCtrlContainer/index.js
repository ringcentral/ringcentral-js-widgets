/**
 * @file small call contrl
 * detail: https://jira.ringcentral.com/browse/RCINT-8248
 */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SmCallContrl from '../../components/SmCallControl';
import withPhone from '../../lib/withPhone';

function mapToProps(_, { phone, sessionId }) {
  const { activeCallControl } = phone;
  const telephonySessionId =
    activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
  const currentSession = activeCallControl.getActiveSession(telephonySessionId);
  return {
    activeCallControl,
    currentSession,
    telephonySessionId,
  };
}

function mapToFunctions(_, { phone }) {
  const { activeCallControl } = phone;
  return {
    mute: activeCallControl.mute.bind(activeCallControl),
    unmute: activeCallControl.unmute.bind(activeCallControl),
    hangUp: activeCallControl.hangUp.bind(activeCallControl),
    reject: activeCallControl.reject.bind(activeCallControl),
  };
}

/* eslint-disable react/prefer-stateless-function */
class SmCallCtrlContainer extends Component {
  render() {
    const { currentLocale, telephonySessionId, currentSession } = this.props;
    if (!currentSession) {
      return null;
    }
    const props = {
      onMute: async () => this.props.mute(telephonySessionId),
      onUnmute: async () => this.props.unmute(telephonySessionId),
      onHangup: async () => this.props.hangUp(telephonySessionId),
      onReject: async () => this.props.reject(telephonySessionId),
      isOnMute: currentSession.isOnMute,
      callStatus: currentSession.callStatus,
      callDirection: currentSession.direction,
      currentLocale,
    };
    return <SmCallContrl {...props} />;
  }
}
SmCallCtrlContainer.propTypes = {
  currentLocale: PropTypes.string,
  activeCallControl: PropTypes.object,
  activeSessions: PropTypes.object,
  telephonySessionId: PropTypes.string,
  status: PropTypes.string,
  mute: PropTypes.func.isRequired,
  unmute: PropTypes.func.isRequired,
  hangUp: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  currentSession: PropTypes.any,
};

SmCallCtrlContainer.defaultProps = {
  currentLocale: 'en-US',
  activeCallControl: {},
  activeSessions: {},
  telephonySessionId: '',
  status: '',
  currentSession: undefined,
};
export default withPhone(
  connect(mapToProps, mapToFunctions)(SmCallCtrlContainer),
);
