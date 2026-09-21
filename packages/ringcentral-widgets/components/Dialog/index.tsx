import clsx from 'clsx';
import propTypes from 'prop-types';
import React from 'react';

import CloseIcon from '../../assets/images/CloseIcon.svg';
import { Button } from '../Button';

import i18n from './i18n';
import styles from './styles.scss';

const FlatButton = ({
  className = undefined,
  disabled = false,
  onClick = undefined,
  children = undefined,
  dataSign = '',
}: any) => {
  return (
    <div
      className={clsx(
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
};
FlatButton.propTypes = {
  className: propTypes.string,
  disabled: propTypes.bool,
  onClick: propTypes.func,
  children: propTypes.node,
  dataSign: propTypes.string,
};

const Dialog = ({
  children = undefined,
  title = '',
  onConfirm = undefined,
  onCancel = undefined,
  textConfirm = '',
  textCancel = '',
  currentLocale = '',
  className = '',
  cancelBtnClassName = '',
  confirmBtnClassName = '',
  showTitle = true,
  showCloseBtn = true,
  headerClassName = undefined,
  contentClassName = undefined,
  footerClassName = undefined,
}: any) => {
  const footer =
    !currentLocale || (!onCancel && !onConfirm) ? null : (
      <div className={clsx(styles.footer, footerClassName)}>
        {onCancel ? (
          <FlatButton
            className={clsx(styles.btn, styles.cancelBtn, cancelBtnClassName)}
            dataSign="cancel"
            onClick={onCancel}
          >
            {textCancel || i18n.getString('cancel', currentLocale)}
          </FlatButton>
        ) : null}
        {onConfirm ? (
          <FlatButton
            className={clsx(styles.btn, styles.confirmBtn, confirmBtnClassName)}
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
    <div className={clsx(styles.dialog, className)}>
      {showTitle ? (
        <div className={clsx(styles.header, headerClassName)}>
          {/* @ts-expect-error TS(2322): Type 'string | null' is not assignable */}
          <div className={styles.headerText} title={headText}>
            {headText}
          </div>
        </div>
      ) : null}
      {showCloseBtn ? (
        <Button
          dataSign="closeButton"
          className={styles.closeBtn}
          onClick={onCancel}
        >
          <CloseIcon />
        </Button>
      ) : null}
      <div className={clsx(styles.content, contentClassName)}>{children}</div>
      {footer}
    </div>
  );
};

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
export default Dialog;
