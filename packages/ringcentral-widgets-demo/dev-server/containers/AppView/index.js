import { EnvironmentPanel } from '@ringcentral-integration/widgets/components/EnvironmentPanel';
import { withPhone } from '@ringcentral-integration/widgets/lib/phoneContext';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.scss';

const AppView = ({
  children,
  server,
  enabled,
  onSetData,
  allowDataTracking,
  useDataTrackingSetting,
}) => {
  return (
    <div className={styles.root}>
      {children}
      <EnvironmentPanel
        server={server}
        enabled={enabled}
        onSetData={onSetData}
        allowDataTracking={allowDataTracking}
        useDataTrackingSetting={useDataTrackingSetting}
        recordingHost=""
      />
    </div>
  );
};

AppView.propTypes = {
  children: PropTypes.node,
  server: PropTypes.string,
  enabled: PropTypes.bool,
  allowDataTracking: PropTypes.bool,
  useDataTrackingSetting: PropTypes.bool,
  onSetData: PropTypes.func,
};

AppView.defaultProps = {
  children: null,
  server: null,
  enabled: false,
  allowDataTracking: false,
  useDataTrackingSetting: false,
  onSetData: undefined,
};

export default withPhone(
  connect(
    (state, { phone: { environment } }) => ({
      server: environment.server,
      enabled: environment.enabled,
      allowDataTracking: environment.allowDataTracking,
      useDataTrackingSetting: environment.useDataTrackingSetting,
    }),
    (dispatch, { phone: { environment } }) => ({
      onSetData(options) {
        environment.setData(options);
      },
    }),
  )(AppView),
);
