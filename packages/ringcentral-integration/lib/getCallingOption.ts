import { callingModes } from '@ringcentral-integration/commons/modules/CallingSettings';

export const getCallingOption = (callingMode: string | null) => {
  switch (callingMode) {
    case callingModes.softphone:
      return 'RingCentral Phone';
    case callingModes.ringout:
      return 'RingOut';
    case callingModes.webphone:
      return 'Browser';
    case callingModes.jupiter:
    case callingModes.jupiterUniversalLink:
      return 'RingCentral App';
    default:
      return null;
  }
};
