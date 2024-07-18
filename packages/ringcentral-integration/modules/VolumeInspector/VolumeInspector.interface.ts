import type { AudioSettings } from '../AudioSettings';

// export interface AudioSettingsOptions {}

export interface Deps {
  audioSettings: AudioSettings;
}

export type AUDIO_TYPE = 'microphone' | 'speaker';
