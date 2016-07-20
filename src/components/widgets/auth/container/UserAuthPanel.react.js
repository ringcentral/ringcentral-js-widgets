import AuthPanel from '../presentation/AuthPanel/AuthPanel.react';
import { connect } from 'react-redux';
import { connect as phoneConnect } from '../../../../utils/integration/';

const withPhone = phoneConnect(phone => ({
  auth: phone.auth,
}))(AuthPanel);

export default withPhone;
