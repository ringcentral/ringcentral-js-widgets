import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { DurationCounter } from '../../components/DurationCounter';

describe('DurationCounter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-01-01T00:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render correctly with initial duration', () => {
    render(<DurationCounter startTime={Date.now()} />);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('should update duration every second', () => {
    render(<DurationCounter startTime={Date.now()} />);
    expect(screen.getByText('00:00')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:01')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:02')).toBeInTheDocument();
  });

  it('should apply offset correctly', () => {
    render(<DurationCounter startTime={Date.now()} offset={-1000} />);
    expect(screen.getByText('00:01')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:02')).toBeInTheDocument();
  });

  it('should handle undefined startTime', () => {
    render(<DurationCounter startTime={undefined} />);
    expect(screen.getByText('--:--')).toBeInTheDocument();
  });

  it('should force update when startTime changes', () => {
    const { rerender } = render(<DurationCounter startTime={Date.now()} />);
    expect(screen.getByText('00:00')).toBeInTheDocument();

    rerender(<DurationCounter startTime={Date.now() - 2000} />);
    expect(screen.queryByText('00:00')).not.toBeInTheDocument();
    expect(screen.queryByText('00:02')).toBeInTheDocument();
  });

  it('should handle inaccurate system time (system clock behind start time) when compensateSystemTime is true', () => {
    // Start time is 5 seconds in the future relative to system time
    const startTime = Date.now() + 5000;

    render(
      <DurationCounter startTime={startTime} compensateSystemTime={true} />,
    );
    // Since compensateSystemTime is true and duration would be -5, it is corrected to 00:00
    expect(screen.getByText('00:00')).toBeInTheDocument();

    // Advance 1 second -> raw duration -4, compensated to 1s
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:01')).toBeInTheDocument();

    // Advance another 1 second -> raw duration -3, compensated to 2s
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:02')).toBeInTheDocument();
  });

  it('should not compensate for inaccurate system time when compensateSystemTime is false', () => {
    // Start time is 5 seconds in the future relative to system time
    const startTime = Date.now() + 5000;

    render(
      <DurationCounter startTime={startTime} compensateSystemTime={false} />,
    );
    // When compensateSystemTime is false, it does not correct the negative value,
    // so it should not display "00:00"
    expect(screen.queryByText('00:00')).not.toBeInTheDocument();
  });
});
