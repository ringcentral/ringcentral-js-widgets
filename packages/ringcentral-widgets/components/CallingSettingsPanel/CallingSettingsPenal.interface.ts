import { RingtoneBaseProps } from '../Ringtone/Ringtone.interface';

export interface SaveFunctionProps {
  callWith: string;
  myLocation: string;
  ringoutPrompt: boolean;
  incomingAudio?: string;
  incomingAudioFile?: string;
  outgoingAudio?: string;
  outgoingAudioFile?: string;
}

export interface CallingSettingsUIProps extends RingtoneBaseProps {
  availableNumbers: any;
  brand: string;
  callWith: string;
  callWithOptions: string[];
  currentLocale: string;
  defaultRingoutPrompt?: boolean;
  disabled?: boolean;
  locationSearchable?: boolean;
  myLocation: string;
  ringoutPrompt: boolean;
}

export interface CallingSettingsUIFunctions {
  onSave: (options: SaveFunctionProps) => void;
}

export interface CallingSettingsProps
  extends CallingSettingsUIProps,
    CallingSettingsUIFunctions {}
export interface CallingSettingsPanelUIProps extends CallingSettingsUIProps {
  showSpinner?: boolean;
  className?: string;
}
export interface CallingSettingsPanelUIFunctions
  extends CallingSettingsUIFunctions {
  onBackButtonClick: () => void;
}
export interface CallingSettingsPanelProps
  extends CallingSettingsPanelUIProps,
    CallingSettingsPanelUIFunctions {}
