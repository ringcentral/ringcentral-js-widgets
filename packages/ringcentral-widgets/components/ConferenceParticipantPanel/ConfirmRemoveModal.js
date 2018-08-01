import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import formatMessage from 'format-message';
import calleeTypes from 'ringcentral-integration/enums/calleeTypes';

import i18n from './i18n';
import styles from './styles.scss';
import Modal from '../Modal';
import Button from '../Button';
import CloseIcon from '../../assets/images/CloseIcon.svg';

export default function ConfirmRemoveModal({
  currentLocale,
  show,
  onRemove,
  onCancel,
  detail,
}) {
  if (!detail) {
    return null;
  }
  if (detail.calleeType === calleeTypes.contacts) {
    detail = detail.toUserName;
  } else {
    detail = detail.partyNumber;
  }
  return (
    <Modal
      show={show}
      headerClassName={styles.header}
      currentLocale={currentLocale}
      className={styles.ConfirmRemoveModal}
      modalClassName={styles.ConfirmRemoveModal}
      title={i18n.getString('removeParticipant', currentLocale)}
      onConfirm={onRemove}
      onCancel={onCancel}
      clickOutToClose
      contentClassName={styles.contentText}
      textConfirm={i18n.getString('remove', currentLocale)}
    >
      <p>
        {i18n.getString('confirmStr1', currentLocale)}
        <span>{` ${detail} `}</span>
        {i18n.getString('confirmStr2', currentLocale)}
      </p>
    </Modal>
  );
}

ConfirmRemoveModal.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onRemove: PropTypes.func,
  detail: PropTypes.object,
};

ConfirmRemoveModal.defaultProps = {
  onRemove() { },
  onCancel() { },
  detail: null,
};
