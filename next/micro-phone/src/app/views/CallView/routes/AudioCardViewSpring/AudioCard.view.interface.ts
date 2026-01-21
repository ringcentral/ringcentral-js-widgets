import { AudioSettingsPanelProps } from '@ringcentral-integration/micro-setting/src/app/views/AudioSettingsView/AudioSettingsPanel';

import type { AudioCardPage } from './AudioCardPage';

export interface AudioCardViewOptions {
  component?: typeof AudioCardPage;
}

export interface AudioCardViewPanelProps extends AudioSettingsPanelProps {
  onExit: () => Promise<void>;
}

export type AudioCardViewProps = {};
