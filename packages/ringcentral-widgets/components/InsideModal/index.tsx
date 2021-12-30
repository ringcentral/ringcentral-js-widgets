import React from 'react';

import classnames from 'classnames';

import Modal from '../Modal';
import styles from './styles.scss';

type InsideModalProps = {
  show?: boolean;
  onClose?: (...args: any[]) => any;
  title?: string;
  showTitle?: boolean;
  showCloseBtn?: boolean;
  clickOutToClose?: boolean;
  containerStyles?: string;
  maskStyle?: string;
  modalStyles?: string;
  contentStyle?: string;
};
const InsideModal: React.SFC<InsideModalProps> = ({
  show,
  onClose,
  children,
  title,
  showTitle,
  showCloseBtn,
  clickOutToClose,
  containerStyles,
  maskStyle,
  modalStyles,
  contentStyle,
}) => {
  return (
    <Modal
      title={title}
      headerClassName={styles.title}
      className={classnames(styles.container, containerStyles)}
      maskClassName={classnames(styles.mask, maskStyle)}
      modalClassName={classnames(styles.modal, modalStyles)}
      contentClassName={classnames(styles.content, contentStyle)}
      show={show}
      showTitle={showTitle}
      showCloseBtn={showCloseBtn}
      clickOutToClose={clickOutToClose}
      onCancel={onClose}
    >
      {children}
    </Modal>
  );
};
InsideModal.defaultProps = {
  title: '',
  showTitle: true,
  showCloseBtn: true,
  clickOutToClose: true,
  show: undefined,
  onClose: undefined,
  children: undefined,
  containerStyles: undefined,
  maskStyle: undefined,
  modalStyles: undefined,
  contentStyle: undefined,
};
export default InsideModal;
