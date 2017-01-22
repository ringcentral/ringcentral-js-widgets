import React, { PropTypes } from 'react';
import styles from './styles.scss';
import Line from '../Line';

export default function IconLine(props) {
  return (
    <Line
      className={props.className}
      onClick={props.onClick} >
      <div className={styles.content}>
        {props.children}
      </div>
      <div className={styles.iconHolder}>
        <div className={styles.icon}>
          { props.icon }
        </div>
      </div>
    </Line>
  );
}

IconLine.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
