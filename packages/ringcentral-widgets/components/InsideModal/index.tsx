import clsx from 'clsx';
import React from 'react';

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
const InsideModal: React.FC<InsideModalProps> = ({
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
      // @ts-expect-error TS(2322): Type '{ children: ReactNode; title: string | undef... Remove this comment to see the full error message
      title={title}
      headerClassName={styles.title}
      className={clsx(styles.container, containerStyles)}
      maskClassName={clsx(styles.mask, maskStyle)}
      modalClassName={clsx(styles.modal, modalStyles)}
      contentClassName={clsx(styles.content, contentStyle)}
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
  // @ts-expect-error TS(2322): Type '{ title: string; showTitle: true; showCloseB... Remove this comment to see the full error message
  children: undefined,
  containerStyles: undefined,
  maskStyle: undefined,
  modalStyles: undefined,
  contentStyle: undefined,
};
export default InsideModal;
