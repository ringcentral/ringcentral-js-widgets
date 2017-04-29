import React, { Component, PropTypes } from 'react';
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
    <button className={classnames(className, styles.flatBtn)}>
      <div
        className={classnames(
          className,
          styles.text,
          disabled && styles.disabled,
        )}
        onClick={!disabled && onClick} >
        {children}
      </div>
    </button>
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

    this.state = {
      show: props.show,
    };

    this.onClose = () => {
      if (typeof props.onClose === 'function') {
        props.onClose();
      }
      this.close();
    };
    this.onSubmit = () => {
      // console.debug('onOK');
      this.props.onSubmit();
      this.close();
    };
    this.onCancel = () => {
      this.close();
    };

    this.close = () => {
      this.setState({
        show: !this.state.show
      });
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    });
  }
  render() {
    const show = this.state.show;

    return (
      <div className={show ? styles.container : styles.containerHidden}>
        <div className={show ? styles.modal : styles.modalHidden}>
          {this.props.title ?
            <div className={styles.header}>{this.props.title}</div> : null}
          <div className={styles.content}>
            {this.props.children}
          </div>
          <div className={styles.footer}>
            <FlatButton
              className={styles.btn}
              onClick={this.onCancel}>
              {this.props.textCancel ||
                i18n.getString('cancel', this.props.currentLocale)}
            </FlatButton>
            <FlatButton
              className={styles.btn}
              onClick={this.onSubmit}>
              {this.props.textConfirm ||
                i18n.getString('confirm', this.props.currentLocale)}
            </FlatButton>
          </div>
        </div>
        <div
          className={show ? styles.mask : styles.maskHidden}
          onClick={this.props.clickOutToClose ? this.onClose : false} />
      </div>
    );
  }
}
Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  effect: PropTypes.oneOf(['fadeInDown', 'fadeInUp']),
  show: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  clickOutToClose: PropTypes.bool,
  title: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  textConfirm: PropTypes.string,
  textCancel: PropTypes.string,
};
Modal.defaultProps = {
  className: '',
  children: undefined,
  effect: 'fadeInDown',
  show: false,
  onClose: undefined,
  clickOutToClose: false,
  title: undefined,
  textConfirm: '',
  textCancel: '',
};

