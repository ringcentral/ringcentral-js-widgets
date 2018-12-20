import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PhoneContext = React.createContext(null);
export default PhoneContext;

export function PhoneProvider({
  phone,
  children,
}) {
  return (
    <PhoneContext.Provider value={phone}>
      {children}
    </PhoneContext.Provider>
  );
}
PhoneProvider.propTypes = {
  phone: PropTypes.object.isRequired,
  children: PropTypes.node,
};
PhoneProvider.defaultProps = {
  children: null,
};

export function withPhone(Comp) {
  function WithPhone(props) {
    return (
      <PhoneContext.Consumer>
        {
          phone => (
            <Comp
              phone={phone}
              {...props}
            />
          )
        }
      </PhoneContext.Consumer>
    );
  }
  return WithPhone;
}

export function connectModule(fn) {
  return (Comp) => {
    const WithModule = connect(
      (_, props) => fn(props.phone).getUIProps(props),
      (_, props) => fn(props.phone).getUIFunctions(props),
    )(Comp);
    return props => (
      <PhoneContext.Consumer>
        {
          phone => (
            <WithModule
              phone={phone}
              {...props}
            />
          )
        }
      </PhoneContext.Consumer>
    );
  };
}
