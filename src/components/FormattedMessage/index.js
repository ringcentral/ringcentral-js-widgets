import { createElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import format from 'format-message';

export default function FormattedMessage({ message, values, tagName = 'span' }) {
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
    .filter(token => !!token)
    .map(token => elements[token] || token);
  return createElement(tagName, null, ...nodes);
}

FormattedMessage.propTypes = {
  message: PropTypes.string.isRequired,
  values: PropTypes.object,
  tagName: PropTypes.string,
};
