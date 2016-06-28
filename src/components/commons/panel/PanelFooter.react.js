import React from 'react'

const PanelFooter = (props) => {
  let ContentElement = props.children
  return (
    <div>
      {ContentElement}
    </div>
  )
}

PanelFooter.propTypes = {}

export default PanelFooter
