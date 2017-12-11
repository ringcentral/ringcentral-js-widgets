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
  }

  componentDidMount() {
    document.body.appendChild(this._container);
  }

  componentWillUnmount() {
    document.body.removeChild(this._container);
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
    } = this.props;
    return (
      <div className={classnames(className, show ? styles.container : styles.containerHidden)}>
        <div className={classnames(modalClassName, show ? styles.modal : styles.modalHidden)}>
          {title ?
            <div className={styles.header}>{title}</div> : null}
          {closeBtn}
          <div className={styles.content}>
            {children}
          </div>
          <div className={styles.footer}>
            <FlatButton
              className={classnames(cancelBtnClassName, styles.btn)}
              onClick={onCancel}>
              {textCancel ||
                i18n.getString('cancel', currentLocale)}
            </FlatButton>
            <FlatButton
              className={classnames(confirmBtnClassName, styles.btn)}
              onClick={onConfirm}>
              {textConfirm ||
                i18n.getString('confirm', currentLocale)}
            </FlatButton>
          </div>
        </div>
        <div
          className={show ? styles.mask : styles.maskHidden}
          onClick={clickOutToClose ? onCancel : () => {}}
        />
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
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  clickOutToClose: PropTypes.bool,
  title: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  textConfirm: PropTypes.string,
  textCancel: PropTypes.string,
  closeBtn: PropTypes.node,
};
Modal.defaultProps = {
  className: '',
  modalClassName: '',
  cancelBtnClassName: '',
  confirmBtnClassName: '',
  children: undefined,
  show: false,
  clickOutToClose: false,
  title: undefined,
  textConfirm: '',
  textCancel: '',
  closeBtn: undefined,
};

