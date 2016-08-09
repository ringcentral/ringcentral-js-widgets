import React from 'react';

const PanelContent = (props) => {
  let ContentElement = props.children;
  return (
    <div>
      {ContentElement}
    </div>
  );
};

PanelContent.propTypes = {
  children: React.PropTypes.node,
};

export default PanelContent;
