import React from 'react'
import { Input } from '../../../commons/autocomplete/'

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
    <div>
      <div>transfer</div>
      <Input onChange={ updateNumber } />
      <button onClick={ handleClick }>Transfer</button>
    </div>
  )
}

Transfer.propTypes = {
  handleClick: React.PropTypes.func,
}

export default Transfer
