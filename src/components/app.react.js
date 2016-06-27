import React from 'react'
import { connect } from 'react-redux'

import Auth from './auth/index.react'
import WebPhone from './webphone/index.react'

class App extends React.Component {
  static propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.loggedIn);
    function component() {
      return <WebPhone phone={this.props.phone}/>
    }
    return (
      <div>
        {component.call(this)}
      </div>
    );
  }
}
export default connect(state => {
  return {
    loggedIn: state.auth.status === 5,
  }
})(App)
