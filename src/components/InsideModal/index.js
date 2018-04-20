import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import styles from './styles.scss';
import InsideModalClose from '../../assets/images/InsideModalClose.svg';

export function CloseBtn({ onClick }) {
  return (
    <div
      className={styles.closeBtn}
      onClick={onClick}>
      <InsideModalClose />
    </div>
  );
}

CloseBtn.propTypes = {
  onClick: PropTypes.func,
};

CloseBtn.defaultProps = {
  onClick: undefined,
};

export default class InsideModal extends Component {
  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const {
      show,
      onClose,
      children,
      title,
    } = this.props;
    const closeBtn = (<CloseBtn onClick={onClose} />);
    return (
      <div ref={(ref) => { this.appendDOM = ref; }}>
        {
          this.appendDOM ? (
            <Modal
              title={title}
              headerClassName={styles.title}
              className={styles.container}
              maskClassName={styles.mask}
              modalClassName={styles.modal}
              contentClassName={styles.content}
              closeBtn={closeBtn}
              show={show}
              appendDOM={this.appendDOM}>
              {children}
            </Modal>
          ) : null
        }
      </div>
    );
  }
}

InsideModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
};

InsideModal.defaultProps = {
  title: null,
  show: undefined,
  onClose: undefined,
  children: undefined,
};
