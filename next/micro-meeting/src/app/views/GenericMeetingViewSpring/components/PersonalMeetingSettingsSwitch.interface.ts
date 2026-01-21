export interface PersonalMeetingSettingsSwitchProps {
  isPersonalMeetingEnabled: boolean;
  personalMeetingLink: string;
  disabled: boolean;
}

export interface PersonalMeetingSettingsSwitchFunctions {
  onPersonalMeetingToggle: (enabled: boolean) => void;
  viewPersonalMeetingSettings: () => void;
}
