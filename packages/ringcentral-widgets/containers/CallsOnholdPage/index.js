import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { filter } from 'ramda';

import withPhone from '../../lib/withPhone';
import CallsOnholdPanel from '../../components/CallsOnholdPanel';

import {
  mapToProps as mapToBaseProps,
  mapToFunctions as mapToBaseFunctions,
} from '../ActiveCallsPage';


class CallsOnholdContainer extends Component {
  static propTypes = {
    calls: PropTypes.arrayOf(PropTypes.object).isRequired,
    fromSessionId: PropTypes.string.isRequired,
    isConferenceSession: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.getCalls = createSelector(
      () => this.props.calls,
      () => this.props.fromSessionId,
      (calls, fromSessionId) => filter(
        call => (
          call.webphoneSession
          && !this.props.isConferenceSession(call.webphoneSession)
          && call.webphoneSession.id !== fromSessionId
        ),
        calls
      ),
    );
  }

  render() {
    return <CallsOnholdPanel {...this.props} calls={this.getCalls()} />;
  }
}

function mapToProps(_, {
  phone,
  phone: {
    callMonitor,
  },
  params,
  ...props
}) {
  const { fromSessionId } = params;
  const baseProps = mapToBaseProps(_, {
    phone,
    ...props,
  });

  return {
    ...baseProps,
    calls: callMonitor.calls,
    fromSessionId,
  };
}

function mapToFunctions(_, {
  params,
  phone,
  phone: {
    webphone,
    conferenceCall,
    routerInteraction,
    callMonitor,
  },
  getAvatarUrl,
  ...props
}) {
  const { fromSessionId } = params;

  const baseProps = mapToBaseFunctions(_, {
    params,
    phone,
    ...props,
  });
  return {
    ...baseProps,
    async onMerge(sessionId) {
      // to track user click merge
      callMonitor.callsOnHoldClickMergeTrack();

      const sessions = await conferenceCall.parseMergingSessions({
        sessionId,
        sessionIdToMergeWith: fromSessionId,
      });
      if (sessions) {
        const confId = conferenceCall.conferences && Object.keys(conferenceCall.conferences)[0];
        if (confId) {
          const confSessionId = conferenceCall.conferences[confId].sessionId;
          routerInteraction.push(`/calls/active/${confSessionId}`);
        } else {
          routerInteraction.goBack();
        }
        await conferenceCall.mergeSessions(sessions);
      }
    },
    onBackButtonClick() {
      if (webphone.sessions.length) {
        routerInteraction.goBack();
        return;
      }
      phone.routerInteraction.go(-2);
    },
    onAdd() {
      // to track use click add button
      callMonitor.callsOnHoldClickAddTrack();
      routerInteraction.push(`/conferenceCall/dialer/${params.fromNumber}/${params.fromSessionId}`);
    },
    getAvatarUrl,
    isConferenceSession: (...args) => conferenceCall.isConferenceSession(...args),
    async webphoneHangup(...args) {
      // track user click hangup on calls onhold page
      callMonitor.callsOnHoldClickHangupTrack();
      return (webphone && webphone.hangup(...args));
    },
  };
}

const CallsOnholdPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(CallsOnholdContainer));

export default CallsOnholdPage;
