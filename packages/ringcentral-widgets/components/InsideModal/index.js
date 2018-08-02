import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from '../Modal';
import styles from './styles.scss';
import InsideModalClose from '../../assets/images/InsideModalClose.svg';

// export function CloseBtn({ onClick }) {
//   return (
//     <div className={styles.closeBtn} onClick={onClick}>
//       <InsideModalClose />
//     </div>
//   );
// }

// CloseBtn.propTypes = {
//   onClick: PropTypes.func
// };

// CloseBtn.defaultProps = {
//   onClick: undefined
// };

export default function InsideModal({
  show,
  onClose,
  children,
  title,
  showCloseBtn,
  containerStyles,
  maskStyle,
  modalStyles,
  contentStyle
}) {
  return (
    <Modal
      title={title}
      headerClassName={styles.title}
      className={classnames(styles.container, containerStyles)}
      maskClassName={classnames(styles.mask, maskStyle)}
      modalClassName={classnames(styles.modal, modalStyles)}
      contentClassName={classnames(styles.content, contentStyle)}
      show={show}
      showCloseBtn={showCloseBtn}
      onCancel={onClose}
    >
      {children}
    </Modal>
  );
}

InsideModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  showCloseBtn: PropTypes.bool,
  containerStyles: PropTypes.string,
  maskStyle: PropTypes.string,
  modalStyles: PropTypes.string,
  contentStyle: PropTypes.string
};

InsideModal.defaultProps = {
  title: null,
  showCloseBtn: true,
  show: undefined,
  onClose: undefined,
  children: undefined,
  containerStyles: undefined,
  maskStyle: undefined,
  modalStyles: undefined,
  contentStyle: undefined
};
