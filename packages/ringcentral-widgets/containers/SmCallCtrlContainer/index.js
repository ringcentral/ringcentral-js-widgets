/**
 * @file small call contrl
 * detail: https://jira.ringcentral.com/browse/RCINT-8248
 */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import telephonyStatus from 'ringcentral-integration/enums/telephonyStatus';
// import callDirections from 'ringcentral-integration/enums/callDirections';

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
  return {};
}

/* eslint-disable react/prefer-stateless-function */
class SmCallCtrlContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     status: props.status
  //   };
  // }

  render() {
    const {
      currentLocale,
      activeCallControl,
      activeSessions,
      sessionId,
    } = this.props;
    // const { activeSessions } = activeCallControl;
    const curentSession = activeSessions[sessionId];
    if (!curentSession) {
      return null;
    }
    const props = {
      onMute: async () => activeCallControl.mute(sessionId),
      onUnmute: async () => activeCallControl.unmute(sessionId),
      onHangup: async () => activeCallControl.hangUp(sessionId),
      isOnMute: curentSession.isOnMute,
      callStatus: curentSession.callStatus,
      currentLocale
    };
    return <SmCallContrl {...props} />;
  }
}
SmCallCtrlContainer.propTypes = {
  currentLocale: PropTypes.string,
  activeCallControl: PropTypes.object,
  activeSessions: PropTypes.object,
  sessionId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

SmCallCtrlContainer.defaultProps = {
  currentLocale: 'en-US',
  activeCallControl: {},
  activeSessions: {},
};
export default withPhone(connect(mapToProps, mapToFunctions)(SmCallCtrlContainer));
