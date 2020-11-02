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
  hideUnderline,
  hrefClassName,
  iconClassName,
  tooltip,
}) {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={tooltip}
      className={classnames(styles.link, hrefClassName)}
      style={hideUnderline ? { textDecoration: 'none' } : {}}
    >
      <IconLine
        className={className}
        icon={
          <span
            className={classnames(
              dynamicsFont.arrow,
              styles.icon,
              iconClassName,
            )}
          />
        }
      >
        {children}
      </IconLine>
    </a>
  );
}

LinkLine.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hideUnderline: PropTypes.bool,
  hrefClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
};
LinkLine.defaultProps = {
  children: undefined,
  className: undefined,
  hideUnderline: false,
  hrefClassName: undefined,
  iconClassName: undefined,
  tooltip: undefined,
};
export default LinkLine;
