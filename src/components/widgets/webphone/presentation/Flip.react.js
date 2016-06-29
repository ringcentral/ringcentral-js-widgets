import React from 'react'
import { List, ListItem } from '../../../commons/list/'

const Flip = (props) => (
  <div>
    <div>flip</div>
    <List>
      { 
        props.numbers.map((number, index) => (
          <ListItem 
            key={ index } 
            onClick={ props.handleClick }
            clickable={ true }>
            <span>{ number.value }</span>
            <span>{ number.type }</span>
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
