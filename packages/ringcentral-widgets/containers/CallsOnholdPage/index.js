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
    activeOnHoldCalls: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);

    this.getCalls = createSelector(
      () => this.props.activeOnHoldCalls,
      activeOnHoldCalls => filter(
        call => call.direction !== callDirections.inbound,
        activeOnHoldCalls
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
  ...props
}) {
  const baseProps = mapToBaseProps(_, {
    phone,
    ...props,
  });

  return {
    ...baseProps,
    activeOnHoldCalls: callMonitor.activeOnHoldCalls,
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
      await conferenceCall.onMergeOnhold({ sessionId, callback: this::onBackButtonClick });
    },
    onBackButtonClick() {
      if (webphone.sessions.length) {
        routerInteraction.goBack();
        return;
      }
      phone.routerInteraction._history.go(-2);
    },
    onAdd() {
      routerInteraction.push(`/conferenceCall/dialer/${params.fromNumber}`);
    },
    getAvatarUrl,
  };
}

const CallsOnholdPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(CallsOnholdContainer));

export default CallsOnholdPage;
