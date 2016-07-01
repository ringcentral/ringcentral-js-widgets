import React from 'react'

const PanelHeader = (props) => {
  let ContentElement = props.children
  return (
    <div>
      { ContentElement }
    </div>
  )
}

PanelHeader.propTypes = {}

export default PanelHeader
