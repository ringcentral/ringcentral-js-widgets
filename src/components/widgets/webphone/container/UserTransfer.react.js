import React from 'react'
import Transfer from '../presentation/Transfer.react'
import { connect } from 'react-redux'

export default connect(state => {
  return {
    ...state,
    numbers: [
      '1222112212',
      '42424242',
      '120',
      '101',
    ],
    handleClick: function(value) { console.log(value) }
  }
})(Transfer)
