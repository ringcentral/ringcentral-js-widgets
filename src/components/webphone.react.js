import React from 'react'
import { connect } from 'react-redux'
class WebPhone extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log(this.props);
    return (
      <div>
      </div>
    );
  }
}
export default connect(state => state)(WebPhone)
