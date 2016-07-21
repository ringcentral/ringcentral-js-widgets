import AuthPanel from '../presentation/AuthPanel/AuthPanel.react';
import { connect } from 'react-redux';
import { connect as phoneConnect } from '../../../../utils/integration/';

const withPhone = phoneConnect(phone => ({
  login: (...args) => phone.user.login(...args),
}))(AuthPanel);

export default withPhone;
