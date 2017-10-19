import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

export default function DropdownNavigationItem({
  icon,
  activeIcon,
  active,
  label,
  noticeCounts,
  onClick,
 }) {
  let notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = <div className={styles.notice}>99+</div>;
    } else {
      notice = <div className={styles.notice}>{noticeCounts}</div>;
    }
  }
  let navIcon = null;
  const Icon = active ? activeIcon : icon;
  if (typeof Icon === 'function') {
    navIcon = <Icon />;
  } else {
    navIcon = Icon;
  }
  return (
    <div
      title={label}
      onClick={onClick}
      className={classnames(
        styles.root,
        active && styles.active
      )}
    >
      <div className={styles.iconHolder}>
        {navIcon}
      </div>
      <div className={styles.labelHolder}>
        {label}
      </div>
      {notice}
    </div>
  );
}

DropdownNavigationItem.propTypes = {
  icon: PropTypes.func,
  activeIcon: PropTypes.func,
  active: PropTypes.bool,
  label: PropTypes.string,
  noticeCounts: PropTypes.number,
  onClick: PropTypes.func,
};

DropdownNavigationItem.defaultProps = {
  active: false,
  icon: null,
  activeIcon: null,
  label: undefined,
  noticeCounts: undefined,
  onClick: undefined,
};
