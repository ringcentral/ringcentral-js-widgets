import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import classnames from 'classnames';
import propTypes from 'prop-types';

import styles from './styles.scss';

// TODO: consider refactoring onClose + clickOutToClose to onOverlayClick
function createModal(Comp: any) {
  return class KModal extends Component {
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
      const root =
        // @ts-expect-error TS(2339): Property 'appendDOM' does not exist on type 'Reado... Remove this comment to see the full error message
        this.props.appendDOM ||
        (this.context.modalRoot && this.context.modalRoot.current) ||
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
        // @ts-expect-error TS(2339): Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
        className,
        // @ts-expect-error TS(2339): Property 'maskClassName' does not exist on type 'R... Remove this comment to see the full error message
        maskClassName,
        // @ts-expect-error TS(2339): Property 'modalClassName' does not exist on type '... Remove this comment to see the full error message
        modalClassName,
        // @ts-expect-error TS(2339): Property 'show' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        show,
        // @ts-expect-error TS(2339): Property 'onClose' does not exist on type 'Readonl... Remove this comment to see the full error message
        onClose,
        // @ts-expect-error TS(2339): Property 'clickOutToClose' does not exist on type ... Remove this comment to see the full error message
        clickOutToClose,
        ...props
      } = this.props;
      const onClick = clickOutToClose ? onClose : () => {};
      return (
        <div
          className={
            show
              ? classnames(styles.container, className)
              : styles.containerHidden
          }
        >
          <div
            className={
              show ? classnames(styles.mask, maskClassName) : styles.maskHidden
            }
            onClick={onClick}
          />
          <div
            data-sign={show ? 'deleteModal' : undefined}
            className={
              show
                ? classnames(styles.modal, modalClassName)
                : styles.modalHidden
            }
          >
            <Comp {...props} />
          </div>
        </div>
      );
    }
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    render() {
      return ReactDOM.createPortal(this.renderDialog(), this._container);
    }
  };
}
export default createModal;
