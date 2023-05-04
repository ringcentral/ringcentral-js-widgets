import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { EnvironmentPanel } from '@ringcentral-integration/widgets/components/EnvironmentPanel';
import { withPhone } from '@ringcentral-integration/widgets/lib/phoneContext';

import styles from './styles.scss';

const AppView = ({ children, server, enabled, onSetData }) => {
  return (
    <div className={styles.root}>
      {children}
      <EnvironmentPanel
        server={server}
        enabled={enabled}
        onSetData={onSetData}
        recordingHost=""
      />
    </div>
  );
};

AppView.propTypes = {
  children: PropTypes.node,
  server: PropTypes.string,
  enabled: PropTypes.bool,
  onSetData: PropTypes.func,
};

AppView.defaultProps = {
  children: null,
  server: null,
  enabled: false,
  onSetData: undefined,
};

export default withPhone(
  connect(
    (state, { phone: { environment } }) => ({
      server: environment.server,
      enabled: environment.enabled,
    }),
    (dispatch, { phone: { environment } }) => ({
      onSetData(options) {
        environment.setData(options);
      },
    }),
  )(AppView),
);
