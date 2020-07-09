import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const phoneSources = ObjectMap.fromKeys([
  'account',
  'contact',
  'lead',
  'opportunity',
  'systemUser',
  'rcContact',
]);

export default phoneSources;
