export const MeetingType = {
  SCHEDULED: 'Scheduled',
  RECURRING: 'Recurring',
  SCHEDULED_RECURRING: 'ScheduledRecurring',
  INSTANT: 'Instant',
  PMI: 'PMI',
} as const;

export type MeetingTypeV = typeof MeetingType[keyof typeof MeetingType];
