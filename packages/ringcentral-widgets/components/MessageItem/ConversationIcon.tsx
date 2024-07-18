import messageDirection from '@ringcentral-integration/commons/enums/messageDirection';
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
import React from 'react';

import ComposeTextIcon from '../../assets/images/ComposeText.svg';
import FaxInboundIcon from '../../assets/images/FaxInbound.svg';
import FaxOutboundIcon from '../../assets/images/FaxOutbound.svg';
import GroupConversationIcon from '../../assets/images/GroupConversation.svg';
import VoicemailIcon from '../../assets/images/VoicemailIcon.svg';

import i18n from './i18n';
import styles from './styles.scss';

type ConversationIconProps = {
  group?: boolean;
  type?: string;
  currentLocale?: string;
  direction?: string;
};

export const ConversationIcon: React.FC<ConversationIconProps> = ({
  group,
  type,
  currentLocale,
  direction,
}) => {
  let title;
  let icon;
  switch (type) {
    case messageTypes.voiceMail:
      title = i18n.getString(messageTypes.voiceMail, currentLocale);
      icon = <VoicemailIcon width={23} className={styles.icon} />;
      break;
    case messageTypes.fax:
      title = i18n.getString(messageTypes.fax, currentLocale);
      icon =
        direction === messageDirection.inbound ? (
          <FaxInboundIcon width={21} className={styles.icon} />
        ) : (
          <FaxOutboundIcon width={21} className={styles.icon} />
        );
      break;
    default:
      title = group
        ? i18n.getString('groupConversation', currentLocale)
        : i18n.getString('conversation', currentLocale);
      icon = group ? (
        <GroupConversationIcon width={19} className={styles.icon} />
      ) : (
        <ComposeTextIcon width={18} className={styles.icon} />
      );
  }
  return (
    <div className={styles.conversationIcon}>
      <span title={title}>{icon}</span>
    </div>
  );
};
ConversationIcon.defaultProps = {
  group: false,
  type: undefined,
  currentLocale: undefined,
  direction: undefined,
};
