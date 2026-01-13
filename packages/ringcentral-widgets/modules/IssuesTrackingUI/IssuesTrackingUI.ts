import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { proxify } from '@ringcentral-integration/commons/lib/proxy/proxify';
import {
  action,
  computed,
  RcUIModuleV2,
  state,
  type UIFunctions,
  type UIProps,
} from '@ringcentral-integration/core';

import type {
  Deps,
  IssuesTrackingPanelProps,
  IssuesTrackingContainerProps,
} from './IssuesTrackingUI.interface';

@Module({
  name: 'IssuesTrackingUI',
  deps: [
    'RouterInteraction',
    'Locale',
    'Alert',
    'BrowserLogger',
    { dep: 'IssuesTrackingViewOptions', optional: true },
  ],
})
export class IssuesTrackingUI extends RcUIModuleV2<Deps> {
  @state
  open = false;

  @computed((that: IssuesTrackingUI) => [that.open])
  get ConfirmPanelProps(): IssuesTrackingPanelProps['ConfirmPanelProps'] {
    return {
      open: this.open,
      onCancel: () => {
        this.setOpen(false);
      },
      onClose: () => {
        this.setOpen(false);
      },
      onConfirm: async () => {
        this.setOpen(false);
        await this._deps.browserLogger.disable();
      },
    };
  }

  @action
  _setOpen(val: boolean) {
    this.open = val;
  }

  @proxify
  async setOpen(val: boolean) {
    this._setOpen(val);
  }

  constructor(deps: Deps) {
    super({ deps });
  }

  @proxify
  private async goBack() {
    await this._deps.routerInteraction.push('/settings');
  }

  @proxify
  private async toggleEnable(checked: boolean) {
    if (checked) return this._deps.browserLogger.enable();

    this.setOpen(true);
  }

  @proxify
  async downloadLog() {
    try {
      await this._deps.browserLogger.saveLog();
      this._deps.alert.success({
        message: issueTrackingMessages.downloadSuccess,
      });
      this._deps.browserLogger.disable();
    } catch (error) {
      console.log('downloadLog error:', error);
      this._deps.alert.danger({
        message: issueTrackingMessages.downloadFail,
      });
    }
  }

  getUIProps(
    props: IssuesTrackingContainerProps,
  ): UIProps<IssuesTrackingPanelProps> {
    return {
      enabled: this._deps.browserLogger.enabled,
      downloading: this._deps.browserLogger.downloading,
      currentLocale: this._deps.locale.currentLocale,
      ConfirmPanelProps: this.ConfirmPanelProps,
    };
  }

  getUIFunctions(
    props: IssuesTrackingContainerProps,
  ): UIFunctions<IssuesTrackingPanelProps> {
    return {
      downloadLog: async () => {
        await this.downloadLog();
      },
      goBack: async () => {
        await this.goBack();
      },
      toggleEnable: async (checked) => {
        await this.toggleEnable(checked);
      },
    };
  }
}
