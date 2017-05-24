import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import dynamicsFont from '../../../src/assets/DynamicsFont/DynamicsFont.scss';
import TabNavigationView from '../../../src/components/TabNavigationView';
import RouterInteraction from '../../../src/modules/RouterInteraction';


function getTabs({
  showMessages,
  showComposeText,
  unreadCounts,
  showConference,
}) {
  return [
    {
      icon: <span className={dynamicsFont.dial} />,
      activityIcon: <span className={dynamicsFont.dialHover} />,
      label: 'Dial Pad',
      path: '/',
    },
    {
      icon: <span className={dynamicsFont.active} />,
      activityIcon: <span className={dynamicsFont.activeHover} />,
      label: 'Calls',
      path: '/calls',
    },
    {
      icon: <span className={dynamicsFont.history} />,
      activityIcon: <span className={dynamicsFont.historyHover} />,
      label: 'History',
      path: '/history',
    },
    showMessages && {
      icon: <span className={dynamicsFont.message} />,
      activityIcon: <span className={dynamicsFont.messageHover} />,
      label: 'Messages',
      path: '/messages',
      noticeCounts: unreadCounts,
      isActive: currentPath => (
        currentPath === '/messages' || currentPath.indexOf('/conversations/') !== -1
      ),
    },
    showComposeText && {
      icon: <span className={dynamicsFont.composeText} />,
      activityIcon: <span className={dynamicsFont.composeTextHover} />,
      label: 'Compose Text',
      path: '/composeText',
    },
    showConference && {
      icon: <span className={dynamicsFont.conference} />,
      activityIcon: <span className={dynamicsFont.conferenceHover} />,
      label: 'Conference',
      path: '/conference',
    },
    {
      icon: <span className={dynamicsFont.setting} />,
      activityIcon: <span className={dynamicsFont.settingHover} />,
      label: 'Settings',
      path: '/settings',
      isActive: currentPath => (
        currentPath.substr(0, 9) === '/settings'
      ),
    },
  ].filter(x => !!x);
}

const MainView = connect((_, {
  messageStore,
  rolesAndPermissions,
  router,
}) => {
  const unreadCounts = messageStore.unreadCounts || 0;
  const serviceFeatures = rolesAndPermissions.serviceFeatures;
  const showComposeText = (
    rolesAndPermissions.ready &&
    (
      (serviceFeatures.Pager && serviceFeatures.Pager.enabled) ||
      (serviceFeatures.SMS && serviceFeatures.SMS.enabled)
    )
  );
  const showMessages = (
    rolesAndPermissions.ready &&
    (
      (
        serviceFeatures.PagerReceiving &&
        serviceFeatures.PagerReceiving.enabled
      ) ||
      (
        serviceFeatures.SMSReceiving &&
        serviceFeatures.SMSReceiving.enabled
      )
    )
  );
  const showConference = (
    rolesAndPermissions.ready &&
    rolesAndPermissions.permissions.OrganizeConference
  );
  const tabs = getTabs({
    unreadCounts,
    showComposeText,
    showMessages,
    showConference,
  });
  return {
    tabs,
    unreadCounts,
    currentPath: router.currentPath,
  };
})(TabNavigationView);

MainView.propTypes = {
  router: PropTypes.instanceOf(RouterInteraction).isRequired,
  tabs: TabNavigationView.propTypes.tabs,
};

export default MainView;
