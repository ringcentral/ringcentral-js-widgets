import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { EnvironmentPanel } from '@ringcentral-integration/widgets/components/EnvironmentPanel';
import { withPhone } from '@ringcentral-integration/widgets/lib/phoneContext';

import styles from './styles.scss';

function AppView(props) {
  return (
    <div className={styles.root}>
      {props.children}

      <EnvironmentPanel
        server={props.server}
        enabled={props.enabled}
        onSetData={props.onSetData}
        redirectUri={props.redirectUri}
        recordingHost=""
      />
    </div>
  );
}

AppView.propTypes = {
  children: PropTypes.node,
  server: PropTypes.string,
  enabled: PropTypes.bool,
  onSetData: PropTypes.func,
};

AppView.defaultProps = {
  children: null,
  server: null,
  appSecret: null,
  appKey: null,
  enabled: false,
  onSetData: undefined,
};

export default withPhone(
  connect(
    (_, { phone: { oAuth, environment } }) => ({
      server: environment.server,
      enabled: environment.enabled,
      redirectUri: oAuth.redirectUri,
    }),
    (_, { phone: { environment } }) => ({
      onSetData(options) {
        environment.setData(options);
      },
    }),
  )(AppView),
);
