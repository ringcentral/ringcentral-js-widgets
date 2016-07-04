import React from 'react'

import styles from '../index.css'

const DropdownItem = (props) => {
  
  return (
    <li className={ styles.dropdownItem }>
      <div>{ props.country }</div>
      <div>{ props.value }</div>
      <div>{ props.type }</div>
    </li>
  )
}

export default DropdownItem
