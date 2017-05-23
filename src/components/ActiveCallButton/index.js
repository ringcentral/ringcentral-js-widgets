import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Button from '../Button';
import styles from './styles.scss';

export default function ActiveCallButton(props) {
  const className = classnames(styles.root, props.className);
  const buttonClassName = classnames(
    styles.button,
    props.buttonClassName,
    props.active ? styles.buttonActive : null
  );
  return (
    <div className={className}>
      <Button
        className={buttonClassName}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </Button>
      <div className={styles.buttonTitle}>
        {props.title}
      </div>
    </div>
  );
}

ActiveCallButton.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

ActiveCallButton.defaultProps = {
  className: undefined,
  buttonClassName: undefined,
  disabled: false,
  active: false,
  children: undefined,
};
