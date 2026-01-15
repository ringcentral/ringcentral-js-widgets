import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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

    jest.advanceTimersByTime(1000);
    expect(screen.getByText('00:01')).toBeInTheDocument();

    jest.advanceTimersByTime(1000);
    expect(screen.getByText('00:02')).toBeInTheDocument();
  });

  it('should apply offset correctly', () => {
    render(<DurationCounter startTime={Date.now()} offset={-1000} />);
    expect(screen.getByText('00:01')).toBeInTheDocument();

    jest.advanceTimersByTime(1000);
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
});
