import type { AudioSettingsPanel } from '@ringcentral-integration/widgets/components/AudioSettingsPanel';

export type { AudioSettingsPanelProps } from '@ringcentral-integration/widgets/components/AudioSettingsPanel';

export interface AudioSettingsViewOptions {
  component?: typeof AudioSettingsPanel;
  showCallVolume?: boolean;
  showRingToneVolume?: boolean;
}

/**
 * Optional noise reduction service. When provided with showNoiseReductionSetting,
 * AudioSettingsView shows the noise reduction toggle. Apps that do not provide
 * NoiseReduction will not show the toggle.
 */
export interface NoiseReductionLike {
  readonly showNoiseReductionSetting: boolean;
  readonly enabled: boolean;
}

export interface AudioSettingsViewProps {
  useV2?: boolean;
}
