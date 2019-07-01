import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Environment from 'ringcentral-widgets/components/Environment';
import { withPhone } from 'ringcentral-widgets/lib/phoneContext';

import styles from './styles.scss';

function AppView(props) {
  return (
    <div className={styles.root}>
      {props.children}
      <Environment
        server={props.server}
        enabled={props.enabled}
        onSetData={props.onSetData}
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
  enabled: false,
  onSetData: undefined,
};

export default withPhone(connect((state, {
  phone: {
    environment,
  },
}) => ({
  server: environment.server,
  enabled: environment.enabled,
}), (dispatch, {
  phone: {
    environment,
  },
}) => ({
  onSetData(options) {
    environment.setData(options);
  },
}))(AppView));
