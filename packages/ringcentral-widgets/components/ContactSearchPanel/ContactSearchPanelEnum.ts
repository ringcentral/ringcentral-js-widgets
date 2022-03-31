import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const TabsEnum = ObjectMap.fromKeys([
  'personal',
  'company',
  'thirdParty',
]);

export type TabsEnumType = keyof typeof TabsEnum;

export const HintsType = ObjectMap.fromKeys([
  'thirdPartyRecordsTitle',
  'thirdPartyNoRecordsTitle',
  'thirdPartyNoRecordsContent',
  'personalNoRecordsTitle',
  'personalNoRecordsContent',
  'noFilterOrSearchRecordsTitle',
  'noFilterOrSearchRecordsContent',
  'searchBarContent',
]);