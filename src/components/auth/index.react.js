import React from 'react'
import { connect } from 'react-redux'
import config from '../../../config'

class Auth extends React.Component {
  constructor(props) {
    super(props);
  }
  login() {
    this.props.phone.auth.login({
      ...config.user
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.login.bind(this)}>Login</button>
      </div>
    );
  }
}
export default connect(state => state.auth)(Auth)
