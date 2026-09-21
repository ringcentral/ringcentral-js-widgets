import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
import { callControlAlerts } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import React from 'react';

import { AlertRenderer } from '../../components/AlertRenderer/AlertRenderer';
import CallControlAlert from '../../components/AlertRenderer/CallControlAlert';
import CallLogAlert from '../../components/AlertRenderer/CallLogAlert';

const getRenderer = () =>
  AlertRenderer({
    alert: { dismiss: jest.fn() },
    brand: { appName: 'RingCentral' },
    rateLimiter: {},
    softphone: {},
    routerInteraction: { push: jest.fn() },
  });

describe('AlertRenderer', () => {
  it('renders call log alert messages with CallLogAlert', () => {
    const renderer = getRenderer();

    expect(renderer({ message: callLogMessages.logFailed })).toBe(CallLogAlert);
  });

  it('renders call control alert messages with CallControlAlert', () => {
    const renderer = getRenderer();

    expect(renderer({ message: callControlAlerts.callsMerged })).toBe(
      CallControlAlert,
    );
  });
});
