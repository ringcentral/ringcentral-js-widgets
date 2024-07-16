// @ts-nocheck
// TODO: fix type
import presenceBody from '../platform/data/presence.json';
import type {
  DetailedExtensionPresenceEventBody,
  DetailedExtensionPresenceWithSIPEventBody,
} from '../platform/interfaces';
import type { DetailedExtensionPresenceWithSIPEvent } from '../platform/interfaces/DetailedExtensionPresenceWithSIPEvent';

export interface IGenerateTelephonyState {
  hasActiveCall: boolean;
  direction?: string | null;
  phoneNumber?: string | null;
  eventData?: DetailedExtensionPresenceWithSIPEvent | null;
}

export const generateTelephonyState = ({
  hasActiveCall = false,
  direction = null,
  phoneNumber = null,
  eventData = null,
}: IGenerateTelephonyState) => {
  let event:
    | DetailedExtensionPresenceEventBody
    | DetailedExtensionPresenceWithSIPEventBody;
  if (!hasActiveCall) {
    event = presenceBody;
  } else {
    event = {
      ...eventData,
      event:
        '/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true&totalActiveCalls',
      timestamp: new Date().toISOString(),
      body: {
        ...eventData.body,
        activeCalls: [
          {
            ...eventData.body.activeCalls[0],
            [direction === 'Inbound' ? 'from' : 'to']: phoneNumber,
            direction,
            telephonyStatus: 'Ringing',
          },
        ],
        telephonyStatus: 'Ringing',
        sequence: 2698,
        presenceStatus: 'Busy',
        userStatus: 'Available',
        dndStatus: 'TakeAllCalls',
        allowSeeMyPresence: true,
        ringOnMonitoredCall: false,
        pickUpCallsOnHold: false,
        totalActiveCalls: 1,
      },
    };
  }
  return event;
};
