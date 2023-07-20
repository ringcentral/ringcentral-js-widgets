import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { entityTypes } from './entityTypes';

export const phoneSources = ObjectMap.fromKeys([
  ...ObjectMap.keys(entityTypes),
  'rcContact',
]);

export type PhoneSource = ObjectMapValue<typeof phoneSources>;
export type PhoneSources = Record<PhoneSource, string>;
