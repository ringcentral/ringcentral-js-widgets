import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SpinnerOverlay from '../SpinnerOverlay';
import ActiveCallItem from '../ActiveCallItem';

import styles from './styles.scss';
import i18n from './i18n';

export default function ActiveCallsPanel({
  calls,
  showSpinner,
  className,
  currentLocale,
  areaCode,
  countryCode,
  dateTimeFormatter,
  brand,
  showContactDisplayPlaceholder,
  formatPhone,
}) {
  if (showSpinner) {
    return (<SpinnerOverlay />);
  }
  if (calls.length === 0) {
    return (
      <div className={classnames(styles.root, className)}>
        <p className={styles.noCalls}>
          {i18n.getString('noActiveCalls', currentLocale)}
        </p>
      </div>
    );
  }
  return (
    <div className={classnames(styles.root, className)}>
      {
        calls.map(call => (
          <ActiveCallItem
            call={call}
            key={call.id}
            currentLocale={currentLocale}
            areaCode={areaCode}
            countryCode={countryCode}
            dateTimeFormatter={dateTimeFormatter}
            brand={brand}
            showContactDisplayPlaceholder={showContactDisplayPlaceholder}
            formatPhone={formatPhone}
          />
        ))
      }
    </div>
  );
}

ActiveCallsPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
  calls: PropTypes.array.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
};

ActiveCallsPanel.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
};
