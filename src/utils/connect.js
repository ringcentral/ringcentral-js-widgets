import React from 'react';

export default function connect(mapActionsToProps) {
  return function wrapWithConnect(WrappedComponent) {
    class Connect extends React.Component {
      render() {
        return <WrappedComponent />;
      }
    }
    return Connect;
  };
}
