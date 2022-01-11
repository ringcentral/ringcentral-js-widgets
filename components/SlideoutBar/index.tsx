import React from 'react';

import classnames from 'classnames';

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
  _onClose = (evt) => {
    evt.stopPropagation();
    this.props.onClose();
  };
  _renderCloseButton() {
    return (
      <i className={styles.closeBtn} onClick={this._onClose}>
        <CloseIcon />
      </i>
    );
  }
  render() {
    const { offset, onClick, slideout, className, closable, children } =
      this.props;
    const slideStyle = slideout ? 'translateX(0)' : `translateX(${offset}px)`;
    const cls = classnames(styles.container, className);
    const closeButton = closable ? this._renderCloseButton() : null;
    return (
      <div className={cls} style={{ transform: slideStyle }} onClick={onClick}>
        {children}
        {closeButton}
      </div>
    );
  }
}
SlideoutBar.defaultProps = {
  closable: true,
  className: undefined,
  children: undefined,
  onClick() {},
  onClose() {},
};
export default SlideoutBar;
