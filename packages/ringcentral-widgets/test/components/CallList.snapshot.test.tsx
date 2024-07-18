import { render } from '@ringcentral-integration/test-utils';
import React from 'react';

import CallList from '../../components/CallList';

describe('CallList', () => {
  const calls = [
    {
      id: 1,

      from: { phoneNumber: '1234567890' },
      to: { phoneNumber: '1234567894' },
    },
    {
      id: 2,

      from: { phoneNumber: '1234567890' },
      to: { phoneNumber: '1234567894' },
    },
    // Add more calls if needed
  ];

  it('renders CallItem for each call', () => {
    const { getAllByTestId } = render(
      <CallList
        brand="Your Brand"
        currentLocale="en-US"
        calls={calls}
        areaCode="123"
        countryCode="US"
        dateTimeFormatter={(d) => d.toString()}
      />,
    );
    expect(document.body).toMatchSnapshot();
  });

  it('renders NoCalls component when calls array is empty', () => {
    const { getByText } = render(
      <CallList
        brand="Your Brand"
        currentLocale="en-US"
        calls={[]}
        areaCode="123"
        countryCode="US"
      />,
    );

    const noCallsComponent = getByText('No results found.');
    expect(noCallsComponent).toBeInTheDocument();
  });

  // Add more test cases as needed
});
