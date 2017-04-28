import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Button from '../Button';
import styles from './styles.scss';

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
            <Button
              className={styles.btn}
              onClick={this.onCancel}> Cancel </Button>
            <Button
              className={styles.btn}
              onClick={this.onSubmit}> Confirm </Button>
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
};
Modal.defaultProps = {
  className: '',
  children: undefined,
  effect: 'fadeInDown',
  show: false,
  onClose: undefined,
  clickOutToClose: false,
  title: undefined,
};

