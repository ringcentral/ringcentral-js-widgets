import React from 'react'

import styles from '../index.css'
import DropdownItem from './DropdownItem.react'

const Dropdown = (props) => {
  console.log(props.items);
  return (
    <ul className={ styles.dropdown }>
      { props.items.map((item, index) => (
        <DropdownItem
          key={ index }
          country={ item.country } 
          value={ item.value } 
          type={ item.type } />
      )) }
    </ul>
  )
}

export default Dropdown
