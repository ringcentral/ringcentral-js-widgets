import React from 'react'

const PanelContent = (props) => {
  let ContentElement = props.children
  return (
    <div>
      { ContentElement }
    </div>
  )
}

PanelContent.propTypes = {}

export default PanelContent
