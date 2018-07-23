import { connect } from 'react-redux';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import TabContentPanel from '../../components/TabContentPanel';
import withPhone from '../../lib/withPhone';
import routerMap from './routerMap';
import i18n from './i18n';

function getTabs({
  currentLocale,
  currentPath,
}) {
  return [
    {
      path: routerMap.dialer,
      label: i18n.getString(routerMap.dialer, currentLocale),
      isActive() { return currentPath === routerMap.dialer; },
    },
    {
      path: routerMap.allCalls,
      label: i18n.getString(routerMap.allCalls, currentLocale),
      isActive() { return currentPath === routerMap.allCalls; }
    }
  ];
}

function mapToProps(_, {
  phone: {
    locale,
    callingSettings,
    routerInteraction,
    conferenceCall,
    webphone,
  },
  children,
}) {
  const conferenceCallEquipped = !!conferenceCall;
  const isWebphoneMode = (callingSettings.callingMode === callingModes.webphone);
  const applicable = !!(conferenceCallEquipped && isWebphoneMode && webphone.sessions.length);
  const tabs = getTabs({
    currentLocale: locale.currentLocale,
    currentPath: routerInteraction.currentPath,
  });
  return {
    applicable,
    tabs,
    children,
  };
}

function mapToFunctions(_, {
  phone: {
    routerInteraction,
  },
}) {
  return {
    goTo(path) {
      routerInteraction.push(path);
    },
  };
}

const DialerAndCallsTabContainer = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(TabContentPanel));

export {
  getTabs,
  mapToProps,
  DialerAndCallsTabContainer as default,
};
