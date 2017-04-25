import React, { PropTypes } from 'react';

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
        name={'active-call'}
      >
        <span className={styles.activeIcon}>
          <i className={dynamicsFont.active} />
        </span>
        Calling
      </Badge>
    </Draggable>
  );
}

ActiveCallBadge.propTypes = {
  onClick: PropTypes.func.isRequired,
  offsetX: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
  updatePositionOffset: PropTypes.func.isRequired,
};
