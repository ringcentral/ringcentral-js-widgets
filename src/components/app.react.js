import React from 'react'
import { connect } from 'react-redux'

import Auth from './widgets/auth/index.react'
import WebPhone from './widgets/webphone/index.react'

class App extends React.Component {
  static propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    function component() {
      return <WebPhone phone={this.props.phone}/>
    }
    return (
      <div>
        { component.call(this) }
      </div>
    )
  }
}

export default connect(state => {
  return {
    loggedIn: state.auth.status === 5,
  }
})(App)
