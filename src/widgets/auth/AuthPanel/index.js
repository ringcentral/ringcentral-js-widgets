import React from 'react';
import prefix from '../../../utils/style';

const { auth, loginButton } = prefix(['auth', 'loginButton', 'AuthPanel'], 'AuthPanel');

/**
 * OAuth 2.0 panel
 */
export default class AuthPanel extends React.Component {

  static propTypes = {
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
    if (this.removeEventListener) {
      this.removeEventListener();
      this.removeEventListener = null;
    }
    const redirectUri = this.props.redirectUri;
    const oauthChannel = (e) => {
      if (e.data.type === 'oauth') {
        let code;
        if (typeof(this.props.parseLoginUrl) === 'function') {
          code = this.props.parseLoginUrl(e.data.value).code;
        } else {
          code = this.props.parseLoginUrl
        }
        this.setState({ isOauthOpened: false });
        this.props.authorize({ code, redirectUri });
        window.removeEventListener('message', oauthChannel);
        this.removeEventListener = null;
      }
    };
    this.setState({ isOauthOpened: true });
    let url = this.props.loginUrl;
    if (typeof(this.props.loginUrl) === 'function') {
      url = this.props.loginUrl({ redirectUri })
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
