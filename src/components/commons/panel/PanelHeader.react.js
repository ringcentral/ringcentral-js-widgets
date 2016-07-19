import React from 'react';

const PanelHeader = (props) => {
  let ContentElement = props.children;
  return (
    <div>
      {ContentElement}
    </div>
  );
};

PanelHeader.propTypes = {
  children: React.PropTypes.node,
};

export default PanelHeader;
