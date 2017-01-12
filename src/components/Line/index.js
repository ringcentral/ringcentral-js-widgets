import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

function Line(props) {
  return (
    <div
      className={classnames(
        styles.root,
        props.className,
        props.onClick && styles.clickable,
        props.horizontal && styles.horizontal,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

Line.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  horizontal: PropTypes.bool,
};

export default Line;
