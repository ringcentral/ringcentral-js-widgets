import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IconLine from '../IconLine';
import styles from './styles.scss';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

function LinkLine({
  onClick,
  className,
  children,
  hrefClassName,
  iconClassName,
}) {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={classnames(styles.link, hrefClassName)}
    >
      <IconLine
        className={className}
        icon={<span className={classnames(dynamicsFont.arrow, styles.icon, iconClassName)} />}
      >
        {children}
      </IconLine>
    </a>
  );
}

LinkLine.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hrefClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
LinkLine.defaultProps = {
  children: undefined,
  className: undefined,
  hrefClassName: undefined,
  iconClassName: undefined,
};
export default LinkLine;
