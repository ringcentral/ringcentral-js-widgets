import React from 'react'
import styles from './list.css'


const ListItem = (props) => (
  <div 
    className={ `${ styles.listItem } ${ props.className } ${ props.clickable? styles.clickable: '' }` }
    onClick={ props.onClick }>
    { props.children }
  </div>
)

ListItem.propTypes = {
  onClick: React.PropTypes.func,
  clickable: React.PropTypes.bool,
  className: React.PropTypes.string,
}

export default ListItem
