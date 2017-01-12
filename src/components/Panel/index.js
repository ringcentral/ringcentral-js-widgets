import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

function Panel(props) {
  return (
    <div className={classnames(styles.root, props.className)}>
      {props.children}
    </div>
  );
}

Panel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Panel;
