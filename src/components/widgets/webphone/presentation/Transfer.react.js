import React from 'react'
import { Input } from '../../../commons/autocomplete/'

import styles from '../index.css'

const Transfer = (props) => {
  let number = ''
  let handleClick = function(event) {
    if (props.handleClick) 
      props.handleClick(number)
  }
  let updateNumber = function(event, value) {
    number = value
  }
  return (
    <div className={ styles.flip }>
      <div className={ styles.flipTitle }>Transfer to</div>
      <Input onChange={ updateNumber } />
      <button onClick={ handleClick }>Transfer</button>
    </div>
  )
}

Transfer.propTypes = {
  handleClick: React.PropTypes.func,
}

export default Transfer
