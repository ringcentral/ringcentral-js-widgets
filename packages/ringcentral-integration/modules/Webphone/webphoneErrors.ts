import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const webphoneErrors = ObjectMap.prefixKeys(
  [
    'connectFailed',
    'connected',
    'browserNotSupported',
    'webphoneCountOverLimit',
    'webphoneForbidden',
    'noOutboundCallWithoutDL',
    'toVoiceMailError',
    'checkDLError',
    'forwardError',
    'muteError',
    'holdError',
    'flipError',
    'recordError',
    'pauseRecordError',
    'recordDisabled',
    'transferError',
    'requestTimeout',
    'serverTimeout',
    'internalServerError',
    'sipProvisionError',
    'unknownError',
    'provisionUpdate',
    'serverConnecting',
  ],
  'webphone',
);

export default webphoneErrors;
