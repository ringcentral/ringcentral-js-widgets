import React from 'react';

import calleeTypes from '@ringcentral-integration/commons/enums/calleeTypes';

import Modal from '../Modal';
import i18n from './i18n';
import styles from './styles.scss';

type ConfirmRemoveModalProps = {
  currentLocale: string;
  show: boolean;
  onCancel?: (...args: any[]) => any;
  onRemove?: (...args: any[]) => any;
  detail?: object;
};
const ConfirmRemoveModal: React.SFC<ConfirmRemoveModalProps> = ({
  currentLocale,
  show,
  onRemove,
  onCancel,
  detail,
}) => {
  if (!detail) {
    return null;
  }
  let displayText =
    detail.partyNumber || i18n.getString('unknownNumber', currentLocale);
  if (detail.partyName && detail.calleeType === calleeTypes.contacts) {
    // means that matched a contact
    displayText = detail.partyName;
  }
  return (
    <Modal
      show={show}
      headerClassName={styles.header}
      currentLocale={currentLocale}
      className={styles.ConfirmRemoveModal}
      modalClassName={styles.ConfirmRemoveModal}
      maskClassName={styles.confirmRemoveModalMask}
      title={i18n.getString('removeParticipant', currentLocale)}
      onConfirm={onRemove}
      onCancel={onCancel}
      clickOutToClose
      contentClassName={styles.contentText}
      textConfirm={i18n.getString('remove', currentLocale)}
    >
      <p>
        {i18n.getString('confirmStr1', currentLocale)}
        <span>{` ${displayText} `}</span>
        {i18n.getString('confirmStr2', currentLocale)}
      </p>
    </Modal>
  );
};
ConfirmRemoveModal.defaultProps = {
  onRemove() {},
  onCancel() {},
  detail: null,
};
export default ConfirmRemoveModal;
