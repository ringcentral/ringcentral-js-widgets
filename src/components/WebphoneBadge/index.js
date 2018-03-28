import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Badge from '../Badge';
import Draggable from '../Draggable';
import i18n from './i18n';
import styles from './styles.scss';

export default function WebphoneBadge({
  onClick,
  className,
  currentLocale,
}) {
  return (
    <Draggable className={styles.root} onClick={onClick}>
      <Badge
        className={classnames(className, styles.badge)}
        name={i18n.getString('webphoneUnavailable', currentLocale)}
      >
        {i18n.getString('webphoneUnavailable', currentLocale)}
      </Badge>
    </Draggable>
  );
}

WebphoneBadge.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

WebphoneBadge.defaultProps = {
  className: null,
  onClick: () => {},
};
