import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SpinnerOverlay from '../SpinnerOverlay';
import ActiveCallItem from '../ActiveCallItem';

import styles from './styles.scss';

export default function ActiveCallsPanel({
  calls,
  showSpinner,
  className,
  currentLocale,
}) {
  if (showSpinner) {
    return (<SpinnerOverlay />);
  }
  return (
    <div className={classnames(styles.root, className)}>
      {
        calls.map(call => (
          <ActiveCallItem
            call={call}
            key={call.id}
            currentLocale={currentLocale}
          />
        ))
      }
    </div>
  );
}

ActiveCallsPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  calls: PropTypes.array.isRequired,
  showSpinner: PropTypes.bool.isRequired,
};
