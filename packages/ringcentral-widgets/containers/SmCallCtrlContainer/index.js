/**
 * @file small call contrl
 * detail: https://jira.ringcentral.com/browse/RCINT-8248
 */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


import SmCallContrl from '../../components/SmCallControl';
import withPhone from '../../lib/withPhone';

function mapToProps(_, { phone }) {
  const {
    activeCallControl,
  } = phone;
  const { activeSessions } = activeCallControl;
  return {
    activeCallControl,
    activeSessions
  };
}

function mapToFunctions(_, { phone }) {
  const { activeCallControl } = phone;
  return {
    mute: activeCallControl.mute.bind(activeCallControl),
    unmute: activeCallControl.unmute.bind(activeCallControl),
    hangUp: activeCallControl.hangUp.bind(activeCallControl),
    reject: activeCallControl.reject.bind(activeCallControl),
    getActiveSession: activeCallControl.getActiveSession.bind(activeCallControl)
  };
}

/* eslint-disable react/prefer-stateless-function */
class SmCallCtrlContainer extends Component {
  render() {
    const {
      currentLocale,
      sessionId,
    } = this.props;
    const currentSession = this.props.getActiveSession(sessionId);
    if (!currentSession) {
      return null;
    }
    const props = {
      onMute: async () => this.props.mute(sessionId),
      onUnmute: async () => this.props.unmute(sessionId),
      onHangup: async () => this.props.hangUp(sessionId),
      onReject: async () => this.props.reject(sessionId),
      isOnMute: currentSession.isOnMute,
      callStatus: currentSession.callStatus,
      callDirection: currentSession.direction,
      currentLocale
    };
    return <SmCallContrl {...props} />;
  }
}
SmCallCtrlContainer.propTypes = {
  currentLocale: PropTypes.string,
  activeCallControl: PropTypes.object,
  activeSessions: PropTypes.object,
  sessionId: PropTypes.string,
  status: PropTypes.string,
  mute: PropTypes.func.isRequired,
  unmute: PropTypes.func.isRequired,
  hangUp: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  getActiveSession: PropTypes.func,
};

SmCallCtrlContainer.defaultProps = {
  currentLocale: 'en-US',
  activeCallControl: {},
  activeSessions: {},
  sessionId: '',
  status: '',
  getActiveSession: () => null
};
export default withPhone(connect(mapToProps, mapToFunctions)(SmCallCtrlContainer));
