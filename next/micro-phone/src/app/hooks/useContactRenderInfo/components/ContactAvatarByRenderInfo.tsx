import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { ContactAvatar } from '@ringcentral-integration/micro-contacts/src/app/components';
import { ConferenceMd } from '@ringcentral/spring-icon';
import { Avatar, AvatarProps } from '@ringcentral/spring-ui';
import React, { FC } from 'react';

import { ContactDisplayInfo } from '../utils';

type ContactAvatarByRenderInfoProps = {
  renderInfo: ContactDisplayInfo;
  isConferenceCall: boolean;
  isQueue: boolean;
} & Pick<AvatarProps, 'size'>;

export const ContactAvatarByRenderInfo: FC<ContactAvatarByRenderInfoProps> = ({
  isConferenceCall,
  isQueue,
  renderInfo,
  size = 'large',
}) => {
  if (isConferenceCall) {
    return (
      <Avatar
        symbol={ConferenceMd}
        size={size}
        data-sign="conferenceAvatar"
        classes={{
          content: 'bg-extra-denim text-neutral-base',
        }}
      />
    );
  }

  return (
    <ContactAvatar
      isDepartment={isQueue}
      contact={renderInfo.matchedContact as any}
      contactName={
        // when be queue number contact, not use the name for render the queue avatar
        (renderInfo.matchedContact as Entity)?.isCallQueueNumber
          ? undefined
          : // should use the matched contact name first to prevent using multi matches display name
            renderInfo.matchedContact?.name ||
            (renderInfo.type === 'callerIdName' &&
            // only when not be queue call can use callerId as display avatar
            !isQueue
              ? renderInfo.displayName
              : undefined)
      }
      size={size}
      phoneNumber={renderInfo.dialToPhoneNumber}
      data-sign="contactAvatar"
    />
  );
};
