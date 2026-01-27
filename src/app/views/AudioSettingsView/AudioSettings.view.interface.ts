import type { AudioSettingsPanel } from '@ringcentral-integration/widgets/components/AudioSettingsPanel';

export type { AudioSettingsPanelProps } from '@ringcentral-integration/widgets/components/AudioSettingsPanel';

export interface AudioSettingsViewOptions {
  component?: typeof AudioSettingsPanel;
  showCallVolume?: boolean;
  showRingToneVolume?: boolean;
}

export interface AudioSettingsViewProps {
  useV2?: boolean;
}
