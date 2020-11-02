import { RcThemeProvider } from '@ringcentral/juno';
import { mount } from 'enzyme';
import React from 'react';

import { DialoutStatusesType } from '../../../enums/dialoutStatus';
import { DialerPanel } from '../DialerPanel';

const currentLocale = 'en-US';
const size = 'medium';

export function createDialerPanel({
  toNumber = '',
  setToNumber = () => {},
  dialout = () => {},
  hasDialer = true,
  dialoutStatus = 'idle' as DialoutStatusesType,
  goToManualDialSettings = () => {},
  hangup = () => {},
  checkOnCall = () => {},
  dialButtonDisabled = false,
} = {}) {
  return mount(
    <RcThemeProvider>
      <DialerPanel
        currentLocale={currentLocale}
        dialout={dialout}
        toNumber={toNumber}
        size={size}
        dialButtonDisabled={dialButtonDisabled}
        hasDialer={hasDialer}
        setToNumber={setToNumber}
        goToManualDialSettings={goToManualDialSettings}
        dialoutStatus={dialoutStatus}
        hangup={hangup}
        checkOnCall={checkOnCall}
      />
    </RcThemeProvider>,
  );
}
