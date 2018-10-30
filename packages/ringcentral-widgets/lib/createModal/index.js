import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

export default function createModal(Comp) {
  return class KModal extends Component {
    static propTypes = {
      className: propTypes.string,
      modalClassName: propTypes.string,
      cancelBtnClassName: propTypes.string,
      confirmBtnClassName: propTypes.string,
      children: propTypes.node,
      show: propTypes.bool,
      onConfirm: propTypes.func,
      onCancel: propTypes.func,
      clickOutToClose: propTypes.bool,
      title: propTypes.string,
      currentLocale: propTypes.string,
      textConfirm: propTypes.string,
      textCancel: propTypes.string,
      showCloseBtn: propTypes.bool,
      showTitle: propTypes.bool,
      appendDOM: propTypes.object,
      maskClassName: propTypes.string,
      headerClassName: propTypes.string,
      contentClassName: propTypes.string,
      footerClassName: propTypes.string,
    }
    static defaultProps = {
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
      showTitle: true,
      appendDOM: undefined,
      maskClassName: undefined,
      headerClassName: undefined,
      contentClassName: undefined,
      footerClassName: undefined,
    }
    static contextTypes = {
      modalRoot: propTypes.object,
    }
    constructor(props) {
      super(props);
      this._container = document.createElement('div');
    }
    componentDidMount() {
      const root = (
        this.props.appendDOM ||
        (this.context.modalRoot && this.context.modalRoot.current) ||
        document.body
      );
      root.appendChild(this._container);
    }
    componentWillUnmount() {
      if (this._container.parentNode) {
        this._container.parentNode.removeChild(this._container);
      }
    }
    renderDialog() {
      const {
        className,
        maskClassName,
        modalClassName,
        show,
        onCancel,
        clickOutToClose,
        ...props
      } = this.props;
      const onClick = clickOutToClose ? onCancel : () => {};
      return (
        <div className={show ? classnames(styles.container, className) : styles.containerHidden}>
          <div
            className={show ? classnames(styles.mask, maskClassName) : styles.maskHidden}
            onClick={onClick}
          />
          <div className={show ? classnames(styles.modal, modalClassName) : styles.modalHidden}>
            <Comp
              {...props}
              onCancel={onCancel}
            />
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
  };
}
