import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { isInbound } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { RegionSettings } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ModalRef,
  ModalView,
} from '@ringcentral-integration/micro-core/src/app/views';
import type { UIProps } from '@ringcentral-integration/next-core';
import {
  action,
  delegate,
  injectable,
  optional,
  portal,
  RcViewModule,
  state,
  watch,
} from '@ringcentral-integration/next-core';
import { ModalContent } from '@ringcentral-integration/widgets/components/ActiveCallItemV2';
import { createGlobalStyle, spacing } from '@ringcentral/juno';
import React from 'react';

import { ActiveCallControl, ActiveSession, Webphone } from '../../services';

import type { SwitchCallConfirmationProps } from './SwitchCallConfirm.view.interface';
import { t } from './i18n';

const modalClasses = {
  paper: 'switch-dialog-paper',
};

const SwitchModalGlobalStyle = createGlobalStyle<{
  $isWide: boolean;
}>`
  .${modalClasses.paper} {
    margin: ${({ $isWide }) => ($isWide ? spacing(4) : spacing(3))};
    width: 100%;
  }
`;

@injectable({
  name: 'SwitchCallConfirmView',
})
export class SwitchCallConfirmView extends RcViewModule implements ModalRef {
  constructor(
    protected _modalView: ModalView,
    protected _regionSettings: RegionSettings,
    protected _webphone: Webphone,
    @optional() protected _activeCallControl?: ActiveCallControl,
  ) {
    super();
  }

  override onInitOnce() {
    watch(
      this,
      () => this._activeCallControl?.sessions!,
      (sessions) => {
        if (
          this.call &&
          (sessions?.length === 0 ||
            !sessions.find((s) => s.sessionId === this.call?.sessionId))
        ) {
          this.close();
        }
      },
    );
  }

  @state
  contactName = '';

  @state
  call: Call | null = null;

  @state
  isWide = false;

  @action
  setContactName(contactName: string) {
    this.contactName = contactName;
  }

  @action
  setCall(call: Call | null) {
    this.call = call;
  }

  @portal
  switchConfirmModal = this._modalView.create({
    view: this,
    props: ({ call }: { call: Call }) => ({
      classes: modalClasses,
      header: t('callSwitch'),
      confirmButtonText: t('comfirmOKButton'),
      cancelButtonText: t('comfirmCancelButton'),
      onConfirm: async () => {
        if (this._activeCallControl) {
          return this._activeCallControl!.switch(
            (call as ActiveSession).telephonySessionId,
          );
        }
        // if (!this._webphone) {
        //   return;
        // }
        // await this._webphone.switchCall(
        //   call,
        //   this._regionSettings.homeCountryId,
        // );
        this.close();
      },
      onCancel: () => {
        this.setCall(null);
      },
    }),
  });

  getPhoneNumber(call: Call) {
    return isInbound(call)
      ? call?.from?.phoneNumber || call?.from?.extensionNumber
      : call?.to?.phoneNumber || call?.to?.extensionNumber;
  }

  getContactName(call: Call) {
    return this.getPhoneNumber(call);
  }

  @action
  setIsWide(isWide: boolean) {
    this.isWide = isWide;
  }

  @delegate('server')
  async open(call: Call) {
    this.setContactName(this.getContactName(call) ?? '');
    this.setCall(call);
    this._modalView.open(this.switchConfirmModal, { call });
  }

  @delegate('server')
  async close() {
    this._modalView.close(this.switchConfirmModal);
    this.setCall(null);
  }

  getUIProps(): UIProps<SwitchCallConfirmationProps> {
    return {
      contactName: this.contactName,
      confirmContext: this.call?.isConferenceCall
        ? t('conferenceCallSwitchConfirmContext')
        : t('comfirmContext', { displayName: this.contactName }),
    };
  }

  component() {
    return (
      <>
        <SwitchModalGlobalStyle $isWide={this.isWide} />
        <ModalContent {...this.getUIProps()} />
      </>
    );
  }
}
