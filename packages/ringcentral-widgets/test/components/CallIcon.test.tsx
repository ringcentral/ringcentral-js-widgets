import { render, screen } from '@ringcentral-integration/test-utils';
import '@testing-library/jest-dom';
import React from 'react';

import { CallIcon } from '../../components/CallHistoryPanel/CallIcon/CallIcon';

describe('CallIcon', () => {
  it('uses the direction as title when no title is provided', () => {
    render(<CallIcon direction="Inbound" active />);

    expect(screen.getByTestId('callIcon')).toHaveAttribute('title', 'Inbound');
  });

  it('prefers the explicit title over the direction', () => {
    render(<CallIcon direction="Inbound" title="Missed call" missed />);

    expect(screen.getByTestId('callIcon')).toHaveAttribute(
      'title',
      'Missed call',
    );
  });
});
