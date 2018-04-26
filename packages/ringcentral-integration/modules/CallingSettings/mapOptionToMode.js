import callingOptions from './callingOptions';
import callingModes from './callingModes';

export default function mapOptionToMode(callWith) {
  switch (callWith) {
    case callingOptions.softphone:
      return callingModes.softphone;

    case callingOptions.myphone:
    case callingOptions.otherphone:
    case callingOptions.customphone:
      return callingModes.ringout;
    case callingOptions.browser:
      return callingModes.webphone;
    default:
      return callingModes.softphone;
  }
}
