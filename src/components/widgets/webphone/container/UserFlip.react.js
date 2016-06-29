import React from 'react'
import Flip from '../presentation/Flip.react'
import { connect } from 'react-redux'

export default connect(state => {
  return {
    ...state,
    numbers: [
      {
        value: '1234567',
        type: 'main'
      },
      {
        value: '7655431',
        type: 'personal'
      }
    ],
    handleClick: function(event) { console.log(event) }
  }
})(Flip)
