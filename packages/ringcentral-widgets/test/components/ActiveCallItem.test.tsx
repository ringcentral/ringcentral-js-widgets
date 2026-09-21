import { render } from '@ringcentral-integration/test-utils';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import React from 'react';

import ActiveCallItem from '../../components/ActiveCallItem';

const getCall = (overrides: any = {}) => ({
  direction: 'Outbound',
  telephonyStatus: 'CallConnected',
  startTime: Date.now(),
  activityMatches: [],
  fromMatches: [],
  toMatches: [],
  from: { phoneNumber: '+16501234567', name: 'Me' },
  to: { phoneNumber: '+16507654321', name: 'Alice' },
  ...overrides,
});

const getProps = (overrides: any = {}) => ({
  call: getCall(),
  areaCode: '',
  countryCode: 'US',
  currentLocale: 'en-US',
  formatPhone: jest.fn((phoneNumber: string) => phoneNumber),
  ...overrides,
});

describe('ActiveCallItem', () => {
  it('toggles the action menu when clicking the call item', () => {
    const props = getProps();
    const { container } = render(<ActiveCallItem {...props} />);

    fireEvent.click(container.firstChild as Element);

    expect(
      container.querySelector('[data-sign="clickToSms"]'),
    ).toBeInTheDocument();
  });

  it('falls back to the callee extension number for outbound click-to-sms', () => {
    const onClickToSms = jest.fn();
    const props = getProps({
      call: getCall({
        to: { extensionNumber: '101', name: 'Bob' },
      }),
      internalSmsPermission: true,
      onClickToSms,
    });
    const { container } = render(<ActiveCallItem {...props} />);

    fireEvent.click(container.firstChild as Element);
    fireEvent.click(container.querySelector('[data-sign="clickToSms"]')!);

    expect(onClickToSms).toHaveBeenCalledWith(
      expect.objectContaining({ phoneNumber: '101' }),
      true,
    );
  });

  it('falls back to the caller extension number for own number display', () => {
    const formatPhone = jest.fn((phoneNumber: string) => phoneNumber);
    const props = getProps({
      call: getCall({
        from: { extensionNumber: '202', name: 'Me' },
        webphoneSession: {
          id: 'session-1',
          direction: 'Outbound',
          callStatus: 'webphone-session-connected',
        },
      }),
      formatPhone,
    });
    render(<ActiveCallItem {...props} />);

    expect(formatPhone).toHaveBeenCalledWith('202');
  });
});
