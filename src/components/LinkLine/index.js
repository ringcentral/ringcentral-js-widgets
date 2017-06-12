import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IconLine from '../IconLine';
import styles from './styles.scss';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

function LinkLine({
  onClick,
  className,
  children
}) {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={styles.link}
    >
      <IconLine
        className={className}
        icon={<span className={classnames(dynamicsFont.arrow, styles.icon)} />}
      >
        {children}
      </IconLine>
    </a>
  );
}

LinkLine.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
LinkLine.defaultProps = {
  children: undefined,
  className: undefined,
};
export default LinkLine;
