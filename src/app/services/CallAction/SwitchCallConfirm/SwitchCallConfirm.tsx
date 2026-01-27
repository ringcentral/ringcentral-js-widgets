/* eslint-disable react-hooks/rules-of-hooks */
import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import {
  ModalView,
  useModalItemView,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  autobind,
  delegate,
  dynamic,
  fromWatchValue,
  injectable,
  portal,
  PortManager,
  RcModule,
  takeUntilAppDestroy,
  useConnector,
} from '@ringcentral-integration/next-core';
import { FormattedMessage } from '@ringcentral-integration/next-widgets/components';
import { DialogContent } from '@ringcentral/spring-ui';
import React from 'react';
import { EMPTY, switchMap, tap } from 'rxjs';

import { useContactRenderInfoFromCall } from '../../../hooks';
import type { CallAction } from '../CallAction';

import { t } from './i18n';

type SwitchConfirmModal = {
  telephonySessionId: string;
};

@injectable({
  name: 'SwitchCallConfirm',
})
export class SwitchCallConfirm extends RcModule {
  @dynamic('CallAction')
  private _callAction!: CallAction;

  @autobind
  private SwitchConfirmModal({ call }: { call: Call }) {
    const { DisplayName } = useContactRenderInfoFromCall(call, {
      phoneNumberDisplayMode: 'phoneNumber',
    });
    return (
      <DialogContent>
        <FormattedMessage
          message={t('confirmContext')}
          values={{ displayName: <DisplayName /> }}
        />
      </DialogContent>
    );
  }

  @portal
  private switchConfirmModal = this._modalView.create<SwitchConfirmModal>({
    view: () => {
      const { props } = useModalItemView<SwitchConfirmModal>();
      const { telephonySessionId } = props.payload!;
      const { call } = useConnector(() => ({
        ...this._callAction.getAllInfoByTelephonySessionId(telephonySessionId),
      }));

      if (!call) {
        return null;
      }

      return <this.SwitchConfirmModal call={call} />;
    },
    props: () => ({
      // avoid the action menu be focus back, because that already be hidden
      variant: 'confirm',
      disableBackdropClick: false,
      header: t('callSwitch'),
      confirmButtonText: t('confirmOKButton'),
      ['data-sign']: 'switchModal',
    }),
  });

  constructor(
    private _modalView: ModalView,
    private _portManager: PortManager,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindClearModalListener();
      });
    } else {
      this.bindClearModalListener();
    }
  }

  private bindClearModalListener() {
    // when id changed, close conference related all modals
    fromWatchValue(this, () => this._callAction)
      .pipe(
        switchMap((callAction) =>
          callAction ? callAction.displayCallTelephonyIdChange$ : EMPTY,
        ),
        tap(() => {
          this._modalView.close(this.switchConfirmModal);
        }),
        takeUntilAppDestroy,
      )

      .subscribe();
  }

  @delegate('server')
  async confirmProcess(telephonySessionId: string) {
    const result = this._modalView.open(this.switchConfirmModal, {
      telephonySessionId,
    });

    return result.closed;
  }
}
