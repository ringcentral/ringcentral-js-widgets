import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Swap } from '@ringcentral/juno-icon';
import {
  CallFilledMd,
  CallListMd,
  DialpadMd,
  VolumeMd,
  FlipMd,
  ForwardMd,
  HoldFilledMd,
  MergeCallsMd,
  MicrophoneMd,
  MicrophoneOffMd,
  MinusMd,
  ParkCallMd,
  PlusMd,
  StopMd,
  RecordMd,
  ReplyMd,
  TransferCallMd,
  VoicemailMd,
  SmartNotesMd,
} from '@ringcentral/spring-icon';
import {
  IconButtonProps,
  UnionOmit,
  useEventCallback,
} from '@ringcentral/spring-ui';
import React, { useMemo } from 'react';

import { AnswerAndHoldButton, EndAndAnswerButton } from '../../components';

import i18n from './i18n';

export type CallActionOnlyType =
  | 'back'
  | 'activeCall'
  | 'sendDTMF'
  | 'startTransfer'
  | 'startWarmTransfer'
  | 'startTransferToVoicemail'
  | 'startAdd'
  | 'startForward'
  | 'startReply'
  | 'startMerge'
  | 'startSwap'
  | 'viewConferenceList'
  | 'removeParticipant'
  | 'hangUpWarmTransfer'
  | 'completeWarmTransfer';

export type CallActionType =
  | 'mute'
  | 'unmute'
  //
  | 'hold'
  | 'unHold'
  //
  | 'record'
  | 'stopRecord'
  //
  | 'transfer'
  | 'flip'
  | 'park'
  | 'merge'
  | 'add'
  | 'ignore'
  | 'ignoreQueue'
  | 'answer'
  | 'forward'
  | 'reply'
  | 'swap'
  | 'keypad'
  //
  | 'endAndAnswer'
  | 'holdAndAnswer'
  | 'voicemail'
  | 'hangUp'
  | 'callList'
  | 'switch'
  | 'aiNotes'
  | 'stopNotes'
  | 'audio'
  // only for action, not have icon to show
  | CallActionOnlyType;

export type ICallAction = {
  type: UnionOmit<CallActionType, CallActionOnlyType>;
  disabled?: boolean;
};

type CallActionButtonProps = Pick<
  IconButtonProps,
  'symbol' | 'variant' | 'color' | 'iconSize' | 'className'
> & {
  label: string;
  tooltip?: string;
  /**
   * when you want full control the button, use that custom component
   */
  Component?: React.ComponentType<any>;
};

export const useCallActionButtons = (
  actions: ICallAction[],
  onEffect: (key: CallActionType) => void,
  options?: { isConferenceCall: boolean },
) => {
  const { t } = useLocale(i18n);

  const actionMap = useMemo<
    Partial<Record<CallActionType, () => CallActionButtonProps>>
  >(
    () => ({
      mute: () => ({
        label: t('mute'),
        symbol: MicrophoneMd,
      }),
      unmute: () => ({
        label: t('unmute'),
        symbol: MicrophoneOffMd,
        color: 'primary',
        variant: 'inverted',
      }),
      hold: () => ({
        label: t('hold'),
        symbol: HoldFilledMd,
      }),
      unHold: () => ({
        label: t('unHold'),
        symbol: HoldFilledMd,
        color: 'primary',
        variant: 'inverted',
      }),
      transfer: () => ({
        label: t('transfer'),
        symbol: TransferCallMd,
      }),
      flip: () => ({
        label: t('flip'),
        symbol: FlipMd,
      }),
      callList: () => ({
        label: t('callList'),
        symbol: CallListMd,
      }),
      park: () => ({
        label: t('park'),
        symbol: ParkCallMd,
      }),
      keypad: () => ({
        label: t('keypad'),
        symbol: DialpadMd,
      }),
      audio: () => ({
        label: t('audio'),
        symbol: VolumeMd,
      }),
      stopRecord: () => ({
        label: t('stopRecord'),
        symbol: StopMd,
        color: 'danger',
        variant: 'inverted',
      }),
      record: () => ({
        label: t('record'),
        symbol: RecordMd,
      }),
      merge: () => ({
        label: t('mergeToConference'),
        tooltip: t('mergeTooltip'),
        symbol: MergeCallsMd,
      }),
      answer: () => ({
        color: 'success',
        label: t('answer'),
        symbol: CallFilledMd,
        variant: 'contained',
      }),
      voicemail: () => ({
        label: t('voicemail'),
        color: 'danger',
        symbol: VoicemailMd,
        variant: 'contained',
      }),
      hangUp: () => ({
        label: t('end'),
        tooltip: t(options?.isConferenceCall ? 'leaveCall' : 'endCall'),
        color: 'danger',
        symbol: CallFilledMd,
        variant: 'contained',
        className: 'sui-call-button-end',
      }),
      add: () => ({
        label: t('add'),
        symbol: PlusMd,
      }),
      endAndAnswer: () => ({
        label: t('endAndAnswer'),
        symbol: PlusMd,
        Component: (props) => <EndAndAnswerButton size="small" {...props} />,
      }),
      holdAndAnswer: () => ({
        label: t('holdAndAnswer'),
        symbol: PlusMd,
        Component: (props) => {
          return <AnswerAndHoldButton size="small" {...props} />;
        },
      }),
      forward: () => ({
        label: t('forward'),
        symbol: ForwardMd,
      }),
      reply: () => ({
        label: t('reply'),
        symbol: ReplyMd,
      }),
      ignoreQueue: () => ({
        label: t('ignore'),
        symbol: MinusMd,
        color: 'danger',
        variant: 'contained',
      }),
      ignore: () => ({
        label: t('ignore'),
        symbol: MinusMd,
      }),
      swap: () => ({
        label: t('swap'),
        // TODO: replace with spring icon, once it's ready
        symbol: Swap,
      }),
      switch: () => ({
        label: t('switch'),
        // TODO: change the spring icon, once we have the switch button
        symbol: FlipMd,
      }),
      aiNotes: () => ({
        label: t('notes'),
        symbol: SmartNotesMd,
      }),
      stopNotes: () => ({
        label: t('stopNotes'),
        color: 'danger',
        symbol: SmartNotesMd,
      }),
    }),
    [options?.isConferenceCall, t],
  );

  const effect = useEventCallback(onEffect);

  return useMemo(
    () =>
      actions.map((action) => {
        const actionType = action.type;
        const disabled = action.disabled;

        const propsGetter = actionMap[actionType];

        if (process.env.NODE_ENV !== 'production' && !propsGetter) {
          throw new Error(`actionType "${actionType}" not exist`);
        }

        const item: IconButtonProps & {
          actionType: CallActionType;
          tooltip?: string;
          Component?: React.ComponentType<IconButtonProps>;
        } = {
          actionType,
          disabled,
          color: 'secondary',
          iconSize: 'medium',
          ...propsGetter?.(),
          onClick: (e) => {
            effect(actionType);
            e.stopPropagation();
          },
        };
        return item;
      }),
    [actionMap, actions, effect],
  );
};
