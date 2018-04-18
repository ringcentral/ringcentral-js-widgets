import React from 'react';
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

export default function InsideModal({
  show,
  onClose,
  appendDOM,
  children,
  title,
}) {
  const closeBtn = (<CloseBtn onClick={onClose} />);
  if (!appendDOM) return null;
  return (
    <Modal
      title={title}
      headerClassName={styles.title}
      className={styles.container}
      maskClassName={styles.mask}
      modalClassName={styles.modal}
      contentClassName={styles.content}
      closeBtn={closeBtn}
      show={show}
      appendDOM={appendDOM}>
      {children}
    </Modal>
  );
}

InsideModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  appendDOM: PropTypes.object,
  children: PropTypes.node,
  title: PropTypes.string,
};

InsideModal.defaultProps = {
  title: null,
  show: undefined,
  onClose: undefined,
  appendDOM: undefined,
  children: undefined,
};
