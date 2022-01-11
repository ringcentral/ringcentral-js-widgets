import React from 'react';

import classnames from 'classnames';

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
  const phoneSourceName = phoneSourceNameRenderer
    ? phoneSourceNameRenderer(entityType)
    : phoneSourceNames.getString(entityType);
  const nameTitle = `${name} ${splitter} ${phoneSourceName}`;
  return (
    <div
      className={classnames(styles.nameSection, {
        [styles.dncNameSection]: doNotCall,
      })}
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
