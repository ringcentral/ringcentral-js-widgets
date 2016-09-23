import React from 'react';
import prefix from '../../../utils/style';

import Redirect from 'react-router/Redirect';

const { auth, loginButton, wrapper } =
  prefix(['auth', 'loginButton', 'AuthPanel', 'wrapper'], 'AuthPanel');

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
    isAuthorised: false,
  }

  componentWillUnmount() {
    if (this.removeEventListener) {
      this.removeEventListener();
    }
  }

  oauth() {
    const { redirectUri } = this.props;
    if (this.removeEventListener) {
      this.removeEventListener();
      this.removeEventListener = null;
    }
    const oauthChannel = (e) => {
      if (e.data.type === 'oauth') {
        let code;
        if (typeof(this.props.auth.parseLoginUrl) === 'function') {
          code = this.props.auth.parseLoginUrl(e.data.value).code;
        } else {
          code = this.props.auth.parseLoginUrl;
        }
        this.setState({
          isOauthOpened: false,
          isAuthorised: true,
        });
        this.props.auth.authorize({ code, redirectUri });
        window.removeEventListener('message', oauthChannel);
        this.removeEventListener = null;
      }
    };
    this.setState({ isOauthOpened: true });
    let url = this.props.auth.loginUrl;
    if (typeof(this.props.auth.loginUrl) === 'function') {
      url = this.props.auth.loginUrl({ redirectUri });
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
    console.log(this.props)
    return (
      <div className={wrapper}>
        {this.state.isAuthorised && <Redirect to={this.props.mainPage} />}
        <div className={auth}>
          <button
            className={loginButton}
            onClick={() => this.oauth()}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}
