import { EvSoftphoneEvents, tabManagerEvents } from '../../../../enums';
import { EvCallbackTypes } from '../../../../lib/EvClient/enums';

export default {
  [EvSoftphoneEvents.AUDIO_STREAM_REJECTED]:
    'We need your audio permission for browser using your device, please allow permission in browser setting',
  [EvCallbackTypes.SIP_REGISTRATION_FAILED]:
    'Integrated softphone registration failed, please try later.',
  [EvSoftphoneEvents.CALL_REJECTED]:
    'The inbound call ended during routing. Please prepare for subsequent calls.',
  [tabManagerEvents.SIP_CONNECTING]: 'Integrated Softphone connecting...',
  [tabManagerEvents.SIP_RECONNECTING_WHEN_CALL_CONNECTED]: 'Try to reconnect Integrated Softphone...',
  [tabManagerEvents.ASK_AUDIO_PERMISSION]: 'Wait for accept audio permission.',

  // Attempt to dequeue call to agent failed! Outdial to destination [16503990023*106] failed after [2] seconds with disposition [INTERCEPT]
};
