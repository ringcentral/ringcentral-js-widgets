import React from 'react'
import WebPhone from './presentation/webphone.react'
import { connect } from 'react-redux'

export default connect(state => {
  return {
    ...state,
    status: 'OnCall',
    // status: 'Idle',
    // status: 'OnCallIncoming',
    phoneNumber: '(650) 397-6085',
    contacts: ['aa', 'bb', 'cc'],
  }
})(WebPhone)
