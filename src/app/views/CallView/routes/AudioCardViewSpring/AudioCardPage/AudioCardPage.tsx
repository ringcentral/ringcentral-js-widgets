import { AudioSettingsPanel } from '@ringcentral-integration/micro-setting/src/app/views/AudioSettingsView/AudioSettingsPanel';
import type { FunctionComponent } from 'react';
import React from 'react';

import type { AudioCardViewPanelProps } from '../AudioCard.view.interface';

export const AudioCardPage: FunctionComponent<AudioCardViewPanelProps> = (
  props,
) => {
  return <AudioSettingsPanel {...props} />;
};
