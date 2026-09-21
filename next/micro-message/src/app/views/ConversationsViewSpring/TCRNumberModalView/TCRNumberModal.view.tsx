import {
  AccountInfo,
  ExtensionInfo,
  NumberFormatter,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ModalRef,
  ModalView,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  action,
  delegate,
  fromWatchValue,
  injectable,
  portal,
  PortManager,
  RcViewModule,
  RouterPlugin,
  state,
  storage,
  StoragePlugin,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import React from 'react';
import { combineLatest, filter, tap } from 'rxjs';

import { MessageSender } from '../../../services';
import { t } from '../i18n';

import type { TCRNumberModalPayload } from './TCRNumberModal.view.interface';
import { TCRNumberModalPanel } from './TCRNumberModalPanel';

@injectable({
  name: 'TCRNumberModalView',
})
export class TCRNumberModalView extends RcViewModule implements ModalRef {
  constructor(
    private _modalView: ModalView,
    private _numberFormatter: NumberFormatter,
    private _router: RouterPlugin,
    private _portManager: PortManager,
    private _storage: StoragePlugin,
    private _messageSender: MessageSender,
    private _accountInfo: AccountInfo,
    private _extensionInfo: ExtensionInfo,
  ) {
    super();
    this._storage.enable(this);

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindPopupListener();
      });
    } else {
      this.bindPopupListener();
    }
  }

  @portal
  private modal = this._modalView.create<TCRNumberModalPayload>({
    view: this,
    props: ({ type }) => ({
      'data-sign': 'tcrNumberPermissionDialog',
      header: t(
        type === 'receiveOnlyNumber'
          ? 'tcrReceiveOnlyTitle'
          : 'tcrImportantChangesTitle',
      ),
      variant: 'alert',
      disableBackdropClick: false,
      disableRestoreFocus: true,
      confirmButtonText: t('ok'),
      confirmButtonProps: {
        ['data-sign']: 'tcrNumberPermissionOkButton',
      } as Record<string, string>,
      onClose: () => {
        this.setShown(true);
      },
    }),
  });

  @storage
  @state
  private shown = false;

  @action
  private _setShown(shown: boolean) {
    this.shown = shown;
  }

  @delegate('server')
  async setShown(shown: boolean) {
    this._setShown(shown);
  }

  private bindPopupListener() {
    combineLatest([
      fromWatchValue(this, () => this._router.currentPath),
      fromWatchValue(this, () => this.payload),
    ])
      .pipe(
        filter(
          ([currentPath, payload]) => currentPath === '/messages' && !!payload,
        ),
        tap(([, payload]) => {
          this.open(payload!);
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private formatNumbers(numbers: Array<{ phoneNumber?: string }>) {
    return numbers.reduce<string[]>((formattedNumbers, { phoneNumber }) => {
      if (phoneNumber) {
        formattedNumbers.push(
          this._numberFormatter.formatNumber(phoneNumber) ?? phoneNumber,
        );
      }

      return formattedNumbers;
    }, []);
  }

  private get payload(): TCRNumberModalPayload | undefined {
    if (this.shown || !this._accountInfo.isTCRSupported) {
      return undefined;
    }

    const {
      senderNumbersList,
      receiveOnlyNumbers,
      registerableNumbers,
      smsPermissionReason,
    } = this._messageSender;

    if (smsPermissionReason === 'noNumberAvailable') {
      return {
        type: 'noNumberAvailable',
      };
    }

    if (smsPermissionReason === 'receiveOnlyNumber') {
      return {
        type: 'receiveOnlyNumber',
        isAdminUser: this._extensionInfo.isAdminUser,
      };
    }

    if (
      senderNumbersList.length > 0 &&
      (receiveOnlyNumbers.length > 0 || registerableNumbers.length > 0)
    ) {
      return {
        type: 'mixed',
        fullyRegisteredNumbers: this.formatNumbers(senderNumbersList),
        inboundOnlyNumbers: this.formatNumbers(receiveOnlyNumbers),
        notRegisteredNumbers: this.formatNumbers(registerableNumbers),
      };
    }

    return undefined;
  }

  open(payload: TCRNumberModalPayload) {
    if (this.shown) {
      return;
    }

    this.setShown(true);
    return this._modalView.open(this.modal, payload);
  }

  close() {
    return this._modalView.close(this.modal);
  }

  component() {
    return <TCRNumberModalPanel />;
  }
}
