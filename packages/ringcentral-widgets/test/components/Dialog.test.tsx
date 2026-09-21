import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Dialog from '../../components/Dialog';

describe('Dialog', () => {
  it('renders confirm and cancel buttons and triggers their handlers', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const { container } = render(
      <Dialog
        currentLocale="en-US"
        title="Test title"
        onConfirm={onConfirm}
        onCancel={onCancel}
      >
        <span>dialog content</span>
      </Dialog>,
    );

    fireEvent.click(container.querySelector('[data-sign="confirm"]')!);
    expect(onConfirm).toHaveBeenCalledTimes(1);

    fireEvent.click(container.querySelector('[data-sign="cancel"]')!);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('renders without footer and children when optional props are omitted', () => {
    const { container } = render(<Dialog currentLocale="en-US" />);

    expect(container.querySelector('[data-sign="confirm"]')).toBeNull();
    expect(container.querySelector('[data-sign="cancel"]')).toBeNull();
  });
});
