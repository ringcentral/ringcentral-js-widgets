import React from 'react';
import prefix from '../../../utils/style';

const { auth, loginButton } = prefix(['auth', 'loginButton', 'AuthPanel'], 'AuthPanel');

/**
 * OAuth 2.0 panel
 */
export default class AuthPanel extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object,
    /**
     * redirect uri for OAuth
     */
    redirectUri: React.PropTypes.string,
    /**
     * After we get the code, will call the function to authorize the service `authorize({ code, redirectUri })`
     */
    authorize: React.PropTypes.func,
    /**
     * the url of OAuth login page, or a function return a string
     */
    loginUrl: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func,
    ]),
    /**
     * Return the OAuth code string or a function return the code
     */
    parseLoginUrl: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func,
    ]),
  }

  state = {
    isOauthOpened: false,
  }

  componentWillUnmount() {
    if (this.removeEventListener) {
      this.removeEventListener();
    }
  }

  oauth() {
    const { authorize, loginUrl, parseLoginUrl } = this.props.auth;
    const { redirectUri } = this.props;
    if (this.removeEventListener) {
      this.removeEventListener();
      this.removeEventListener = null;
    }
    const oauthChannel = (e) => {
      if (e.data.type === 'oauth') {
        let code;
        if (typeof(parseLoginUrl) === 'function') {
          code = parseLoginUrl(e.data.value).code;
        } else {
          code = parseLoginUrl;
        }
        this.setState({ isOauthOpened: false });
        authorize({ code, redirectUri });
        window.removeEventListener('message', oauthChannel);
        this.removeEventListener = null;
      }
    };
    this.setState({ isOauthOpened: true });
    let url = loginUrl;
    if (typeof(loginUrl) === 'function') {
      url = loginUrl.call(this.props.auth, { redirectUri });
    }
    window.open(
      url,
      'oauth-iframe',
      'width=400, height=600'
    );
    window.addEventListener('message', oauthChannel);
    this.removeEventListener = () => window.removeEventListener('message', oauthChannel);
  }

  render() {
    return (
      <div className={auth}>
        <button
          className={loginButton}
          onClick={() => this.oauth()}
        >
          Login
        </button>
      </div>
    );
  }
}
