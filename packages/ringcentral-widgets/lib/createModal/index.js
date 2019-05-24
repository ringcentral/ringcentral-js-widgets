import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

// TODO: consider refactoring onClose + clickOutToClose to onOverlayClick
export default function createModal(Comp) {
  return class KModal extends Component {
    static propTypes = {
      className: propTypes.string,
      modalClassName: propTypes.string,
      show: propTypes.bool,
      onClose: propTypes.func,
      clickOutToClose: propTypes.bool,
      appendDOM: propTypes.object,
      maskClassName: propTypes.string,
    }
    static defaultProps = {
      className: '',
      modalClassName: '',
      show: false,
      onClose: undefined,
      clickOutToClose: false,
      appendDOM: undefined,
      maskClassName: undefined,
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
        onClose,
        clickOutToClose,
        ...props
      } = this.props;
      const onClick = clickOutToClose ? onClose : () => { };
      return (
        <div className={show ? classnames(styles.container, className) : styles.containerHidden}>
          <div
            className={show ? classnames(styles.mask, maskClassName) : styles.maskHidden}
            onClick={onClick}
          />
          <div data-sign={show ? 'deleteModal' : undefined} className={show ? classnames(styles.modal, modalClassName) : styles.modalHidden}>
            <Comp
              {...props}
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
