import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  injectable,
  optional,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useRef } from 'react';

import { Environment } from '../../services';

import type { EnvironmentViewOptions } from './Environment.view.interface';
import type { EnvironmentPanelProps } from './EnvironmentPanel';
import { EnvironmentPanel } from './EnvironmentPanel';

/**
 * View module for displaying and managing environment settings
 * Provides UI for environment selection and tracking preferences
 *
 * @class
 */
@injectable({
  name: 'EnvironmentView',
})
export class EnvironmentView extends RcViewModule {
  constructor(
    private _environment: Environment,
    @optional('EnvironmentViewOptions')
    protected _environmentViewOptions?: EnvironmentViewOptions,
  ) {
    super();
  }

  @computed
  get mfeDepsInfo() {
    return this._environment.mfeDepsInfo.length
      ? JSON.stringify(this._environment.mfeDepsInfo)
      : '';
  }

  component() {
    const props = useConnector<UIProps<EnvironmentPanelProps>>(() => {
      return {
        server: this._environment.server || '',
        recordingHost: this._environment.recordingHost || '',
        enabled: this._environment.enabled,
        allowDataTracking: this._environment.allowDataTracking,
        useDataTrackingSetting: this._environment.debugDataTrackingEnable,
        mfeDepsInfo: this.mfeDepsInfo,
      };
    });

    const { current: actions } = useRef<UIFunctions<EnvironmentPanelProps>>({
      onSetData: (...args) => this._environment.setData(...args),
    });
    const Component =
      this._environmentViewOptions?.component || EnvironmentPanel;

    return <Component {...props} {...actions} />;
  }
}
