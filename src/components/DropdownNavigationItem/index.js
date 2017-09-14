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
        {active ? activeIcon : icon}
      </div>
      <div className={styles.labelHolder}>
        {label}
      </div>
      {notice}
    </div>
  );
}

DropdownNavigationItem.propTypes = {
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
  active: PropTypes.bool,
  label: PropTypes.string,
  noticeCounts: PropTypes.number,
  onClick: PropTypes.func,
};

DropdownNavigationItem.defaultProps = {
  active: false,
  label: undefined,
  noticeCounts: undefined,
  onClick: undefined,
};
