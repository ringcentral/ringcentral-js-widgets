import { trackEvents as defaultTrackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const trackEvents = ObjectMap.fromObject({
  ...defaultTrackEvents,
  cprLogsDownloaded: 'CPR_Logs_Downloaded',
  cprSubmitted: 'CPR_Submitted',
  supportCaseCreated: 'Support_Case_Created',
} as const);
