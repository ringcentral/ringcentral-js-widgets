export interface MeetingConfigPanelProps {
  // Meeting Configuration
  meetingTitle: string;
  meetingDate: Date;
  meetingTime: Date;
  meetingDuration: {
    hours: string;
    minutes: string;
  };

  // Options
  hourOptions: Array<{ label: string; value: string }>;
  minuteOptions: Array<{ label: string; value: string }>;

  // UI State
  disabled: boolean;
  isLoading?: boolean;
}

export interface MeetingConfigPanelFunctions {
  onMeetingTitleChange: (title: string) => void;
  onMeetingDateChange: (date: Date) => void;
  onMeetingTimeChange: (time: Date) => void;
  onMeetingDurationChange: (duration: {
    hours: string;
    minutes: string;
  }) => void;
  onScheduleMeeting: () => Promise<any>;
}
