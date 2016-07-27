import AuthPanel from '../presentation/AuthPanel/AuthPanel.react';
import { connect } from '../../../../utils/integration/';

const withPhone = connect((state, props, phone) => ({
  login: (...args) => phone.auth.login(...args),
}))(AuthPanel);

export default withPhone;
