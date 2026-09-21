import clsx from 'clsx';
import propTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.scss';

type ModalContext = {
  modalRoot?: {
    current?: HTMLElement;
  };
};

// TODO: consider refactoring onClose + clickOutToClose to onOverlayClick
function createModal(Comp: any) {
  return class KModal extends Component<any> {
    static propTypes = {
      className: propTypes.string,
      modalClassName: propTypes.string,
      show: propTypes.bool,
      onClose: propTypes.func,
      clickOutToClose: propTypes.bool,
      appendDOM: propTypes.object,
      maskClassName: propTypes.string,
    };
    static defaultProps = {
      className: '',
      modalClassName: '',
      show: false,
      onClose: undefined,
      clickOutToClose: false,
      appendDOM: undefined,
      maskClassName: undefined,
    };
    static contextTypes = {
      modalRoot: propTypes.object,
    };
    _container: any;
    constructor(props: any) {
      super(props);
      this._container = document.createElement('div');
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    componentDidMount() {
      const context = this.context as ModalContext;
      const root =
        this.props.appendDOM ||
        (context.modalRoot && context.modalRoot.current) ||
        document.body;
      root.appendChild(this._container);
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
      const onClick = clickOutToClose ? onClose : () => {};
      return (
        <div
          className={
            show ? clsx(styles.container, className) : styles.containerHidden
          }
        >
          <div
            className={
              show ? clsx(styles.mask, maskClassName) : styles.maskHidden
            }
            onClick={onClick}
          />
          <div
            data-sign={show ? 'deleteModal' : undefined}
            className={
              show ? clsx(styles.modal, modalClassName) : styles.modalHidden
            }
          >
            <Comp {...props} />
          </div>
        </div>
      );
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    render() {
      return createPortal(this.renderDialog(), this._container);
    }
  };
}
export default createModal;
