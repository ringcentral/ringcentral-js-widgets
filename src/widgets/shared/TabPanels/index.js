import React from 'react';

export default ({ children, displayedTab, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
};
