import clsx from 'clsx';
import React from 'react';

import CloseIcon from '../../assets/images/CloseIcon.svg';

import styles from './styles.scss';

type SlideoutBarProps = {
  closable?: boolean;
  className?: string;
  offset: number;
  slideout: boolean;
  onClick?: (...args: any[]) => any;
  onClose?: (...args: any[]) => any;
};
class SlideoutBar extends React.Component<SlideoutBarProps, {}> {
  _onClose = (evt: any) => {
    evt.stopPropagation();
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onClose();
  };
  _renderCloseButton() {
    return (
      <i className={styles.closeBtn} onClick={this._onClose}>
        <CloseIcon />
      </i>
    );
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { offset, onClick, slideout, className, closable, children } =
      this.props;
    const slideStyle = slideout ? 'translateX(0)' : `translateX(${offset}px)`;
    const cls = clsx(styles.container, className);
    const closeButton = closable ? this._renderCloseButton() : null;
    return (
      <div className={cls} style={{ transform: slideStyle }} onClick={onClick}>
        {children}
        {closeButton}
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
SlideoutBar.defaultProps = {
  closable: true,
  className: undefined,
  children: undefined,
  onClick() {},
  onClose() {},
};
export default SlideoutBar;
