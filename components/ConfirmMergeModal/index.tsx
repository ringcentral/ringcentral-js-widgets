import React from 'react';

import MergeIntoConferenceIcon from '../../assets/images/MergeIntoConferenceIcon.svg';
import CallAvatar from '../CallAvatar';
import CircleButton from '../CircleButton';
import Modal from '../Modal';
import i18n from './i18n';
import styles from './styles.scss';

type ConfirmMergeModalProps = {
  currentLocale: string;
  show: boolean;
  onMerge?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  partyProfiles?: object[];
};
const ConfirmMergeModal: React.SFC<ConfirmMergeModalProps> = ({
  currentLocale,
  show,
  onMerge,
  onCancel,
  partyProfiles,
}) => {
  const avatarUrls = partyProfiles.map((profile) => profile.avatarUrl);
  return (
    <Modal
      show={show}
      headerClassName={styles.header}
      currentLocale={currentLocale}
      className={styles.confirmMergeModal}
      modalClassName={styles.confirmMergeModal}
      cancelBtnClassName={styles.cancelBtn}
      confirmBtnClassName={styles.confirmBtn}
      title={i18n.getString('confirmation', currentLocale)}
      onCancel={onCancel}
      footerClassName={styles.footer}
    >
      <div className={styles.contentText}>
        {i18n.getString('confirmMergeToConference', currentLocale)}
      </div>
      <div className={styles.content}>
        <div className={styles.contentText}>
          <div className={styles.avatar}>
            <CallAvatar
              avatarUrl={avatarUrls[0]}
              isOnConferenceCall
              extraNum={avatarUrls.length - 1}
            />
          </div>
          <span>{i18n.getString('conferenceCall', currentLocale)}</span>
        </div>
        <span
          title={i18n.getString('mergeToConference', currentLocale)}
          className={styles.webphoneButton}
        >
          <CircleButton
            className={styles.mergeButton}
            onClick={(e) => {
              e.stopPropagation();
              onMerge();
            }}
            iconWidth={260}
            iconX={120}
            icon={MergeIntoConferenceIcon}
            showBorder={false}
          />
        </span>
      </div>
    </Modal>
  );
};
ConfirmMergeModal.defaultProps = {
  onMerge() {},
  onCancel() {},
  partyProfiles: [],
};
export default ConfirmMergeModal;
