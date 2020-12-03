import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const videoProviders = ObjectMap.fromKeys([
  'RCMeetings',
  'RCVideo',
  'None',
]);

export const meetingProviderTypes = {
  meeting: 'RCMeetings',
  video: 'RCVideo',
  none: 'None',
} as const;

export type meetingProviderTypesProps = typeof meetingProviderTypes;
