import React from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import Badge from '../Badge';
import Draggable from '../Draggable';
import styles from './styles.scss';

type ActiveCallBadgeProps = {
  onClick: (...args: any[]) => any;
  offsetX: number;
  offsetY: number;
  updatePositionOffset: (...args: any[]) => any;
  title?: string;
};
const ActiveCallBadge: React.SFC<ActiveCallBadgeProps> = (props) => {
  return (
    <Draggable
      className={styles.root}
      onClick={props.onClick}
      positionOffsetX={props.offsetX}
      positionOffsetY={props.offsetY}
      updatePositionOffset={props.updatePositionOffset}
    >
      {/* @ts-expect-error TS(2322): Type 'string | undefined' is not assignable */}
      <Badge className={styles.badge} name={props.title}>
        <span className={styles.activeIcon}>
          <i className={dynamicsFont.callHover} />
        </span>
        {props.title}
      </Badge>
    </Draggable>
  );
};
ActiveCallBadge.defaultProps = {
  title: 'Active Call',
};
export default ActiveCallBadge;
