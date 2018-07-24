import { connect } from 'react-redux';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
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
    callMonitor
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
    mergeDisabled
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

const ConferenceCallMergeCtrlPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(CallCtrlPage));

export {
  mapToProps,
  mapToFunctions,
  ConferenceCallMergeCtrlPage as default,
};
