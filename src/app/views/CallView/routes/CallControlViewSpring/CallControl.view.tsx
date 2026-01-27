import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import calleeTypes from '@ringcentral-integration/commons/enums/calleeTypes';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { AppFeatures } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  SyncTabId,
  SyncTabView,
  CallLogSyncTabId,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  injectable,
  optional,
  RcViewModule,
  Root,
  UIFunctions,
  UIProps,
  useConnector,
  state,
  action,
  delegate,
  computed,
} from '@ringcentral-integration/next-core';
import React, { useMemo } from 'react';
import type { SetOptional } from 'type-fest';

import { ICallAction } from '../../../../hooks';
import {
  ActiveCallControl,
  CallAction,
  CallingSettings,
  ForwardingNumber,
  isPreinsertCall,
  recordStatus as recordStatuses,
  OnCallActionType,
  isOtherDeviceCall,
} from '../../../../services';
import { AudioCardView } from '../AudioCardViewSpring';

import type {
  CallControlViewOptions,
  CallControlViewPanelProps,
  CallControlViewProps,
  AiNoteTipsMap,
  AiNoteTipType,
} from './CallControl.view.interface';
import { CallControlPanel } from './CallControlPanel';

export function getLastCallInfoFromWebphoneSession(
  webphoneSession: NormalizedSession,
) {
  const sessionNumber =
    webphoneSession.direction === callDirections.outbound
      ? webphoneSession.to
      : webphoneSession.from;
  const sessionStatus = webphoneSession.callStatus;
  const matchedContact = webphoneSession.contactMatch;
  const calleeType = matchedContact
    ? calleeTypes.contacts
    : calleeTypes.unknown;
  return {
    calleeType,
    avatarUrl: matchedContact && matchedContact.profileImageUrl,
    name: matchedContact && matchedContact.name,
    status: sessionStatus,
    phoneNumber: sessionNumber,
  };
}

@injectable({
  name: 'CallControlView',
})
export class CallControlView extends RcViewModule {
  @state
  aiNoteTipsDisplayStatusMap: AiNoteTipsMap = {};

  @action
  private _updateAiNoteTipsDisplayStatusMap(telephonySessionId: string) {
    this.aiNoteTipsDisplayStatusMap[telephonySessionId] = true;
  }

  @action
  private _deleteAiNoteTipsDisplayStatusMap(telephonySessionId: string) {
    delete this.aiNoteTipsDisplayStatusMap[telephonySessionId];
  }

  @delegate('server')
  async updateAiNoteTipsDisplayStatusMap(telephonySessionId: string) {
    this._updateAiNoteTipsDisplayStatusMap(telephonySessionId);
  }

  @delegate('server')
  async deleteAiNoteTipsDisplayStatusMap(telephonySessionId: string) {
    this._deleteAiNoteTipsDisplayStatusMap(telephonySessionId);
  }

  constructor(
    private _callAction: CallAction,
    private _callingSettings: CallingSettings,
    private _activeCallControl: ActiveCallControl,
    private _forwardingNumber: ForwardingNumber,
    private _appFeatures: AppFeatures,
    private _root: Root,
    private _syncTabView: SyncTabView,
    private _audioCardView: AudioCardView,
    @optional('CallControlViewOptions')
    private _callControlViewOptions?: CallControlViewOptions,
  ) {
    super();
  }

  private useCallActions({
    call,
    actionsDisabled,
  }: CallControlViewProps): ICallAction[] {
    const telephonySessionId = call.telephonySessionId!;
    const {
      session,
      isWebphoneMode,
      hasCallRecordingPermission,
      enableSmartNotes,
      isCurrentAiNotesPauseable,
      isCurrentAiNotesLoading,
    } = useConnector(() => ({
      enableSmartNotes: this._callAction.enableSmartNotes,
      isCurrentAiNotesLoading: this._callAction.isCurrentAiNotesLoading,
      isCurrentAiNotesPauseable: this._callAction.isCurrentAiNotesPauseable,
      session: this._activeCallControl.getActiveSession(telephonySessionId),
      flipNumbers: this._forwardingNumber.flipNumbers,
      isWebphoneMode: this._callingSettings.isWebphoneMode,
      hasCallRecordingPermission: this._appFeatures.hasCallRecordingPermission,
    }));

    const preinsert = isPreinsertCall(call);
    const otherDevice = isOtherDeviceCall(call);

    if (!session && !preinsert) return [];

    const { isOnMute = false, isOnHold = false, recordStatus } = session || {};

    const { warmTransferInfo } = call;

    const muteDisabled = isOnHold || actionsDisabled;
    const transferring = Boolean(warmTransferInfo);

    const addButton: ICallAction[] = this._activeCallControl.skipConferenceCall
      ? []
      : [
          {
            type: 'add',
            disabled: !isWebphoneMode || transferring || actionsDisabled,
          },
        ];
    const audioButton: ICallAction[] =
      otherDevice || !this._audioCardView.enabled
        ? []
        : [
            {
              type: 'audio',
              disabled: actionsDisabled,
            },
          ];
    const actions: ICallAction[] = [
      { type: isOnMute ? 'unmute' : 'mute', disabled: muteDisabled },
      { type: 'keypad', disabled: !isWebphoneMode },
      ...audioButton,
      ...addButton,
      { type: isOnHold ? 'unHold' : 'hold', disabled: actionsDisabled },
    ];

    /* --------------------- Transfer --------------------------- */
    actions.push({
      type: 'transfer',
      disabled: transferring || actionsDisabled || call.isConferenceCall,
    });

    /* --------------------- Record --------------------------- */

    const isRecording = recordStatus === recordStatuses.recording;
    const recordCtrlDisabled =
      isOnHold ||
      recordStatus === recordStatuses.pending ||
      recordStatus === recordStatuses.noAccess ||
      actionsDisabled ||
      !isWebphoneMode ||
      !hasCallRecordingPermission;

    actions.push(
      isRecording
        ? {
            type: 'stopRecord',
            disabled: recordCtrlDisabled,
          }
        : {
            type: 'record',
            disabled: recordCtrlDisabled,
          },
    );
    /* --------------------- Flip --------------------------- */

    // actions.push({
    //   type: 'flip',
    //   disabled:
    //     !isWebphoneMode ||
    //     transferring ||
    //     isConferenceCall ||
    //     isOnHold ||
    //     flipNumbers.length === 0 ||
    //     actionsDisabled,
    // });

    /* --------------------- Park --------------------------- */
    // if (showPark) {
    // actions.push({
    //   type: 'park',
    //   disabled: disableControlButton || actionsDisabled || !isWebphoneMode,
    // });
    // }

    if (enableSmartNotes) {
      actions.push({
        type: isCurrentAiNotesPauseable ? 'stopNotes' : 'aiNotes',
        disabled: isCurrentAiNotesLoading || actionsDisabled,
      });
    }

    actions.push({
      type: 'hangUp',
      disabled: preinsert ? false : actionsDisabled,
    });

    return actions;
  }

