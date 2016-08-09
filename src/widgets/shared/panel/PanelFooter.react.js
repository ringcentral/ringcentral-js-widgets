import React from 'react';

const PanelFooter = (props) => {
  let ContentElement = props.children;
  return (
    <div>
      {ContentElement}
    </div>
  );
};

PanelFooter.propTypes = {
  children: React.PropTypes.node,
};

export default PanelFooter;
