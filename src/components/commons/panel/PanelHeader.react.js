import React from 'react'

const PanelHeader = (props) => (
  <div>
    <h2>{props.title}</h2>
    <div>{props.subtitle}</div>
  </div>
)

PanelHeader.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
}

export default PanelHeader
