import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';
import styles from './styles.scss';
import i18n from './i18n';

export function FlatButton({
  className,
  disabled,
  onClick,
  children,
}) {
  return (
    <div
      className={classnames(
        className,
        styles.flatBtn,
        styles.text,
        disabled && styles.disabled,
      )}
      onClick={!disabled && onClick} >
      {children}
    </div>
  );
}
FlatButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

FlatButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined,
  children: undefined,
};

export default function Modal({
  className,
  children,
  title,
  show,
  onConfirm,
  onCancel,
  textConfirm,
  textCancel,
  currentLocale,
  clickOutToClose,
}) {
  return (
    <div className={classnames(className, show ? styles.container : styles.containerHidden)}>
      <div className={show ? styles.modal : styles.modalHidden}>
        {title ?
          <div className={styles.header}>{title}</div> : null}
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.footer}>
          <FlatButton
            className={styles.btn}
            onClick={onCancel}>
            {textCancel ||
              i18n.getString('cancel', currentLocale)}
          </FlatButton>
          <FlatButton
            className={styles.btn}
            onClick={onConfirm}>
            {textConfirm ||
              i18n.getString('confirm', currentLocale)}
          </FlatButton>
        </div>
      </div>
      <div
        className={show ? styles.mask : styles.maskHidden}
        onClick={clickOutToClose ? onCancel : false} />
    </div>
  );
}
Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  show: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  clickOutToClose: PropTypes.bool,
  title: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  textConfirm: PropTypes.string,
  textCancel: PropTypes.string,
};
Modal.defaultProps = {
  className: '',
  children: undefined,
  show: false,
  clickOutToClose: false,
  title: undefined,
  textConfirm: '',
  textCancel: '',
};

