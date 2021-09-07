import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IconLine from '../IconLine';
import styles from './styles.scss';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

const LinkLine = ({
  onClick,
  className,
  children,
  hideUnderline,
  hrefClassName,
  iconClassName,
  tooltip,
  pendoSignName,
  ...rest
}) => {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={tooltip}
      className={classnames(styles.link, hrefClassName)}
      style={hideUnderline ? { textDecoration: 'none' } : {}}
      data-pendo={pendoSignName || undefined}
      {...rest}
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
};

LinkLine.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hideUnderline: PropTypes.bool,
  hrefClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
  pendoSignName: PropTypes.string,
};
LinkLine.defaultProps = {
  children: undefined,
  className: undefined,
  hideUnderline: false,
  hrefClassName: undefined,
  iconClassName: undefined,
  tooltip: undefined,
  pendoSignName: undefined,
};
export default LinkLine;
