import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';
import i18n from './i18n';
import Button from '../Button';
import CloseIcon from '../../assets/images/CloseIcon.svg';

function FlatButton({
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

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this._container = document.createElement('div');
    this.appendDOM = this.props.appendDOM || document.body;
  }

  componentDidMount() {
    this.appendDOM.appendChild(this._container);
  }

  componentWillUnmount() {
    this.appendDOM.removeChild(this._container);
  }

  renderDialog() {
    const {
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
      modalClassName,
      cancelBtnClassName,
      confirmBtnClassName,
      showCloseBtn,
      maskClassName,
      headerClassName,
      contentClassName,
      footerClassName,
    } = this.props;
    // if (!show) return null;
    const footer = !currentLocale || (
      !onCancel && !onConfirm
    ) ? null : (
      <div className={classnames(styles.footer, footerClassName)}>
        {onCancel ? (
          <FlatButton
            className={classnames(styles.btn, styles.cancelBtn, cancelBtnClassName)}
            onClick={onCancel}>
            {textCancel ||
            i18n.getString('cancel', currentLocale)}
          </FlatButton>
        ) : null}
        {onConfirm ? (
          <FlatButton
            className={classnames(styles.btn, styles.confirmBtn, confirmBtnClassName)}
            onClick={onConfirm}>
            {textConfirm ||
            i18n.getString('confirm', currentLocale)}
          </FlatButton>
        ) : null}
      </div>
      );
    return (
      <div className={show ? classnames(styles.container, className) : styles.containerHidden}>
        <div
          className={show ? classnames(styles.mask, maskClassName) : styles.maskHidden}
          onClick={clickOutToClose ? onCancel : () => {}}
        />
        <div className={show ? classnames(styles.modal, modalClassName) : styles.modalHidden}>
          <div className={classnames(styles.header, headerClassName)}>
            {`${title}` || null}
          </div>
          {
            showCloseBtn ?
              <Button
                className={styles.closeBtn}
                onClick={onCancel}
              >
                <CloseIcon />
              </Button>
          : null
          }
          <div className={classnames(styles.content, contentClassName)}>
            {children}
          </div>
          {footer}
        </div>
      </div>
    );
  }

  render() {
    return ReactDOM.createPortal(
      this.renderDialog(),
      this._container,
    );
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  modalClassName: PropTypes.string,
  cancelBtnClassName: PropTypes.string,
  confirmBtnClassName: PropTypes.string,
  children: PropTypes.node,
  show: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  clickOutToClose: PropTypes.bool,
  title: PropTypes.string,
  currentLocale: PropTypes.string,
  textConfirm: PropTypes.string,
  textCancel: PropTypes.string,
  showCloseBtn: PropTypes.bool,
  appendDOM: PropTypes.object,
  maskClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  footerClassName: PropTypes.string,
};
Modal.defaultProps = {
  className: '',
  currentLocale: '',
  modalClassName: '',
  cancelBtnClassName: '',
  confirmBtnClassName: '',
  children: undefined,
  show: false,
  onConfirm: undefined,
  onCancel: undefined,
  clickOutToClose: false,
  title: '',
  textConfirm: '',
  textCancel: '',
  showCloseBtn: true,
  appendDOM: undefined,
  maskClassName: undefined,
  headerClassName: undefined,
  contentClassName: undefined,
  footerClassName: undefined,
};

