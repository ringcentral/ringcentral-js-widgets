import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Environment from 'ringcentral-widgets/components/Environment';
import { withPhone } from 'ringcentral-widgets/lib/phoneContext';
import { ModalContainer } from 'ringcentral-widgets/containers/ModalContainer';

import styles from './styles.scss';

const AppView = ({ children, server, enabled, onSetData }) => {
  return (
    <div className={styles.root}>
      {children}
      <Environment
        server={server}
        enabled={enabled}
        onSetData={onSetData}
        recordingHost=""
      />
      <ModalContainer />
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
