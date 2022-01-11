import { Component, createElement, isValidElement } from 'react';

import format from 'format-message';
import PropTypes from 'prop-types';

export default class FormattedMessage extends Component {
  render() {
    const { message, values, tagName } = this.props;

    const uid = Math.floor(Math.random() * 0x10000000000).toString(16);
    const hashedParams = {};
    const elements = {};
    const tokenDelimeter = `@__${uid}__@`;

    Object.keys(values).forEach((key) => {
      if (isValidElement(values[key])) {
        hashedParams[key] = `${tokenDelimeter}${key}${tokenDelimeter}`;
        elements[key] = values[key];
      } else {
        hashedParams[key] = values[key];
      }
    });

    const nodes = format(message, hashedParams)
      .split(tokenDelimeter)
      .filter((token) => !!token)
      .map((token) => elements[token] || token);
    return createElement(tagName, null, ...nodes);
  }
}

FormattedMessage.propTypes = {
  message: PropTypes.string.isRequired,
  values: PropTypes.object,
  tagName: PropTypes.string,
};
FormattedMessage.defaultProps = {
  values: {},
  tagName: 'span',
};
