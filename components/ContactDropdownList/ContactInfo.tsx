import clsx from 'clsx';
import React from 'react';

import { phoneSources } from '../../enums/phoneSources';
import phoneSourceNames from '../../lib/phoneSourceNames';

import { splitter } from './splitter';
import styles from './styles.scss';

type ContactInfoProps = {
  name: string;
  entityType: string;
  titleEnabled?: boolean;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  doNotCall?: boolean;
};

export const ContactInfo: React.FC<ContactInfoProps> = ({
  name,
  entityType,
  titleEnabled,
  phoneSourceNameRenderer,
  doNotCall,
}) => {
  // align the type in contact search result so far temporarily,
  // need pass brand info here if need to use phoneSources.rcContact.
  // see also ringcentral-js-widgets/ringcentral-widgets/components/RecipientsInputV2/RecipientInfo.tsx
  const type =
    entityType === phoneSources.rcContact ? phoneSources.contact : entityType;
  const phoneSourceName = phoneSourceNameRenderer
    ? phoneSourceNameRenderer(type)
    : phoneSourceNames.getString(type);
  const nameTitle = `${name} ${splitter} ${phoneSourceName}`;
  return (
    <div
      className={clsx(styles.nameSection, {
        [styles.dncNameSection]: doNotCall,
      })}
      // @ts-expect-error TS(2322): Type 'string | false | undefined' is not assignabl... Remove this comment to see the full error message
      title={titleEnabled && nameTitle}
      data-sign="contactNameSection"
    >
      <span className={styles.name}>{name}</span>
      <span className={styles.splitter}>{splitter}</span>
      <span className={styles.label}>{phoneSourceName}</span>
    </div>
  );
};

ContactInfo.defaultProps = {
  titleEnabled: undefined,
  phoneSourceNameRenderer: undefined,
  doNotCall: false,
};
