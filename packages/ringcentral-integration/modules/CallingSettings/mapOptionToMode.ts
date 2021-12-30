import callingModes from './callingModes';
import callingOptions from './callingOptions';

export default function mapOptionToMode(callWith) {
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
      return callingModes.softphone;
  }
}
