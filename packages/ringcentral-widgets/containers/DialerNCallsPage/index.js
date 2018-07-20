import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import classnames from 'classnames';

import DialerPage from '../DialerPage';
import ActiveCallsPage from '../ActiveCallsPage';
import withPhone from '../../lib/withPhone';
import NavigationBar from '../../components/NavigationBar';
import MessageTabButton from '../../components/MessageTabButton';
import styles from './styles.scss';
import i18n from './i18n';
import routerMap from './routerMap';

function TabTitle({
  type,
  currentLocale,
  active,
}) {
  return (
    <span className={classnames(styles.tabTitle, active ? styles.active : null)}>
      {i18n.getString(type, currentLocale)}
    </span>
  );
}

TabTitle.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

TabTitle.defaultProps = {
  active: false,
};

function renderTabs(
  currentLocale,
  currentPath,
  goto,
) {
  const tabs = [
    {
      icon: <TabTitle
        type={routerMap.dialer}
        currentLocale={currentLocale}
        active={currentPath === routerMap.dialer} />,
      label: i18n.getString(routerMap.dialer, currentLocale),
      path: routerMap.dialer,
      isActive: () => currentPath === routerMap.dialer,
    },
    {
      icon: <TabTitle
        type={routerMap.allCalls}
        currentLocale={currentLocale}
        active={currentPath === routerMap.allCalls} />,
      label: i18n.getString(routerMap.allCalls, currentLocale),
      path: routerMap.allCalls,
      isActive: () => currentPath === routerMap.allCalls,
    },
  ];
  return (
    <NavigationBar
      button={MessageTabButton}
      className={styles.tabBar}
      currentPath={currentPath}
      goTo={goto}
      tabs={tabs}
      fullSizeInk={false}
    />
  );
}

function DialerNCallsPanel({
  currentLocale,
  currentPath,
  onLogCall,
  onCreateContact,
  onCallsEmpty,
  sourceIcons,
  goto,
  showTab,
  phoneTypeRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
  dialButtonMuted,
  showViewContact,
  showContactDisplayPlaceholder,
}) {
  const contentMap = {
    '/dialer': <DialerPage
      phoneTypeRenderer={phoneTypeRenderer}
      recipientsContactInfoRenderer={recipientsContactInfoRenderer}
      recipientsContactPhoneRenderer={recipientsContactPhoneRenderer}
      dialButtonMuted={dialButtonMuted}
    />,
    '/calls': <ActiveCallsPage
      onLogCall={onLogCall}
      onCreateContact={onCreateContact}
      onCallsEmpty={onCallsEmpty}
      sourceIcons={sourceIcons}
      showViewContact={showViewContact}
      showContactDisplayPlaceholder={showContactDisplayPlaceholder}
    />
  };
  const tabsHeader = renderTabs(currentLocale, currentPath, goto);
  if (showTab) {
    return (
      <div className={styles.root}>
        {tabsHeader}
        <div className={styles.content}>
          {contentMap[currentPath]}
        </div>
      </div>
    );
  }
  return contentMap[currentPath];
}


DialerNCallsPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  onLogCall: PropTypes.func,
  onCreateContact: PropTypes.func,
  onCallsEmpty: PropTypes.func,
  sourceIcons: PropTypes.object,
  goto: PropTypes.func.isRequired,
  phoneTypeRenderer: PropTypes.func,
  recipientsContactInfoRenderer: PropTypes.func,
  recipientsContactPhoneRenderer: PropTypes.func,
  dialButtonMuted: PropTypes.bool,
  showViewContact: PropTypes.bool,
  showContactDisplayPlaceholder: PropTypes.bool,
};


DialerNCallsPanel.defaultProps = {
  sourceIcons: null,
  onLogCall: null,
  onCreateContact: null,
  onCallsEmpty: null,
  phoneTypeRenderer: null,
  recipientsContactInfoRenderer: null,
  recipientsContactPhoneRenderer: null,
  dialButtonMuted: false,
  showViewContact: true,
  showContactDisplayPlaceholder: false,
};


function mapToProps(_, {
  phone: {
    locale,
    routerInteraction,
    webphone,
    callingSettings: { callingMode },
  },
  sourceIcons,
  phoneTypeRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
}) {
  return {
    currentPath: routerInteraction.currentPath,
    currentLocale: locale.currentLocale,
    sourceIcons,
    showTab: webphone.sessions.length && callingMode === callingModes.webphone,
    phoneTypeRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
  };
}

function mapToFunctions(_, {
  phone: {
    routerInteraction,
  },
  onLogCall,
  onCreateContact,
  onCallsEmpty,
  sourceIcons,
}) {
  return {
    goto: path => routerInteraction.push(path),
    onLogCall,
    onCreateContact,
    onCallsEmpty,
    sourceIcons,
  };
}

const DialerNCallsPage = withPhone(connect(mapToProps, mapToFunctions)(DialerNCallsPanel));

export default DialerNCallsPage;
