import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

import { useEffectOnDocumentFocus } from '../../src';

const TestComponent = ({ onFocus }: any) => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  useEffectOnDocumentFocus(() => {
    onFocus();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        increase
      </button>
      <button
        onClick={() => {
          setCount2(count + 1);
        }}
      >
        other state
      </button>
      Test Component
    </div>
  );
};

describe('useEffectOnDocumentFocus', () => {
  it('should call effect when document is focused and deps change', () => {
    const onFocusMock = jest.fn();

    // Simulate document focus
    Object.defineProperty(document, 'hasFocus', {
      value: jest.fn(() => true),
      writable: true,
    });

    render(<TestComponent onFocus={onFocusMock} />);

    // Assert that the effect has been called
    expect(onFocusMock).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByText('increase'));

    expect(onFocusMock).toHaveBeenCalledTimes(2);

    // when other state change
    userEvent.click(screen.getByText('other state'));
    // should still be 2
    expect(onFocusMock).toHaveBeenCalledTimes(2);

    // Simulate document focus
    Object.defineProperty(document, 'hasFocus', {
      value: jest.fn(() => false),
      writable: true,
    });

    // change value again, but not focused
    userEvent.click(screen.getByText('increase'));
    // still be same
    expect(onFocusMock).toHaveBeenCalledTimes(2);
  });

  it('should not call effect when document is not focused', () => {
    const onFocusMock = jest.fn();

    // Simulate document not focused
    Object.defineProperty(document, 'hasFocus', {
      value: jest.fn(() => false),
      writable: true,
    });

    render(<TestComponent onFocus={onFocusMock} />);

    // Assert that the effect has not been called
    expect(onFocusMock).toHaveBeenCalledTimes(0);
  });
});
