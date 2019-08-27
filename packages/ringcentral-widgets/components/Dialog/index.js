import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';
import i18n from './i18n';
import Button from '../Button';
import CloseIcon from '../../assets/images/CloseIcon.svg';

function FlatButton({
  className, disabled, onClick, children, dataSign
}) {
  return (
    <div
      className={classnames(
        className,
        styles.flatBtn,
        styles.text,
        disabled && styles.disabled,
      )}
      data-sign={dataSign}
      onClick={!disabled && onClick}
    >
      {children}
    </div>
  );
}
FlatButton.propTypes = {
  className: propTypes.string,
  disabled: propTypes.bool,
  onClick: propTypes.func,
  children: propTypes.node,
  dataSign: propTypes.string,
};

FlatButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined,
  children: undefined,
  dataSign: ''
};

export default function Dialog({
  children,
  title,
  onConfirm,
  onCancel,
  textConfirm,
  textCancel,
  currentLocale,
  className,
  cancelBtnClassName,
  confirmBtnClassName,
  showTitle,
  showCloseBtn,
  headerClassName,
  contentClassName,
  footerClassName,
}) {
  const footer =
    !currentLocale || (!onCancel && !onConfirm) ? null : (
      <div className={classnames(styles.footer, footerClassName)}>
        {onCancel ? (
          <FlatButton
            className={classnames(
              styles.btn,
              styles.cancelBtn,
              cancelBtnClassName,
            )}
            dataSign="cancel"
            onClick={onCancel}
          >
            {textCancel || i18n.getString('cancel', currentLocale)}
          </FlatButton>
        ) : null}
        {onConfirm ? (
          <FlatButton
            className={classnames(
              styles.btn,
              styles.confirmBtn,
              confirmBtnClassName,
            )}
            dataSign="confirm"
            onClick={onConfirm}
          >
            {textConfirm || i18n.getString('confirm', currentLocale)}
          </FlatButton>
        ) : null}
      </div>
    );
  const headText = `${title}` || null;
  return (
    <div
      className={classnames(styles.dialog, className)}
    >
      {showTitle ? (
        <div className={classnames(styles.header, headerClassName)}>
          <div className={styles.headerText} title={headText}>
            {headText}
          </div>
        </div>
      ) : null}
      {showCloseBtn ? (
        <Button dataSign="closeButton" className={styles.closeBtn} onClick={onCancel}>
          <CloseIcon />
        </Button>
      ) : null}
      <div className={classnames(styles.content, contentClassName)}>
        {children}
      </div>
      {footer}
    </div>
  );
}

Dialog.propTypes = {
  className: propTypes.string,
  cancelBtnClassName: propTypes.string,
  confirmBtnClassName: propTypes.string,
  children: propTypes.node,
  onConfirm: propTypes.func,
  onCancel: propTypes.func,
  title: propTypes.string,
  currentLocale: propTypes.string,
  textConfirm: propTypes.string,
  textCancel: propTypes.string,
  showCloseBtn: propTypes.bool,
  showTitle: propTypes.bool,
  headerClassName: propTypes.string,
  contentClassName: propTypes.string,
  footerClassName: propTypes.string,
};
Dialog.defaultProps = {
  currentLocale: '',
  className: '',
  cancelBtnClassName: '',
  confirmBtnClassName: '',
  children: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  title: '',
  textConfirm: '',
  textCancel: '',
  showCloseBtn: true,
  showTitle: true,
  headerClassName: undefined,
  contentClassName: undefined,
  footerClassName: undefined,
};
