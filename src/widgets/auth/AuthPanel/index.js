import React from 'react';
import prefix from '../../../utils/style';

const { auth, loginButton } = prefix(['auth', 'loginButton', 'AuthPanel'], 'AuthPanel');

class AuthPanel extends React.Component {

  static propTypes = {
    /**
     * type: url
     */
    redirectUri: React.PropTypes.string,
    authorize: React.PropTypes.func,
    loginUrl: React.PropTypes.func,
    parseLoginUrl: React.PropTypes.func,
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
        const { code } = this.props.parseLoginUrl(e.data.value);
        console.log(code);
        this.setState({ isOauthOpened: false });
        this.props.authorize({ code, redirectUri });
        window.removeEventListener('message', oauthChannel);
        this.removeEventListener = null;
      }
    };
    this.setState({ isOauthOpened: true });
    window.open(
      this.props.loginUrl({ redirectUri }),
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

export default AuthPanel;
