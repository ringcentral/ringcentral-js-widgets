import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import callDirections from 'ringcentral-integration/enums/callDirections';
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
          call.webphoneSession &&
          call.direction !== callDirections.inbound
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
  },
  getAvatarUrl,
  ...props
}) {
  const baseProps = mapToBaseFunctions(_, {
    params,
    phone,
    ...props,
  });
  const onBackButtonClick = () => {
    routerInteraction.goBack();
  };
  return {
    ...baseProps,
    async onMerge(sessionId) {
      await conferenceCall.mergeSession({
        sessionId,
        onReadyToMerge() {
          routerInteraction.goBack();
        },
      });
    },
    onBackButtonClick() {
      if (webphone.sessions.length) {
        routerInteraction.goBack();
        return;
      }
      phone.routerInteraction.go(-2);
    },
    onAdd() {
      routerInteraction.push(`/conferenceCall/dialer/${params.fromNumber}`);
    },
    getAvatarUrl,
    isConferenceSession: (...args) => conferenceCall.isConferenceSession(...args),
  };
}

const CallsOnholdPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(CallsOnholdContainer));

export default CallsOnholdPage;
