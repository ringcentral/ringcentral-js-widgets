import calleeTypes from '@ringcentral-integration/commons/enums/calleeTypes';
import React from 'react';

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
const ConfirmRemoveModal: React.FC<ConfirmRemoveModalProps> = ({
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
    // @ts-expect-error TS(2339): Property 'partyNumber' does not exist on type 'obj... Remove this comment to see the full error message
    detail.partyNumber || i18n.getString('unknownNumber', currentLocale);
  // @ts-expect-error TS(2339): Property 'partyName' does not exist on type 'objec... Remove this comment to see the full error message
  if (detail.partyName && detail.calleeType === calleeTypes.contacts) {
    // means that matched a contact
    // @ts-expect-error TS(2339): Property 'partyName' does not exist on type 'objec... Remove this comment to see the full error message
    displayText = detail.partyName;
  }
  return (
    <Modal
      // @ts-expect-error TS(2322): Type '{ children: Element; show: boolean; headerCl... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'object | un... Remove this comment to see the full error message
  detail: null,
};
export default ConfirmRemoveModal;
