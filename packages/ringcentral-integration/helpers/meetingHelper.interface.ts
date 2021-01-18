const MeetingType = {
  SCHEDULED: 'Scheduled',
  RECURRING: 'Recurring',
  SCHEDULED_RECURRING: 'ScheduledRecurring',
  INSTANT: 'Instant',
  PMI: 'PMI',
} as const;

type MeetingTypeV = typeof MeetingType[keyof typeof MeetingType];

// TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
export { MeetingType, MeetingTypeV };
