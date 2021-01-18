import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const trackEvents = ObjectMap.fromObject({
  clickToCall: 'Click To Dial (Contact Details)',
  clickToSMS: 'Click To SMS (Contact Details)',
} as const);
