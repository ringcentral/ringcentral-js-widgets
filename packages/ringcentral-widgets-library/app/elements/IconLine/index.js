import React from 'react';
import PropTypes from 'prop-types';
import Line from '../Line';
import IconField from '../IconField';
import styles from './styles.scss';

export default function IconLine(props) {
  return (
    <Line
      className={props.className}
      onClick={props.onClick}
      noBorder={props.noBorder}>
      <IconField
        className={styles.iconlineWrapper}
        icon={props.icon}>
        {props.children}
      </IconField>
    </Line>
  );
}

IconLine.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  noBorder: PropTypes.bool,
};
