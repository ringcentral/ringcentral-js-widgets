import { ReactNode, MutableRefObject } from 'react';
import { RingtoneBaseProps } from '../Ringtone/Ringtone.interface';

export interface SaveFunctionProps {
  callWith: string;
  myLocation: string;
  ringoutPrompt: boolean;
  isCustomLocation: boolean;
  incomingAudio?: string;
  incomingAudioFile?: string;
  outgoingAudio?: string;
  outgoingAudioFile?: string;
}

export interface CallingSettingsProps extends RingtoneBaseProps {
  brandCode: string;
  brandName: string;
  shortBrandName: string;
  fullBrandName: string;
  availableNumbersWithLabel: { label: string; value: string }[];
  callWith: string;
  callWithOptions: string[];
  currentLocale: string;
  defaultRingoutPrompt?: boolean;
  disabled?: boolean;
  locationSearchable?: boolean;
  myLocation: string;
  ringoutPrompt: boolean;
  onSave: (options: SaveFunctionProps) => void;
}
export interface CallingSettingsPanelProps extends CallingSettingsProps {
  showSpinner?: boolean;
  className?: string;
  onBackButtonClick: () => void;
  onSave: (options: SaveFunctionProps) => void;
}

export interface GetOptionNameProps {
  brandCode: string;
  brandName: string;
  shortBrandName: string;
  fullBrandName: string;
  currentLocale?: string;
}

export interface GetCallingOptionProps extends GetOptionNameProps {
  callingOption: string;
}

export interface CallWithProps extends GetOptionNameProps {
  callWithOptions: string[];
  disabled: boolean;
  callWith: string;
  onCallWithChange: (newCallWith: string) => void;
}
export interface TooltipProps extends GetOptionNameProps {
  callWith: string;
  tooltipContainerRef: MutableRefObject<ReactNode>;
}
