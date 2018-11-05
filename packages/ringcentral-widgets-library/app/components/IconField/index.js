import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function IconField(props) {
  return (
    <div className={props.className}>
      <div className={styles.content}>
        {props.children}
      </div>
      <div className={styles.iconHolder}>
        <div className={styles.icon}>
          { props.icon }
        </div>
      </div>
    </div>
  );
}

IconField.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  className: PropTypes.string,
};
