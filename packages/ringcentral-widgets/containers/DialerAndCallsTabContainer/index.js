import { connect } from 'react-redux';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import TabContentPanel from '../../components/TabContentPanel';
import withPhone from '../../lib/withPhone';
import i18n from './i18n';

function getTabs({
  currentLocale,
  currentPath,
}) {
  return [
    {
      path: '/dialer',
      label: i18n.getString('dialer', currentLocale),
      isActive() { return currentPath === '/dialer'; },
    },
    {
      path: '/calls',
      label: i18n.getString('allCalls', currentLocale),
      isActive() { return currentPath === '/calls'; }
    },
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
