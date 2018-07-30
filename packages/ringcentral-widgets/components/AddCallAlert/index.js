import React from 'react';
import recordStatus from 'ringcentral-integration/modules/Webphone/recordStatus';
import PropTypes from 'prop-types';
import i18n from './i18n';

export default AddCallAlert({ currentLocale }) {
  render(<span>i18n.getString('recoding', currentLocale)</span>);
}
AddCallAlert.PropTypes = {

}
AddCallAlert.handleMessage(msg) {
  return (

  )
}
