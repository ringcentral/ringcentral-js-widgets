import { callingModes } from './callingModes';
import type { CallingOptionsType } from './callingOptions';
import { callingOptions } from './callingOptions';

export function mapOptionToMode(callWith: CallingOptionsType) {
  switch (callWith) {
    case callingOptions.softphone:
      return callingModes.softphone;
    case callingOptions.ringout:
      return callingModes.ringout;
    case callingOptions.browser:
      return callingModes.webphone;
    case callingOptions.jupiter:
      return callingModes.jupiter;
    default:
      return null;
  }
}
