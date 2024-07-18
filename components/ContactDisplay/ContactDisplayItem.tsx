import { phoneSources } from '@ringcentral-integration/commons/enums/phoneSources';
import type { ComponentType } from 'react';
import React from 'react';

import styles from './styles.scss';

export type ContactDisplayItemProps = {
  entityName?: string;
  entityType?: string;
  phoneNumber?: string;
  sourceIcons?: {
    // @ts-expect-error TS(2411): Property 'brandIcon' of type 'ComponentType<any> |... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'ComponentTy... Remove this comment to see the full error message
  let SourceIcon: ComponentType<any> = null;
  if (entityType) {
    if (entityType === phoneSources.rcContact) {
      // @ts-expect-error TS(2322): Type 'ComponentType<any> | undefined' is not assig... Remove this comment to see the full error message
      SourceIcon = sourceIcons.brandIcon;
    } else {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
