import React from 'react';

export default class PhoneProvider extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.phone = props.phone;
  }

  getChildContext() {
    return { phone: this.phone };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

PhoneProvider.propTypes = {
  phone: React.PropTypes.object,
  children: React.PropTypes.element.isRequired,
};

PhoneProvider.childContextTypes = {
  phone: React.PropTypes.object,
};

export {
  PhoneProvider,
};
