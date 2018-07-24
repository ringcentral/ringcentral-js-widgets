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
        width={props.iconWidth}
        height={props.iconHeight}
        x={props.iconX}
        y={props.iconY}
      />
    );
  }
  const circleClass = classnames(
    styles.circle,
    props.showBorder ? null : styles.noBorder
  );
  const onClick = props.disabled ? null : props.onClick;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(styles.btnSvg, props.className)}
      viewBox="0 0 500 500"
      onClick={onClick}
      width={props.width}
      height={props.height}
      x={props.x}
      y={props.y}
    >
      {props.title ? <title>{props.title}</title> : null}
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
  );
}

CircleButton.propTypes = {
  icon: PropTypes.func,
  className: PropTypes.string,
  showBorder: PropTypes.bool,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  disabled: PropTypes.bool,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  iconX: PropTypes.number,
  iconY: PropTypes.number,
  title: PropTypes.string,
};

CircleButton.defaultProps = {
  icon: undefined,
  className: undefined,
  showBorder: true,
  iconClassName: undefined,
  disabled: false,
  onClick: null,
  width: '100%',
  height: '100%',
  x: 0,
  y: 0,
  iconWidth: 200,
  iconHeight: 200,
  iconX: 150,
  iconY: 150,
  title: null,
};

export default CircleButton;
