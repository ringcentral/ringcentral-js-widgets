import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import TabContentPanel from '../../components/TabContentPanel';
import withPhone from '../../lib/withPhone';
import i18n from './i18n';

class TabContentView extends Component {
  static propTypes = {
    applicable: PropTypes.bool.isRequired,
    currentLocale: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired,
    goTo: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.getTabs = createSelector(
      () => this.props.currentLocale,
      () => this.props.currentPath,
      (currentLocale, currentPath) => ([
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
      ]),
    );
  }

  render() {
    return (
      <TabContentPanel
        {...this.props}
        tabs={this.getTabs()}
      />
    );
  }
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
  return {
    applicable,
    currentLocale: locale.currentLocale,
    currentPath: routerInteraction.currentPath,
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
)(TabContentView));

export {
  mapToProps,
  mapToFunctions,
  DialerAndCallsTabContainer as default,
};
