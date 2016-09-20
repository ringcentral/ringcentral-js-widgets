import React from 'react';

export default ({ children, isDisplay, className }) => {
  return (
    <div className={className}>
      {isDisplay ? children : null}
    </div>
  );
};
