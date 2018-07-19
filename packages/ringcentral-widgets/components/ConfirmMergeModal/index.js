import React from 'react';
import PropTypes from 'prop-types';
import i18n from './i18n';
import styles from './styles.scss';
import Modal from '../Modal';
import Button from '../Button';
import CircleButton from '../CircleButton';
import CloseIcon from '../../assets/images/CloseIcon.svg';
import CallAvatar from '../CallAvatar';
import MergeIntoConferenceIcon from '../../assets/images/MergeIntoConferenceIcon.svg';

export default function ConfirmMergeModal({
  currentLocale,
  show,
  onMerge,
  onCancel,
  avatarUrls,
}) {
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
      closeBtn={
        <Button
          className={styles.closeBtn}
          onClick={onCancel}
        >
          <CloseIcon />
        </Button>
      }
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
              extraNum={avatarUrls.length - 1} />
          </div>
          <span>{i18n.getString('conferenceCall', currentLocale)}</span>
        </div>
        <span title={i18n.getString('mergeToConference', currentLocale)} className={styles.webphoneButton}>
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
}
ConfirmMergeModal.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onMerge: PropTypes.func,
  onCancel: PropTypes.func,
  avatarUrls: PropTypes.arrayOf(PropTypes.string),
};

ConfirmMergeModal.defaultProps = {
  onMerge() {},
  onCancel() {},
  avatarUrls: [],
};
