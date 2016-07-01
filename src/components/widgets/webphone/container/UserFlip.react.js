import React from 'react'
import Flip from '../presentation/Flip.react'
import { connect } from 'react-redux'

export default connect(state => {
  return {
    ...state,
    numbers: [
      {
        value: '+1 650-397-6085',
        type: 'Howard Zhang Existing Phone'
      },
      {
        value: '+1 650-397-6085',
        type: 'Personal'
      }
    ],
    handleClick: function(event) { console.log(event) }
  }
})(Flip)
