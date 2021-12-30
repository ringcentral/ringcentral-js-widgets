import React, { ComponentType } from 'react';

import { phoneSources } from '@ringcentral-integration/commons/enums/phoneSources';

import styles from './styles.scss';

export type ContactDisplayItemProps = {
  entityName?: string;
  entityType?: string;
  phoneNumber?: string;
  sourceIcons?: {
    brandIcon?: ComponentType<any>;
    [key: string]: ComponentType<any>;
  };
};

export const ContactDisplayItem: React.FC<ContactDisplayItemProps> = ({
  entityName,
  entityType,
  phoneNumber,
  sourceIcons,
}) => {
  let SourceIcon: ComponentType<any> = null;
  if (entityType) {
    if (entityType === phoneSources.rcContact) {
      SourceIcon = sourceIcons.brandIcon;
    } else {
      SourceIcon = sourceIcons[entityType];
    }
  }
  if (phoneNumber && entityName !== undefined && SourceIcon) {
    return (
      <>
        <SourceIcon className={styles.typeIcon} width={10} height={10} />
        <span className={styles.typeName}>{entityName}</span>
      </>
    );
  }
  if (entityName !== undefined && SourceIcon) {
    return (
      <>
        <SourceIcon className={styles.typeIcon} width={10} height={10} />
        <span className={styles.typeName}>{entityName}</span>
      </>
    );
  }
  if (entityName !== undefined) {
    return <>{entityName}</>;
  }
  if (phoneNumber) {
    return <>{phoneNumber}</>;
  }
  return null;
};
