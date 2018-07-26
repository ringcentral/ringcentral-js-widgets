import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import sleep from 'ringcentral-integration/lib/sleep';
import withPhone from '../../lib/withPhone';
import callCtrlLayouts from '../../enums/callCtrlLayouts';

import {
  CallCtrlPage,
  mapToProps as mapToBaseProps,
  mapToFunctions as mapToBaseFunctions,
} from '../CallCtrlPage';

function mapToProps(_, {
  phone,
  phone: {
    webphone,
    conferenceCall,
    callMonitor,
  },
  ...props
}) {
  const baseProps = mapToBaseProps(_, {
    phone,
    ...props,
  });

  const currentSession = webphone.activeSession || {};
  const isOnConference = conferenceCall.isConferenceSession(currentSession.id);
  const layout = isOnConference ? callCtrlLayouts.conferenceCtrl : callCtrlLayouts.mergeCtrl;
  const lastCallInfo = callMonitor.lastCallInfo;
  let mergeDisabled = !!baseProps.mergeDisabled;
  if (
    layout === callCtrlLayouts.mergeCtrl
    && (!lastCallInfo || lastCallInfo.status === sessionStatus.finished)
  ) {
    mergeDisabled = true;
  }
  return {
    ...baseProps,
    layout,
    mergeDisabled,
    lastCallInfo,
  };
}

function mapToFunctions(_, {
  phone,
  ...props
}) {
  const baseProps = mapToBaseFunctions(_, {
    phone,
    ...props,
  });
  return {
    ...baseProps,
  };
}

class ConferenceCallMergeContainer extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.onLastCallEnded = this::this.onLastCallEnded;
  }

  static isLastCallEnded({ lastCallInfo }) {
    return !!(
      lastCallInfo && lastCallInfo.status === sessionStatus.finished
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      ConferenceCallMergeContainer.isLastCallEnded(this.props) === false
      && ConferenceCallMergeContainer.isLastCallEnded(nextProps) === true
      && this.mounted
    ) {
      this.onLastCallEnded();
    }
  }

  async onLastCallEnded() {
    await sleep(2000);
    if (this.mounted) {
      this.props.onLastCallEnded();
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <CallCtrlPage {...this.props} />
    );
  }
}

ConferenceCallMergeContainer.propTypes = {
  onLastCallEnded: PropTypes.func.isRequired,
};

const ConferenceCallMergeCtrlPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(ConferenceCallMergeContainer));

export {
  mapToProps,
  mapToFunctions,
  ConferenceCallMergeCtrlPage as default,
};
