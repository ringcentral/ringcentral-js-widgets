import { fireEvent, render, screen } from '@ringcentral-integration/test-utils';
import React from 'react';
import { noop } from 'rxjs';

import CallItem from '../../components/CallItem';

describe('CallItem', () => {
  const mockCall = {
    direction: 'inbound',
    telephonyStatus: 'Ringing',
    result: 'Call connected',
    startTime: new Date(),
    duration: 120,
    activityMatches: [],
    offset: 0,
    type: 'VoIP',
    toName: 'John Doe',
    from: { phoneNumber: '1234567890' },
    to: { phoneNumber: '1234567894' },
  };

  test('renders call details correctly', () => {
    render(
      <CallItem
        call={mockCall}
        brand="RingCentral"
        currentLocale="en-US"
        areaCode="123"
        countryCode="US"
        active={true}
        onViewContact={noop}
        onCreateContact={noop}
        onLogCall={noop}
        onClickToDial={noop}
        onClickToSms={noop}
        dateTimeFormatter={noop}
      />,
    );

    // expect(screen.getByText('John Doe')).toBeInTheDocument();
    // expect(screen.getByText('inboundCall')).toBeInTheDocument();
    // expect(screen.getByText('Ringing')).toBeInTheDocument();
    // expect(screen.getByText('Call connected')).toBeInTheDocument();
    // expect(screen.getByText('2 minutes')).toBeInTheDocument();
    expect(document.body).toMatchSnapshot();
  });

  test('clicking on call item toggles extended view', () => {
    render(
      <CallItem
        call={mockCall}
        brand="RingCentral"
        currentLocale="en-US"
        areaCode="123"
        countryCode="US"
        active={true}
        onViewContact={noop}
        onCreateContact={noop}
        onLogCall={noop}
        onClickToDial={noop}
        onClickToSms={noop}
        dateTimeFormatter={noop}
      />,
    );

    const callItem = screen.getByTestId('calls_item_root');
    const extendButton = screen.getByTestId('extendButton');
    expect(extendButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(callItem);
    expect(extendButton).toHaveAttribute('aria-expanded', 'true');
  });
});
