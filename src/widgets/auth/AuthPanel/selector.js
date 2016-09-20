// TODO: import the cred info from other places?
import config from '../../../../config';

export default (state, props, auth) => (
  {
    auth,
    redirectUri: config.redirectUri,
  }
);

