import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const extensionStatusTypes = ObjectMap.fromObject({
  enabled: 'Enabled',
  notActivated: 'NotActivated',
  disabled: 'Disabled',
} as const);
