import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';
import Draggable from '../Draggable';

function Badge({
  title,
  theme,
  onClick,
  children,
  draggable,
  className,
}) {
  if (draggable) {
    return (
      <Draggable className={classnames(styles.wrapper, className)}>
        <div
          title={title}
          onClick={onClick}
          className={classnames(styles.badge, styles[theme], className)}
        >
          {children}
        </div>
      </Draggable>
    );
  }
  return (
    <div
      title={title}
      onClick={onClick}
      className={classnames(styles.badge, styles[theme], className)}
    >
      {children}
    </div>
  );
}

Badge.propTypes = {
  theme: PropTypes.string,
  onClick: PropTypes.func,
  draggable: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Badge.defaultProps = {
  className: null,
  theme: 'success',
  draggable: false,
  onClick: () => null,
};

export default Badge;
