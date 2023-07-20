import React from 'react';

import EndIcon from '../../assets/images/End.svg';
import CallAvatar from '../CallAvatar';
import CircleButton from '../CircleButton';
import MediaObject from '../MediaObject';
import i18n from './i18n';
import styles from './styles.scss';

type ParticipantItemProps = {
  detail: string;
  avatarUrl?: string;
  onRemove?: (...args: any[]) => any;
  currentLocale: string;
};
const ParticipantItem: React.SFC<ParticipantItemProps> = ({
  detail,
  avatarUrl,
  onRemove,
  currentLocale,
}) => {
  return (
    <MediaObject
      containerCls={styles.participantItem}
      bodyCls={styles.mediaBodyCls}
      mediaLeft={
        <div className={styles.avatar}>
          <CallAvatar isOnConferenceCall={false} avatarUrl={avatarUrl} />
        </div>
      }
      mediaBody={
        <div title={detail} className={styles.detail}>
          {detail}
        </div>
      }
      mediaRight={
        <span
          title={i18n.getString('removeParticipant', currentLocale)}
          className={styles.webphoneButton}
        >
          <CircleButton
            className={styles.rejectButton}
            onClick={(e) => {
              e.stopPropagation();
              // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              onRemove();
            }}
            iconWidth={260}
            iconX={120}
            icon={EndIcon}
            showBorder={false}
          />
        </span>
      }
    />
  );
};
ParticipantItem.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  avatarUrl: null,
  onRemove: (i) => i,
};
export default ParticipantItem;
