import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import FormattedMessage from '../../FormattedMessage';

export default function Alert({
  message,
  appName,
  brand,
  sourceName,
  clickHereLink,
  callback,
}) {
  const clickHereLinkComp = clickHereLink ? (<a onClick={callback}>{clickHereLink}</a>) : null;

  return message ? (
    <div className={styles.alert}>
      <FormattedMessage
        message={message}
        values={{
          appName, brand, sourceName, clickHereLink: clickHereLinkComp
        }}
      />
    </div>
  ) : null;
}

export const AlertPropTypes = {
  message: PropTypes.string.isRequired,
  appName: PropTypes.string,
  brand: PropTypes.string,
  sourceName: PropTypes.string,
  clickHereLink: PropTypes.string,
  callback: PropTypes.func,
};

Alert.propTypes = AlertPropTypes;

Alert.defaultProps = {
  clickHereLink: null,
  callback: null,
  appName: null,
  brand: null,
  sourceName: null,
};
