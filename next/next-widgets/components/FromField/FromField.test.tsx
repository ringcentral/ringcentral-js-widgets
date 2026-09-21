import { render, screen } from '@testing-library/react';
import React from 'react';

import { FromField } from './FromField';

jest.mock('@ringcentral-integration/micro-auth/src/app/components', () => {
  const React = require('react');

  return {
    FormattedPhoneNumber: ({ phoneNumber }: { phoneNumber: string }) =>
      React.createElement('span', null, phoneNumber),
  };
});

jest.mock('@ringcentral/spring-ui', () => {
  const React = require('react');

  return {
    Icon: () => null,
    Option: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', null, children),
    Select: ({
      children,
      renderValue,
      value,
    }: {
      children: React.ReactNode;
      renderValue: (value: string) => React.ReactNode;
      value: string;
    }) =>
      React.createElement(
        'div',
        null,
        React.createElement('div', null, renderValue(value)),
        children,
      ),
    Tooltip: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('FromField', () => {
  it('uses the explicit display label for the selected value and menu option', () => {
    render(
      <FromField
        hidden={false}
        showAnonymous={false}
        fromNumber="+15550001111"
        fromNumbers={[
          {
            phoneNumber: '+15550001111',
            usageType: 'DirectNumber',
            displayLabel: 'Support Queue',
            extension: {
              uri: 'extension/queue-1',
              id: 1,
              extensionNumber: '101',
              name: 'Site name',
              type: 'Site',
            },
          },
        ]}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getAllByText('Support Queue')).toHaveLength(2);
    expect(screen.queryByText('Site name')).not.toBeInTheDocument();
  });
});
