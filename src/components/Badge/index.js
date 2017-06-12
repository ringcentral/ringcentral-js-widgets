import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

function Badge({
  className,
  name,
  children,
  onClick,
}) {
  return (
    <a
      href={`#${name}-badge`}
      className={classnames(styles.root, className)}
      onClick={onClick} >
      {children}
    </a>
  );
}

Badge.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Badge.defaultProps = {
  className: null,
  name: null,
  onClick: () => null,
};

export default Badge;
