import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import i18n from './i18n';

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
      closeBtn,
      maskClassName,
      headerClassName,
      contentClassName,
    } = this.props;
    if (!show) return null;
    const footer = !currentLocale || (
      !onCancel && !onConfirm
    ) ? (
      <div className={styles.footer}>
        {onCancel ? (
          <FlatButton
            className={classnames(styles.btn, cancelBtnClassName)}
            onClick={onCancel}>
            {textCancel ||
            i18n.getString('cancel', currentLocale)}
          </FlatButton>
        ) : null}
        {onConfirm ? (
          <FlatButton
            className={classnames(styles.btn, confirmBtnClassName)}
            onClick={onConfirm}>
            {textConfirm ||
            i18n.getString('confirm', currentLocale)}
          </FlatButton>
        ) : null}
      </div>
      ) : null;
    return (
      <div className={classnames(styles.container, className)}>
        <div
          className={classnames(styles.mask, maskClassName)}
          onClick={clickOutToClose ? onCancel : () => {}}
        />
        <div className={classnames(styles.modal, modalClassName)}>
          {title ?
            <div className={classnames(styles.header, headerClassName)}>{title}</div> : null}
          {closeBtn}
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
  closeBtn: PropTypes.node,
  appendDOM: PropTypes.object,
  maskClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  contentClassName: PropTypes.string,
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
  title: undefined,
  textConfirm: '',
  textCancel: '',
  closeBtn: undefined,
  appendDOM: undefined,
  maskClassName: undefined,
  headerClassName: undefined,
  contentClassName: undefined,
};

