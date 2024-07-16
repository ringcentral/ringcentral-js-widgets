import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import LogNotification from '../../components/LogNotificationV2';

describe('LogNotification', () => {
  it('should render discard button', () => {
    const onDiscardMock = jest.fn();
    const onExpandMock = jest.fn();
    const currentLocale = 'en-US';
    const showLogButton = true;
    const isExpand = true;

    const { getByRole } = render(
      <LogNotification
        currentLog={{
          call: { direction: 'inbound', from: { phoneNumber: '1234567890' } },
          logName: 'Test Name',
        }}
        currentLocale={currentLocale}
        showLogButton={showLogButton}
        formatPhone={(phoneNumber) => phoneNumber}
        isExpand={isExpand}
        onExpand={onExpandMock}
        onDiscard={onDiscardMock}
        showLogOptions={false}
      />,
    );

    const discardButton = getByRole('button');
    fireEvent.click(discardButton);

    expect(onDiscardMock).toHaveBeenCalled();
  });
});
