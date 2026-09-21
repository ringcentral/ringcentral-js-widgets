import { render, screen } from '@testing-library/react';
import React from 'react';

import { FormattedMessage } from './FormattedMessage';

describe('FormattedMessage', () => {
  it('renders formatted nodes and children inside the configured tag', () => {
    render(
      <FormattedMessage
        message="Texting from {phoneNumber} moved."
        values={{
          phoneNumber: <strong>+15550001111</strong>,
        }}
        tagName="p"
      >
        <button type="button">Reply in Shared tab</button>
      </FormattedMessage>,
    );

    expect(screen.getByText('+15550001111')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Reply in Shared tab');
    expect(screen.getByRole('button').closest('p')).toBeInTheDocument();
  });
});
