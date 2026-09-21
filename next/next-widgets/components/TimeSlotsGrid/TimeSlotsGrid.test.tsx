import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { TimeSlotsGrid } from './TimeSlotsGrid';

describe('TimeSlotsGrid', () => {
  const morning = {
    date: '2026-05-04',
    originalTime: '2026-05-04T09:00:00.000Z',
  };
  const noon = {
    date: '2026-05-04',
    originalTime: '2026-05-04T09:30:00.000Z',
  };
  const afternoon = {
    date: '2026-05-04',
    originalTime: '2026-05-04T10:00:00.000Z',
  };

  it('highlights the selected slot and passes the original slot on click', () => {
    const selectTime = jest.fn();

    render(
      <TimeSlotsGrid
        displayTimeSlots={[
          { timeSlot: morning, displayTime: '09:00' },
          { timeSlot: noon, displayTime: '09:30' },
        ]}
        selectedOriginalTimes={[morning.originalTime]}
        selectTime={selectTime}
      />,
    );

    const selectedSlot = screen.getByTestId('time-slot-0');
    expect(selectedSlot).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByText('09:00').closest('[data-selected-time-slot]'),
    ).toHaveAttribute('data-selected-time-slot', 'true');

    fireEvent.click(screen.getByText('09:30'));

    expect(selectTime).toHaveBeenCalledWith(noon);
  });

  it('supports multiple selected times and disables remaining slots', () => {
    const selectTime = jest.fn();

    render(
      <TimeSlotsGrid
        displayTimeSlots={[
          { timeSlot: morning, displayTime: '09:00' },
          { timeSlot: noon, displayTime: '09:30' },
          { timeSlot: afternoon, displayTime: '10:00' },
        ]}
        selectedOriginalTimes={[morning.originalTime, noon.originalTime]}
        selectTime={selectTime}
        isSlotDisabled={(timeSlot) =>
          timeSlot.originalTime === afternoon.originalTime
        }
      />,
    );

    expect(screen.getByTestId('time-slot-0')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('time-slot-1')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('time-slot-2')).toBeDisabled();
    expect(screen.getByTestId('time-slot-2')).toHaveClass(
      '!bg-neutral-b5',
      '!text-neutral-b0-t50',
      'cursor-not-allowed',
    );

    fireEvent.click(screen.getByText('10:00'));

    expect(selectTime).not.toHaveBeenCalled();
  });
});