  @computed
  get currentAiNoteTipType(): AiNoteTipType {
    return this._callAction.isCurrentAiNotesPauseable
      ? 'viewAiNote'
      : 'aiNoteStopped';
  }

  getUIProps({
    call,
  }: CallControlViewProps): UIProps<
    SetOptional<CallControlViewPanelProps, 'actions' | 'transferringCalls'>
  > {
    const displayAiNoteTip =
      this.aiNoteTipsDisplayStatusMap[call.telephonySessionId!];
    const aiNoteTipType = displayAiNoteTip
      ? this.currentAiNoteTipType
      : undefined;
    return {
      call,
      aiNoteTipType,
      flipNumbers: this._forwardingNumber.flipNumbers,
      expanded: this._root.expanded,
    };
  }

  getUIFunctions({
    call,
  }: CallControlViewProps): UIFunctions<CallControlViewPanelProps> {
    const telephonySessionId = call.telephonySessionId!;

    const onAction: OnCallActionType = async (actionType, ...args) => {
      const handler = this._callAction.createActionsHandler(telephonySessionId);
      switch (actionType) {
        case 'stopNotes': {
          const result = await handler('stopNotes');
          if (
            (result && !this._root.expanded) ||
            this._syncTabView.tabInfo?.[SyncTabId.CALL_LOG]?.active !==
              CallLogSyncTabId.AI_NOTE
          ) {
            this.updateAiNoteTipsDisplayStatusMap(telephonySessionId);
          }

          return result;
        }
        case 'aiNotes':
          {
            const result = await handler('aiNotes');
            if (
              result &&
              (!this._root.expanded ||
                this._syncTabView.tabInfo?.[SyncTabId.CALL_LOG]?.active !==
                  CallLogSyncTabId.AI_NOTE)
            ) {
              this.updateAiNoteTipsDisplayStatusMap(telephonySessionId);
            }

            return result;
          }
          break;
        default:
          await handler(actionType, ...args);
          break;
      }
    };

    const toggleExpanded = this._callAction.toggleExpanded;
    return {
      onAction,
      viewAiNote: () => {
        if (!this._root.expanded) {
          toggleExpanded?.(telephonySessionId);
        }
        this._syncTabView.replaceActive(
          SyncTabId.CALL_LOG,
          CallLogSyncTabId.AI_NOTE,
        );
      },
      onCloseAiNoteTip: () => {
        this.deleteAiNoteTipsDisplayStatusMap(telephonySessionId);
      },
      onExpand: toggleExpanded
        ? () => toggleExpanded(telephonySessionId)
        : undefined,
    };
  }

  private useTransferringCalls(props: CallControlViewProps) {
    const { call } = props;
    const { warmTransferInfo } = call;

    const relatedCall = useConnector(() => {
      const relatedTelephonySessionId =
        warmTransferInfo?.relatedTelephonySessionId;

      if (!relatedTelephonySessionId) return null;

      return this._callAction.getAllInfoByTelephonySessionId(
        relatedTelephonySessionId,
      )?.call;
    });

    const isOriginal = relatedCall && warmTransferInfo?.isOriginal;
    const transferringCalls = useMemo(
      () =>
        relatedCall
          ? isOriginal
            ? ([relatedCall, call] as const)
            : ([call, relatedCall] as const)
          : null,
      [call, relatedCall, isOriginal],
    );
    return transferringCalls;
  }

  component(props: CallControlViewProps) {
    const uiFunctions = useMemo(() => this.getUIFunctions(props), [props]);

    const actions = this.useCallActions(props);

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const transferringCalls = this.useTransferringCalls(props);

    const Component =
      this._callControlViewOptions?.component || CallControlPanel;
    return (
      <Component
        {..._props}
        transferringCalls={transferringCalls}
        actions={actions}
        {...uiFunctions}
        AudioCardComponent={<this._audioCardView.component />}
      />
    );
  }
}
