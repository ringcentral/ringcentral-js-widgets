import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PhoneProvider extends Component {
  getChildContext() {
    return {
      phone: this.props.phone,
    };
  }
  render() {
    return this.props.children;
  }
}

PhoneProvider.propTypes = {
  phone: PropTypes.object.isRequired,
  children: PropTypes.node,
};
PhoneProvider.defaultProps = {
  children: null,
};

PhoneProvider.childContextTypes = {
  phone: PropTypes.object.isRequired,
};
