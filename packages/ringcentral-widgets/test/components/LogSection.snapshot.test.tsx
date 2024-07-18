import { render, screen } from '@ringcentral-integration/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';

import LogSection from '../../components/LogSection';

describe('LogSection', () => {
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
  it('renders LogBasicInfo component', () => {
    render(<LogSection currentLog={{ call: mockCall, currentLogCall: {} }} />);
    expect(document.body).toMatchSnapshot();
  });

  // it('renders SaveButton component', () => {
  //   render(<LogSection currentLog={{ call: mockCall, currentLogCall: {} }} />);
  //   expect(screen.getByTestId('save-button')).toBeInTheDocument();
  // });

  // it('calls onSaveCallLog when SaveButton is clicked', () => {
  //   const onSaveCallLog = jest.fn();
  //   render(
  //     <LogSection
  //       currentLog={{ call: mockCall, currentLogCall: {} }}
  //       onSaveCallLog={onSaveCallLog}
  //     />,
  //   );
  //   const saveButton = screen.getByTestId('save-button');
  //   userEvent.click(saveButton);
  //   expect(onSaveCallLog).toHaveBeenCalled();
  // });

  // Add more test cases as needed
});
