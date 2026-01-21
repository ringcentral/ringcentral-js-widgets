import { isFirefox } from '@ringcentral-integration/commons/modules/Webphone/webphoneHelper';
import { AudioSettingsView } from '@ringcentral-integration/micro-setting/src/app/views';
import { AudioSettingsPanelProps } from '@ringcentral-integration/micro-setting/src/app/views/AudioSettingsView/AudioSettingsPanel';
import {
  injectable,
  optional,
  RcViewModule,
  type UIFunctions,
  type UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import { isSafari } from '@ringcentral-integration/utils';
import React, { useRef } from 'react';

import type {
  AudioCardViewOptions,
  AudioCardViewPanelProps,
  AudioCardViewProps,
} from './AudioCard.view.interface';
import { AudioCardPage } from './AudioCardPage';

@injectable({
  name: 'AudioCardView',
})
export class AudioCardView extends RcViewModule {
  constructor(
    private _audioSettingsView: AudioSettingsView,
    @optional('AudioCardViewOptions')
    private _audioCardViewOptions?: AudioCardViewOptions,
  ) {
    super();
  }

  get enabled() {
    return (
      this._audioSettingsView.enableActiveCallAudioControl &&
      // align with Jupiter
      !(isSafari() || isFirefox())
    );
  }

  getUIProps(): UIProps<AudioCardViewPanelProps> {
    const audioSettingsViewProps =
      this._audioSettingsView.getUIProps() as UIProps<AudioSettingsPanelProps>;
    return {
      ...audioSettingsViewProps,
      showHeader: false,
      showAGCEnabled: false,
      showRingtoneConfig: false,
    };
  }

  getUIFunctions(): UIFunctions<AudioCardViewPanelProps> {
    const audioSettingsViewUIFunctions =
      this._audioSettingsView.getUIFunctions() as UIFunctions<AudioSettingsPanelProps>;
    return {
      ...audioSettingsViewUIFunctions,
    };
  }

  component(props: AudioCardViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component = this._audioCardViewOptions?.component || AudioCardPage;

    return <Component {..._props} {...uiFunctions} />;
  }
}
