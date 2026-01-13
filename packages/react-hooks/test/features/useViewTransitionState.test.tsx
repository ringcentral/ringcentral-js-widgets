import { render, act } from '@testing-library/react';
import React, { useState } from 'react';

import { useViewTransitionState } from '../../src';

// Adjust the import path accordingly

// Mocking the global document.startViewTransition
beforeEach(() => {
  // @ts-ignore
  global.document.startViewTransition = jest.fn((callback) => {
    callback?.(); // Call the callback immediately for testing
  });
});

afterEach(() => {
  // @ts-ignore
  delete global.document.startViewTransition; // Clean up after tests
});

// A simple component to test the hook
const TestComponent = ({ initialState }: { initialState: number }) => {
  const [state, setState] = useState(initialState);
  const viewTransitionState = useViewTransitionState(state, (current) => {
    console.log('Transitioning from:', current);
  });

  return (
    <div>
      <span data-sign="state">{viewTransitionState}</span>
      <button onClick={() => setState((prev) => prev + 1)}>Increment</button>
    </div>
  );
};

describe('useViewTransitionState', () => {
  it('should transition state correctly', () => {
    const { getByTestId, getByText } = render(
      <TestComponent initialState={0} />,
    );

    // Check initial state
    expect(getByTestId('state')).toHaveTextContent('0');

    // Simulate a state change
    act(() => {
      getByText('Increment').click();
    });

    // Check that the state has transitioned correctly
    expect(getByTestId('state')).toHaveTextContent('1');

    // Verify that startViewTransition was called
    expect(global.document.startViewTransition).toHaveBeenCalledTimes(1);
  });

  it('should not call startViewTransition if not supported', () => {
    // Temporarily remove startViewTransition for this test
    const originalStartViewTransition = global.document.startViewTransition;
    // @ts-ignore
    delete global.document.startViewTransition; // Clean up after tests

    const { getByTestId, getByText } = render(
      <TestComponent initialState={0} />,
    );

    // Check initial state
    expect(getByTestId('state')).toHaveTextContent('0');

    // Simulate a state change
    act(() => {
      getByText('Increment').click();
    });

    // Check that the state has transitioned correctly without view transition
    expect(getByTestId('state')).toHaveTextContent('1');

    // Verify that startViewTransition was not called
    expect(originalStartViewTransition).not.toHaveBeenCalled();
  });
});
