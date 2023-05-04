import React from 'react';

import { ConferenceDialerPanel } from '../../components/ConferenceDialerPanel';
import { connectModule } from '../../lib/phoneContext';
import type { ConferenceDialerUIContainerProps } from '../../modules/ConferenceDialerUI/ConferenceDialerUI.interface';

export const ConferenceCallDialerPage = connectModule<
  any,
  ConferenceDialerUIContainerProps
>((phone) => phone.conferenceDialerUI)(ConferenceDialerPanel);

export default ConferenceCallDialerPage;
