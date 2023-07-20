import type { FunctionComponent } from 'react';
import React from 'react';
import { phoneSources } from '../../enums/phoneSources';

import phoneSourceNames from '../../lib/phoneSourceNames';
import type { RecipientInfoProps } from './RecipientsInputV2.interface';
import styles from './styles.scss';

export const RecipientInfo: FunctionComponent<RecipientInfoProps> = ({
  currentLocale,
  name,
  entityType,
  enableTitle,
  phoneSourceNameRenderer,
  splitter,
}) => {
  // align the type in contact search result so far temporarily,
  // need pass brand info here if need to use phoneSources.rcContact.
  // see also ringcentral-js-widgets/ringcentral-widgets/components/ContactDropdownList/ContactInfo.tsx
  const type =
    entityType === phoneSources.rcContact ? phoneSources.contact : entityType;

  const phoneSourceName = phoneSourceNameRenderer
    ? // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      phoneSourceNameRenderer(type)
    : // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      phoneSourceNames.getString(type, currentLocale);
  const title = enableTitle
    ? `${name} ${splitter} ${phoneSourceName}`
    : undefined;
  return (
    <div className={styles.nameSection} title={title}>
      <span className={styles.name}>{name}</span>
      <span className={styles.splitter}>{splitter}</span>
      <span className={styles.phoneSourceLabel}>{phoneSourceName}</span>
    </div>
  );
};
