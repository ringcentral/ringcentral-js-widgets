import AuthPanel from '../../../../src/widgets/auth/AuthPanel';
import { connect } from '../../../../src/utils/integration/';

// TODO: import the cred info from other places?
import config from '../../../../config';

export default connect((state, props, phone) => ({
  login: (...args) => phone.auth.login(...args),
  authorize: (...args) => phone.auth.authorize(...args),
  loginUrl: (options) => phone.auth.loginUrl(options),
  parseLoginUrl: (url) => phone.auth.parseLoginUrl(url),
  redirectUri: config.redirectUri,
}))(AuthPanel);
