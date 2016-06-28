import React from 'react'
import WebPhone from './presentation/webphone.react'
import { connect } from 'react-redux'

export default connect(state => {
  return {
    ...state,
  }
})(WebPhone)
