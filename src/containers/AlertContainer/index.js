import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Alert from 'ringcentral-integration/modules/Alert';
import Locale from 'ringcentral-integration/modules/Locale';

import AlertDisplay from '../../components/AlertDisplay';

const AlertContainer = connect((state, {
  locale,
  alert,
}) => ({
  currentLocale: locale.currentLocale,
  messages: alert.messages,
}), (dispatch, {
  getRenderer,
  alert,
}) => ({
  getRenderer,
  dismiss: (id) => {
    alert.dismiss(id);
  },
}))(AlertDisplay);

AlertContainer.propTypes = {
  alert: PropTypes.instanceOf(Alert).isRequired,
  getRenderer: PropTypes.func.isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
};

export default AlertContainer;
