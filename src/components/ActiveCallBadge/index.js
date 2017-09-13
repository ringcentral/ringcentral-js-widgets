import React from 'react';
import PropTypes from 'prop-types';

import Badge from '../Badge';
import Draggable from '../Draggable';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

export default function ActiveCallBadge(props) {
  return (
    <Draggable
      className={styles.root}
      onClick={props.onClick}
      positionOffsetX={props.offsetX}
      positionOffsetY={props.offsetY}
      updatePositionOffset={props.updatePositionOffset}
    >
      <Badge
        className={styles.phoneBage}
        name={props.title}
      >
        <span className={styles.activeIcon}>
          <i className={dynamicsFont.callHover} />
        </span>
        {props.title}
      </Badge>
    </Draggable>
  );
}

ActiveCallBadge.propTypes = {
  onClick: PropTypes.func.isRequired,
  offsetX: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
  updatePositionOffset: PropTypes.func.isRequired,
  title: PropTypes.string,
};

ActiveCallBadge.defaultProps = {
  title: 'Active Call',
};
