import React from 'react';
import PropTypes from 'prop-types';

export default function withPhone(Comp) {
  const WithPhone = (props, context) => (
    <Comp
      phone={context.phone}
      {...props}
    />
  );
  WithPhone.contextTypes = {
    phone: PropTypes.object.isRequired,
  };
  return WithPhone;
}
