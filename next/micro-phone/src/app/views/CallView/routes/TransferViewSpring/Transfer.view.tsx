import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { track } from '@ringcentral-integration/micro-auth/src/app/services';
import { CompanyContacts } from '@ringcentral-integration/micro-contacts/src/app/services';
import { ContactSearchView } from '@ringcentral-integration/micro-contacts/src/app/views';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  injectable,
  optional,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useRef } from 'react';

import {
  AudioSettings,
  CallAction,
  callingOptions,
  CallingSettings,
  Recipient,
} from '../../../../services';
import { CallViewState } from '../../services';

import type {
  TransferViewOptions,
  TransferViewPanelProps,
  TransferViewProps,
} from './Transfer.view.interface';
import { TransferPage } from './TransferPage';
import { t } from './i18n';

@injectable({
  name: 'TransferView',
})
export class TransferView extends RcViewModule {
  constructor(
    private _callAction: CallAction,
    private _toast: Toast,
    private _callingSettings: CallingSettings,
    private _contactSearchView: ContactSearchView,
    private _callViewState: CallViewState,
    @optional() private _audioSettings?: AudioSettings,
    @optional() private _companyContacts?: CompanyContacts,
    @optional('TransferViewOptions')
    private _transferViewOptions?: TransferViewOptions,
  ) {
    super();
  }

  @track(trackEvents.transferToVoicemail)
  trackToVoicemail() {}

  getUIProps({
    call,
    actionsDisabled,
  }: TransferViewProps): UIProps<TransferViewPanelProps> {
    const state = this._callViewState.getCallViewState(
      call.telephonySessionId!,
    );
    const transferTargetNumber = this.getTransferTargetNumber(
      call.telephonySessionId!,
    );
    return {
      toNumber: state.transferToNumber,
      recipients: state.transferRecipients,
      callVolume: this._audioSettings?.callVolume ?? 1,
      outputDeviceId: this._audioSettings?.outputDeviceId ?? '',
      enableWarmTransfer:
        this._callingSettings.callWith === callingOptions.browser,
      actionButtonDisabled: actionsDisabled || !transferTargetNumber,
    };
  }

  getUIFunctions({
    call,
  }: TransferViewProps): UIFunctions<TransferViewPanelProps> {
    const telephonySessionId = call.telephonySessionId!;

    return {
      onToNumberChange: (val: string) =>
        this._callViewState.setCallViewState(telephonySessionId, {
          transferToNumber: val,
        }),
      onRecipientsChange: (val: Recipient[]) =>
        this._callViewState.setCallViewState(telephonySessionId, {
          transferRecipients: val,
          // Clear toNumber when recipients change
          transferToNumber: '',
        }),
      onAction: async (actionType) => {
        const state = this._callViewState.getCallViewState(telephonySessionId);
        const recipients = state.transferRecipients;
        const toNumber = state.transferToNumber;
        const handlers =
          this._callAction.createActionsHandler(telephonySessionId);

        switch (actionType) {
          case 'startWarmTransfer':
            this._transferViewOptions?.onWarmTransferDataTrack?.(
              recipients,
              toNumber,
            );
            await handlers(
              'startWarmTransfer',
              this.getTransferTargetNumber(telephonySessionId),
            );
            await this.cleanTransferUserInput(telephonySessionId);
            break;
          case 'startTransfer':
            this._transferViewOptions?.onTransferDataTrack?.(
              recipients,
              toNumber,
            );
            await handlers(
              'startTransfer',
              this.getTransferTargetNumber(telephonySessionId),
            );
            break;
          case 'startTransferToVoicemail':
            {
              this.trackToVoicemail();
              this._transferViewOptions?.onToVoicemailDataTrack?.(
                recipients,
                toNumber,
              );

              const id = this.getToVoiceMailId(telephonySessionId);
              if (id) {
                handlers('startTransferToVoicemail', id);
              } else {
                this._toast.warning({
                  message: t('toVoiceMailError'),
                });
              }
            }
            break;
          default:
            await handlers(actionType);
            break;
        }

        return false;
      },
    };
  }

  private async cleanTransferUserInput(telephonySessionId: string) {
    await this._callViewState.setCallViewState(telephonySessionId, {
      transferRecipients: [],
      transferToNumber: '',
    });
  }

  private getTransferTargetNumber(telephonySessionId: string) {
    const state = this._callViewState.getCallViewState(telephonySessionId);
    return (
      (state.transferRecipients.length > 0 &&
        state.transferRecipients[0].phoneNumber) ||
      state.transferToNumber
    );
  }

  private getToVoiceMailId(telephonySessionId: string) {
    const state = this._callViewState.getCallViewState(telephonySessionId);
    const recipients = state.transferRecipients;
    const toNumber = state.transferToNumber;

    let id: string | undefined = undefined;
    //! select a company contact
    if (recipients.length > 0 && recipients[0]?.type === 'company') {
      id = recipients[0].id!;
    }

    //! click number on dial pad or use Directly Proceed entry
    else if ((recipients.length > 0 && recipients[0].freeSolo) || !!toNumber) {
      const companyContacts = this._companyContacts?.data || [];
      const transferTargetNumber =
        this.getTransferTargetNumber(telephonySessionId);

      id = companyContacts.find(
        (item: any) => item?.extensionNumber === transferTargetNumber,
      )?.id;
    }
    return id;
  }

  component(props: TransferViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));
    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component = this._transferViewOptions?.component || TransferPage;

    return (
      <Component
        {..._props}
        {...uiFunctions}
        ContactSearch={this._contactSearchView?.component}
      />
    );
  }
}
