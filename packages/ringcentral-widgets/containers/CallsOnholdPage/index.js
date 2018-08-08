import { connect } from 'react-redux';
import callDirections from 'ringcentral-integration/enums/callDirections';

import withPhone from '../../lib/withPhone';
import CallsOnholdPanel from '../../components/CallsOnholdPanel';

import {
  mapToProps as mapToBaseProps,
  mapToFunctions as mapToBaseFunctions,
} from '../ActiveCallsPage';

function mapToProps(_, {
  phone,
  phone: {
    callMonitor,
    contactMatcher,
  },
  ...props
}) {
  const baseProps = mapToBaseProps(_, {
    phone,
    ...props,
  });
  const contactMapping = contactMatcher && contactMatcher.dataMapping;

  return {
    ...baseProps,
    calls: callMonitor.activeOnHoldCalls.filter(call => call.direction !== callDirections.inbound),
    contactMapping,
  };
}

function mapToFunctions(_, {
  params,
  phone,
  phone: {
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
    onBackButtonClick,
    async onMerge(sessionId) {
      onBackButtonClick();
      await conferenceCall.mergeSession(sessionId);
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
)(CallsOnholdPanel));

export default CallsOnholdPage;
