import React from 'react';
import PropTypes from 'prop-types';
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
