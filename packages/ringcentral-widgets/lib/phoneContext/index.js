import React from 'react';
import PropTypes from 'prop-types';

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
