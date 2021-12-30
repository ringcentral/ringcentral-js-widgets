import React from 'react';

import EvAuthAlert from './EvAuthAlert';
import EvCallAlert from './EvCallAlert';
import EvCallDispositionAlert from './EvCallDispositionAlert';
import EvCallInfoAlert from './EvCallInfoAlert';
import EvIntegratedSoftphoneAlert from './EvIntegratedSoftphoneAlert';
import EvRequeueCallAlert from './EvRequeueCallAlert';
import EvSessionConfigAlert from './EvSessionConfigAlert';
import EvTransferCallAlert from './EvTransferCallAlert';
import EvWorkingStateAlert from './EvWorkingStateAlert';

export function getAlertRenderer() {
  return (message) => {
    if (EvAuthAlert.handleMessage(message)) {
      return (props) => <EvAuthAlert {...props} />;
    }
    if (EvCallAlert.handleMessage(message)) {
      return (props) => <EvCallAlert {...props} />;
    }
    if (EvWorkingStateAlert.handleMessage(message)) {
      return (props) => <EvWorkingStateAlert {...props} />;
    }
    if (EvSessionConfigAlert.handleMessage(message)) {
      return (props) => <EvSessionConfigAlert {...props} />;
    }
    if (EvCallDispositionAlert.handleMessage(message)) {
      return (props) => <EvCallDispositionAlert {...props} />;
    }
    if (EvRequeueCallAlert.handleMessage(message)) {
      return (props) => <EvRequeueCallAlert {...props} />;
    }
    if (EvTransferCallAlert.handleMessage(message)) {
      return (props) => <EvTransferCallAlert {...props} />;
    }
    if (EvIntegratedSoftphoneAlert.handleMessage(message)) {
      return (props) => <EvIntegratedSoftphoneAlert {...props} />;
    }
    if (EvCallInfoAlert.handleMessage(message)) {
      return (props) => <EvCallInfoAlert {...props} />;
    }

    /**
     * here should return null for AlertUI using.
     * ringcentral-js-widgets/ringcentral-widgets/modules/AlertUI/AlertUI.tsx:32
     */

    return null;
  };
}
