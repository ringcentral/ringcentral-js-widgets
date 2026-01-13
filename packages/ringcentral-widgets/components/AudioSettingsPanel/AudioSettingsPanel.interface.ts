import { OmitFunctions } from '@ringcentral-integration/utils/src/typeFunctions/OmitFunctions';

export interface AudioSettingsPanelProps {
  availableInputDevices: OmitFunctions<MediaDeviceInfo>[];
  availableOutputDevices: OmitFunctions<MediaDeviceInfo>[];
  availableRingtoneDevices: OmitFunctions<MediaDeviceInfo>[];
  callVolume: number;
  checkUserMedia: () => Promise<void>;
  checkAudioAvailable: () => void;
  className?: string | null;
  // TODO: use useLocale when available
  currentLocale: string;
  inputDeviceDisabled?: boolean;
  ringtoneSelectDisabled?: boolean;
  inputDeviceId: string;
  ringtoneDeviceId: string;
  isWebRTC: boolean;
  onBackButtonClick: (...args: any) => unknown;
  onSave: (...args: any) => unknown;
  outputDeviceDisabled?: boolean;
  outputDeviceId: string;
  ringtoneVolume: number;
  showCallVolume?: boolean;
  showRingToneVolume?: boolean;
  supportDevices: boolean;
  userMedia: boolean;
  hasUserMedia: boolean;
  isAGCEnabled: boolean;
  showAGCEnabled: boolean;
}
