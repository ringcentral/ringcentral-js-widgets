import type {
  AudioInfo,
  RingtoneItem,
} from '@ringcentral-integration/commons/modules/RingtoneConfiguration';
import type { AUDIO_TYPE } from '@ringcentral-integration/commons/modules/VolumeInspector';
import type { OmitFunctions } from '@ringcentral-integration/utils/src/typeFunctions/OmitFunctions';

export interface AudioSettingsPanelProps {
  isAGCEnabled: boolean;
  hasUserMedia: boolean;
  showAGCEnabled: boolean;
  availableInputDevices: OmitFunctions<MediaDeviceInfo>[];
  availableOutputDevices: OmitFunctions<MediaDeviceInfo>[];
  availableRingtoneDevices: OmitFunctions<MediaDeviceInfo>[];
  checkUserMedia: () => Promise<void>;
  showAlert: () => void;
  className?: string | null;
  inputDeviceDisabled?: boolean;
  ringtoneSelectDisabled?: boolean;
  inputDeviceId: string;
  isWebRTC: boolean;
  onBackButtonClick: (...args: any) => unknown;
  onSave: (...args: any) => unknown;
  outputDeviceDisabled?: boolean;
  outputDeviceId: string;
  ringtoneVolume: number;
  callVolume: number;
  ringtoneDeviceId: string;
  handleTestMicroClick: (...args: any) => unknown;
  handleTestSpeakerClick: (...args: any) => unknown;
  isUploadRingtoneDisabled?: boolean;
  volumeTestData: {
    volume: number;
    countDown: number;
    testState: number;
    isRecording: boolean;
    type: AUDIO_TYPE | null;
  };
  fullRingtoneList: RingtoneItem[];
  selectedRingtoneId: string;
  enableCustomRingtone?: boolean;
  updateCurrentRingtone: (id: string) => void;
  removeCustomRingtone: (id: string) => void;
  uploadCustomRingtone: (audioInfo: AudioInfo) => void;
  showDangerAlert: (message: string) => void;
}
