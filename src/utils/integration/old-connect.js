import React from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function connect(mapActionsToProps) {
  return function wrapWithConnect(WrappedComponent) {
    const displayName = `PhoneConnect(${getDisplayName(WrappedComponent)})`;
    const Connect = (props, context) => {
      const mergedProps = Object.assign(mapActionsToProps(context.phone), props);
      return <WrappedComponent {...mergedProps} />;
    };
    Connect.contextTypes = {
      phone: React.PropTypes.object,
    };
    Connect.displayName = displayName;
    return Connect;
  };
}
