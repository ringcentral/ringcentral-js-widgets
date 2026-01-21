/* eslint-disable react-hooks/rules-of-hooks */
import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import {
  FormattedPhoneNumber,
  useFormattedPhoneNumberFn,
} from '@ringcentral-integration/micro-auth/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  ModalView,
  useModalItemView,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  action,
  autobind,
  computed,
  delegate,
  dynamic,
  fromWatchValue,
  injectable,
  logger,
  portal,
  PortManager,
  RcModule,
  state,
  StoragePlugin,
  takeUntilAppDestroy,
  useConnector,
  userStorage,
} from '@ringcentral-integration/next-core';
import { FormattedMessage } from '@ringcentral-integration/next-widgets/components';
import { RemoveMemberBorder } from '@ringcentral/juno-icon';
import {
  Button,
  Checkbox,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@ringcentral/spring-ui';
import React, { useState } from 'react';
import { EMPTY, filter, merge, switchMap, tap } from 'rxjs';

import { useContactRenderInfoFromCall } from '../../../hooks';
import { isOtherDeviceCall, isRingingCall } from '../../ActiveCallControl';
import { CallMonitor } from '../../CallMonitor';
import type { CallAction } from '../CallAction';

import i18n from './i18n';

type MergeConfirmProps = {
  toMergeWithTelephonySessionId: string;
};

type ParticipantsListProps = {
  telephonySessionId: string;
};

type RemoveParticipantConfirmOptions = {
  displayName: string;
};

@injectable({
  name: 'ConferenceCallAction',
})
export class ConferenceCallAction extends RcModule {
  @dynamic('CallAction')
  private _callAction!: CallAction;
  // TODO: key storage migration from MergeCallConfirmView
  @userStorage
  @state
  doNotAskAgain = false;

  @action
  _setDoNotAskAgain(value: boolean) {
    this.doNotAskAgain = value;
  }

  @delegate('server')
  async setDoNotAskAgain(value: boolean) {
    this._setDoNotAskAgain(value);
  }

  @state
  private openedPartyId: string | null = null;

  @action
  private setOpenedPartyId(val: string | null) {
    this.openedPartyId = val;
  }

  @computed
  get mergeCalls() {
    const displayCallAllInfo = this._callAction.displayCallAllInfo?.call;

    // when that is ringing call, never able to merge to another call
    if (isRingingCall(displayCallAllInfo)) {
      return [];
    }
    const displayTelephonySessionId =
      this._callAction.activeCallInfo?.call?.telephonySessionId;

    return this._callAction.displayCallList.filter((call) =>
      this.isCallMergeable(call, displayTelephonySessionId),
    );
  }

  isCallMergeable = (
    call: Call,
    mergeIntoTelephonySessionId: string | undefined,
  ) => {
    const ringing = isRingingCall(call);

    return (
      !isOtherDeviceCall(call) &&
      !ringing &&
      call.telephonySessionId !== mergeIntoTelephonySessionId
    );
  };

  @autobind
  private MergeConfirm({ call }: { call: Call }) {
    const { action } = useModalItemView<MergeConfirmProps>();
    const { t } = useLocale(i18n);

    const { doNotAskAgain } = useConnector(() => ({
      doNotAskAgain: this.doNotAskAgain,
    }));

    const [tmpDoNotAskAgain, setTmpDoNotAskAgain] = useState(doNotAskAgain);

    const { DisplayName } = useContactRenderInfoFromCall(call);

    const displayName = <DisplayName />;

    return (
      <div
        className="m-4 flex flex-col gap-3"
        data-sign="mergeCallConfirmation"
      >
        <h3 className="font-bold typography-title">{t('mergeTitle')}</h3>
        <p className="typography-mainText" data-sign="confirmMessage">
          <FormattedMessage
            message={t('mergeMessage')}
            values={{
              contactName: call.isConferenceCall
                ? t('conferenceCall')
                : displayName,
            }}
          />
        </p>
        <FormLabel
          data-sign="doNotAsk"
          label={t('mergeDoNotAsk')}
          placement="end"
        >
          <Checkbox
            checked={tmpDoNotAskAgain}
            onChange={(e) => {
              setTmpDoNotAskAgain(e.target.checked);
            }}
          />
        </FormLabel>

        <div className="flex flex-col gap-2 mt-2">
          <Button
            fullWidth
            size="xlarge"
            data-sign="confirmMerge"
            onClick={() => {
              action?.confirm({ doNotAskAgain: tmpDoNotAskAgain });
            }}
          >
            {t('mergeConfirm')}
          </Button>
          <Button
            fullWidth
            data-sign="cancelMerge"
            size="xlarge"
            variant="outlined"
            onClick={() => {
              action?.cancel();
            }}
          >
            {t('mergeCancel')}
          </Button>
        </div>
      </div>
    );
  }

  @portal
  private mergeConfirm = this._modalView.create<MergeConfirmProps>({
    view: () => {
      const { props } = useModalItemView<MergeConfirmProps>();
      const { toMergeWithTelephonySessionId } = props.payload!;

      const { call } = useConnector(() => ({
        ...this._callAction.getAllInfoByTelephonySessionId(
          toMergeWithTelephonySessionId,
        ),
      }));

      if (!call) return null;

      return <this.MergeConfirm call={call} />;
    },
    props: () => ({
      type: 'drawer',
      header: null,
      disableBackdropClick: false,
      'aria-label': 'merge confirm',
    }),
  });

  @portal
  private leaveConfirm = this._modalView.create({
    view: () => {
      const { t } = useLocale(i18n);
      const { action } = useModalItemView();

      return (
        <div className="m-4">
          <h3
            data-sign="leaveOrEndCallTitle"
            className="font-bold mb-2 text-center typography-title"
          >
            {t('leaveOrEndCall')}
          </h3>

          <div className="flex flex-col gap-2">
            <Button
              fullWidth
              size="xlarge"
              data-sign="leaveCall"
              onClick={() => {
                action?.confirm();
              }}
            >
              {t('leaveCall')}
            </Button>
            <Button
              fullWidth
              size="xlarge"
              data-sign="endCallForEveryone"
              variant="outlined"
              onClick={() => {
                action?.cancel();
              }}
            >
              {t('endCallForEveryone')}
            </Button>
          </div>
        </div>
      );
    },
    props: () => ({
      type: 'drawer',
      header: null,
      disableBackdropClick: false,
      'aria-label': 'confirm leave or end call',
    }),
  });

  @portal
  private removeParticipantConfirm =
    this._modalView.create<RemoveParticipantConfirmOptions>({
      view: () => {
        const { t } = useLocale(i18n);
        const { props, action } =
          useModalItemView<RemoveParticipantConfirmOptions>();
        const { displayName } = props.payload!;

        return (
          <div className="m-4" data-sign="removeParticipantModal">
            <h3
              data-sign="removeParticipantTitle"
              className="font-bold typography-title"
            >
              {t('removeTitle')}
            </h3>

            <p className="mt-4 mb-8">
              <FormattedMessage
                message={t('removeDescription')}
                values={{ name: displayName || '' }}
              />
            </p>

            <div className="flex flex-col gap-2">
              <Button
                fullWidth
                size="xlarge"
                data-sign="confirmRemoveButton"
                onClick={() => {
                  action?.confirm();
                }}
              >
                {t('confirmButtonText')}
              </Button>
              <Button
                fullWidth
                size="xlarge"
                data-sign="cancelRemoveButton"
                variant="outlined"
                onClick={() => {
                  action?.cancel();
                }}
              >
                {t('cancelButtonText')}
              </Button>
            </div>
          </div>
        );
      },
      props: () => ({
        type: 'drawer',
        header: null,
        disableBackdropClick: false,
        'aria-label': 'confirm remove participant',
        onClose: () => {
          this.setOpenedPartyId(null);
        },
      }),
    });

  @autobind
  private ParticipantsList({ call }: { call: Call }) {
    const { t } = useLocale(i18n);
    const { conferenceParticipantsInfoFnList } = useContactRenderInfoFromCall(
      call,
      {
        phoneNumberDisplayMode: 'unknown',
      },
    );

    const { activeCallInfo } = useConnector(() => ({
      activeCallInfo: this._callAction.activeCallInfo,
    }));

    const participants = call?.conferenceParticipants || [];
    const length = participants.length;
    const formattedPhoneNumberFn = useFormattedPhoneNumberFn();

    if (!call) return null;

    return (
      <div data-sign="participantsListModal">
        <h3
          data-sign="participantsHeader"
          className="font-bold m-4 typography-title"
        >
          {t('participants')} ({length})
        </h3>

        <List>
          {conferenceParticipantsInfoFnList?.map(
            (conferenceParticipantInfoFn, index) => {
              const { data, renderInfo, Avatar, result, displayName } =
                conferenceParticipantInfoFn({
                  phoneNumberDisplayMode: 'unknown',
                });
              const { partyId, isHost } = data;
              const { dialToPhoneNumber, type } = renderInfo;

              const primaryDisplay = isHost ? (
                <>
                  {result}
                  {` (${t('host')})`}
                </>
              ) : (
                result
              );

              return (
                <ListItem
                  key={`${call.telephonySessionId}-${index}`}
                  size="large"
                  divider={false}
                  data-sign={isHost ? `participantItemHost` : `participantItem`}
                >
                  <Avatar />
                  <ListItemText
                    primary={
                      // entityDetailLinkId ? (
                      //   <RcLink
                      //     variant="inherit"
                      //     onClick={() => {
                      //       return openEntityDetailLink
                      //         ? openEntityDetailLink(entityDetailLinkId)
                      //         : window.open(entityDetailLink, '_blank');
                      //     }}
                      //   >
                      //     {displayName}
                      //   </RcLink>
                      // ) : (
                      <span data-sign="participantName">{primaryDisplay}</span>
                      // )
                    }
                    secondary={
                      isHost || dialToPhoneNumber === 'anonymous' ? null : (
                        <span data-sign="participantNumber">
                          <FormattedPhoneNumber
                            phoneNumber={dialToPhoneNumber}
                          />
                        </span>
                      )
                    }
                  />

                  {!isHost && (
                    <IconButton
                      data-sign="removeParticipantButton"
                      color="secondary"
                      disabled={activeCallInfo?.meta?.actionsDisabled}
                      background={false}
                      symbol={RemoveMemberBorder}
                      TooltipProps={{
                        title: t('removeParticipant'),
                        placement: 'left',
                      }}
                      onClick={() => {
                        this.confirmRemoveParticipant(partyId, {
                          displayName:
                            type === 'unknown' && dialToPhoneNumber
                              ? formattedPhoneNumberFn(dialToPhoneNumber)
                              : displayName,
                        });
                      }}
                    />
                  )}
                </ListItem>
              );
            },
          )}
        </List>
      </div>
    );
  }

  @portal
  private participantsList = this._modalView.create<ParticipantsListProps>({
    view: () => {
      const { props } = useModalItemView<ParticipantsListProps>();
      const { telephonySessionId } = props.payload!;

      const { call } = useConnector(() => ({
        ...this._callAction.getAllInfoByTelephonySessionId(telephonySessionId),
      }));

      if (!call) return null;

      return <this.ParticipantsList call={call} />;
    },
    props: () => ({
      type: 'drawer',
      header: null,
      disableBackdropClick: false,
      'aria-label': 'participants list',
    }),
  });

  constructor(
    private _modalView: ModalView,
    private _portManager: PortManager,
    private _callMonitor: CallMonitor,
    private _storage: StoragePlugin,
  ) {
    super();
    this._storage.enable(this);

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindClearModalListener();
      });
    } else {
      this.bindClearModalListener();
    }
  }

  private bindClearModalListener() {
    fromWatchValue(this, () => this._callAction)
      .pipe(
        switchMap((callAction) => {
          if (!callAction) return EMPTY;

          // when id changed, close conference related all modals
          const closeAllWhenIdChange$ =
            callAction.displayCallTelephonyIdChange$.pipe(
              tap(() => {
                this._modalView.close(this.mergeConfirm);
                this._modalView.close(this.leaveConfirm);
                this._modalView.close(this.removeParticipantConfirm);
                this._modalView.close(this.participantsList);
              }),
            );

          // close remove participant confirm modal when partyId not exist anymore
          const closeRemovePartyWhenPartyNotExist$ = fromWatchValue(
            this,
            () =>
              [
                this.openedPartyId,
                this._callAction.displayCallAllInfo?.call
                  ?.conferenceParticipants,
              ] as const,
            { multiple: true },
          ).pipe(
            filter(([partyId]) => !!partyId),
            tap(([partyId, conferenceParticipants]) => {
              const openedRemovePartyStillExist = conferenceParticipants?.some(
                (participant) => participant.partyId === partyId,
              );
              if (!openedRemovePartyStillExist) {
                this._modalView.close(this.removeParticipantConfirm);
              }
            }),
          );

          return merge(
            closeAllWhenIdChange$,
            closeRemovePartyWhenPartyNotExist$,
          );
        }),
        takeUntilAppDestroy,
      )

      .subscribe();
  }

  @delegate('server')
  async mergeConfirmProcess(toMergeWithTelephonySessionId: string) {
    if (this.mergeCalls.length === 1) {
      const mergeId = this.mergeCalls[0]?.telephonySessionId;

      return mergeId;
    }

    if (this.doNotAskAgain) {
      return toMergeWithTelephonySessionId;
    }

    const result = this._modalView.open(this.mergeConfirm, {
      toMergeWithTelephonySessionId,
    });

    return result.closed.then((answer) => {
      if (answer) {
        logger.log('mergeConfirmProcess', answer);
        if (typeof answer === 'object' && 'doNotAskAgain' in answer) {
          this._setDoNotAskAgain(answer.doNotAskAgain);
        }

        return toMergeWithTelephonySessionId;
      }

      return undefined;
    });
  }

  openParticipantsList(telephonySessionId: string) {
    this._modalView.open(this.participantsList, { telephonySessionId });
  }

  @delegate('server')
  async confirmRemoveParticipant(
    partyId: string,
    options: RemoveParticipantConfirmOptions,
  ) {
    this.setOpenedPartyId(partyId);
    const result = this._modalView.open(this.removeParticipantConfirm, options);

    return result.closed.then((answer) => {
      if (answer) {
        return this._callAction.onActiveActions('removeParticipant', partyId);
      }
    });
  }

  @delegate('server')
  async leaveConfirmProcess() {
    const result = this._modalView.open(this.leaveConfirm);

    return result.closed;
  }
}
