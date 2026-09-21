import { Button } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React from 'react';

export interface TimeSlotIdentity {
  originalTime: string;
}

export interface DisplayTimeSlot<T extends TimeSlotIdentity = TimeSlotIdentity> {
  timeSlot: T;
  displayTime: string;
}

export interface TimeSlotsGridProps<
  T extends TimeSlotIdentity = TimeSlotIdentity,
> {
  displayTimeSlots: DisplayTimeSlot<T>[];
  selectedOriginalTimes: string[];
  selectTime: (timeSlot: T) => void;
  isSlotDisabled?: (timeSlot: T) => boolean;
}

function TimeSlotsGridComponent<T extends TimeSlotIdentity>(
  {
    displayTimeSlots,
    selectedOriginalTimes,
    selectTime,
    isSlotDisabled,
  }: TimeSlotsGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className="box-border grid grid-cols-3 sm:grid-cols-4 gap-3"
      data-sign="time-slots-grid"
    >
      {displayTimeSlots.map(({ timeSlot, displayTime }, index) => {
        const isTimeSelected = selectedOriginalTimes.includes(
          timeSlot.originalTime,
        );
        const disabled = Boolean(isSlotDisabled?.(timeSlot));

        return (
          <div
            key={timeSlot.originalTime}
            className="w-full"
            data-selected-time-slot={isTimeSelected ? 'true' : undefined}
          >
            <Button
              variant={isTimeSelected ? 'contained' : 'outlined'}
              color={isTimeSelected ? 'primary' : 'secondary'}
              size="small"
              aria-pressed={isTimeSelected}
              disabled={disabled}
              className={clsx(
                'h-8 w-full !min-w-0 !rounded-[10px] !typography-mainText transition-colors text-[13px]',
                isTimeSelected
                  ? '!border-primary-b !bg-primary-b !text-neutral-high-contrast-b0'
                  : clsx(
                      '!border-neutral-b0-t20 !bg-neutral-base !text-neutral-b0',
                      disabled
                        ? 'cursor-not-allowed !bg-neutral-b5 !text-neutral-b0-t50 hover:!bg-neutral-b5'
                        : 'hover:!bg-neutral-b5',
                    ),
              )}
              onClick={() => selectTime(timeSlot)}
              data-sign={`time-slot-${index}`}
            >
              <div
                className={clsx(
                  'w-full text-center text-[13px]',
                  isTimeSelected
                    ? 'text-neutral-high-contrast-b0'
                    : 'text-neutral-b0',
                )}
              >
                {displayTime}
              </div>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export const TimeSlotsGrid = React.forwardRef(TimeSlotsGridComponent) as <
  T extends TimeSlotIdentity
>(
  props: TimeSlotsGridProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;

(TimeSlotsGrid as React.FC).displayName = 'TimeSlotsGrid';
