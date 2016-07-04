import React from 'react'
import styles from '../index.css'

const Closable = (props) => {
  let content = props.children
  return (
    <div className={ props.className }>
      <button className={ styles.cancelButton } onClick={ props.onClose }>Cancel</button>
      { content }
    </div>
  )
}

Closable.propTypes = {
  onClose: React.PropTypes.func,
}

export default Closable
