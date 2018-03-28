import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import InsideModalClose from '../../assets/images/InsideModalClose.svg';

export default class InSideModal extends Component {
  constructor(...args) {
    super(...args);
    if (typeof this.props.show === 'undefined') {
      this.state = {
        show: this.props.defaultShow,
      };
      this.toggle = (value) => {
        this.setState({
          show: typeof value !== 'undefined' ?
            value :
            !this.state.show,
        });
      };
    }
  }

  render() {
    const onClose = typeof this.props.onClose === 'function' ?
      this.props.onClose :
      this.toggle.bind(this, false);
    if (
      typeof this.props.show !== 'undefined'
    ) {
      if (!this.props.show) return null;
    } else if (!this.state.show) {
      return null;
    }
    const CloseButton = typeof this.props.renderCloseBtn === 'function' ?
      this.props.renderCloseBtn(this.props) :
      (
        <div
          className={styles.closeBtn}
          onClick={onClose}>
          <InsideModalClose />
        </div>
      );
    return (
      <div
        className={styles.container}>
        <div
          onClick={() => {
            if (this.props.clickOutToClose) onClose();
          }}
          className={classnames(
              styles.mask,
              this.props.maskClassName
            )} />
        <div
          className={classnames(
            styles.content,
            this.props.className
          )}>
          {this.props.children}
          {this.props.hideCloseBtn ? null : CloseButton}
        </div>
      </div>
    );
  }
}

InSideModal.propTypes = {
  className: PropTypes.string,
  maskClassName: PropTypes.string,
  show: PropTypes.bool,
  defaultShow: PropTypes.bool,
  hideCloseBtn: PropTypes.bool,
  clickOutToClose: PropTypes.bool,
  renderCloseBtn: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

InSideModal.defaultProps = {
  className: '',
  maskClassName: '',
  show: undefined,
  clickOutToClose: false,
  defaultShow: false,
  hideCloseBtn: false,
  renderCloseBtn: undefined,
  onClose: undefined,
  children: undefined,
};
