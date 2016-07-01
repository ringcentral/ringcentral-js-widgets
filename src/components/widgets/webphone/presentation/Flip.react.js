import React from 'react'
import { List, ListItem } from '../../../commons/list/'

import styles from '../index.css'

const Flip = (props) => (
  <div className={ styles.flip }>
    <div className={ styles.flipTitle }>Flip to</div>
    <List>
      { 
        props.numbers.map((number, index) => (
          <ListItem
            className={ styles.flipItem }
            key={ index } 
            onClick={ props.handleClick }
            clickable={ true }>
            <div className={ styles.flipItemTitle }>{ number.type }</div>
            <div className={ styles.flipItemSubtitle }>{ number.value }</div>
          </ListItem>
        ))
      }
    </List>
  </div>
)

Flip.propTypes = {
  numbers: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
  })),
  handleClick: React.PropTypes.func,
}

export default Flip
