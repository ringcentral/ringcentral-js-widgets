import { format } from '@ringcentral-integration/utils';

import phoneSourceNames from '../../lib/phoneSourceNames';

type displayFormatterParams = {
  entityName?: string;
  entityType?: string;
  phoneNumber?: string;
  currentLocale?: string;
  brand?: string;
  phoneSourceNameRenderer?: (entityType: string) => string;
};

export const displayFormatter = ({
  entityName,
  entityType,
  phoneNumber,
  currentLocale,
  brand,
  phoneSourceNameRenderer,
}: displayFormatterParams) => {
  let typeName;
  if (entityType) {
    typeName = phoneSourceNameRenderer
      ? phoneSourceNameRenderer(entityType)
      : format(phoneSourceNames.getString(entityType, currentLocale), {
          brand,
        });
  }
  if (phoneNumber && entityName && entityType) {
    return `${entityName} | ${typeName} ${phoneNumber}`;
  }
  if (entityName && entityType) {
    return `${entityName} | ${typeName}`;
  }
  if (entityName) {
    return entityName;
  }
  if (phoneNumber) {
    return `${phoneNumber}`;
  }
  return '';
};
