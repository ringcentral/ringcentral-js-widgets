import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

import phoneSourceNames from '../../lib/phoneSourceNames';

export default function ContactInfo({
  name,
  entityType,
  enableTitle,
  phoneSourceNameRenderer,
  splitter,
}) {
  const phoneSourceName = phoneSourceNameRenderer
    ? phoneSourceNameRenderer(entityType)
    : phoneSourceNames.getString(entityType);
  const title = enableTitle
    ? `${name} ${splitter} ${phoneSourceName}`
    : undefined;
  return (
    <div className={styles.nameSection} title={title}>
      <span className={styles.name}>{name}</span>
      <span className={styles.spliter}>{splitter}</span>
      <span className={styles.label}>{phoneSourceName}</span>
    </div>
  );
}

ContactInfo.propTypes = {
  entityType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneSourceNameRenderer: PropTypes.func,
  splitter: PropTypes.string.isRequired,
  enableTitle: PropTypes.bool,
};

ContactInfo.defaultProps = {
  phoneSourceNameRenderer: undefined,
  enableTitle: undefined,
};
