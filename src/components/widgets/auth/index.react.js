import React from 'react';
import { connect } from 'react-redux';

class Auth extends React.Component {

  login() {

  }

  render() {
    return (
      <div>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}
export default connect(state => state.auth)(Auth);
