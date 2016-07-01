import React from 'react'

const Closable = (props) => {
  let content = props.children
  return (
    <div>
      { content }
    </div>
  )
}

Closable.propTypes = {
  close: React.PropTypes.func.isRequired,
}

export default Closable
