import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

/**
 * Circle Button with SVG
 */
function CircleButton(props) {
  let icon;
  if (props.icon) {
    const Icon = props.icon;
    icon = (
      <Icon
        className={classnames(styles.icon, props.iconClassName)}
        width={200}
        height={200}
        x={150}
        y={150}
      />
    );
  }
  const circleClass = classnames(
    styles.circle,
    props.showBorder ? null : styles.noBorder
  );
  const onClick = props.disabled ? () => {} : props.onClick;
  return (
    <div
      className={classnames(styles.root, props.className)}
      onClick={onClick}
    >
      <svg className={styles.btnSvg} viewBox="0 0 500 500">
        <g
          className={styles.btnSvgGroup}
        >
          <circle
            className={circleClass}
            cx="250"
            cy="250"
            r="245"
          />
          {icon}
        </g>
      </svg>
    </div>
  );
}

CircleButton.propTypes = {
  icon: PropTypes.func,
  className: PropTypes.string,
  showBorder: PropTypes.bool,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

CircleButton.defaultProps = {
  icon: undefined,
  className: undefined,
  showBorder: true,
  iconClassName: undefined,
  disabled: false,
  onClick: () => null,
};

export default CircleButton;
