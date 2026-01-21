import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  fromWatchValue,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  takeUntilAppDestroy,
  useConnector,
} from '@ringcentral-integration/next-core';
import { useObservableState } from 'observable-hooks';
import React, { useRef } from 'react';
import { BehaviorSubject, tap } from 'rxjs';
import type { SetOptional } from 'type-fest';

import type { ICallAction } from '../../hooks';
import {
  CallAction,
  CallingSettings,
  isOtherDeviceCall,
  isQueueCall,
  isRingingCall,
  OnCallActionType,
} from '../../services';

import type {
  QuickCallActionViewOptions,
  QuickCallActionViewPanelProps,
  QuickCallActionViewProps,
} from './QuickCallAction.view.interface';
import { QuickCallActionPanel } from './QuickCallActionPanel';

@injectable({
  name: 'QuickCallActionView',
})
export class QuickCallActionView extends RcViewModule {
  swapMenuOpened$ = new BehaviorSubject(false);
  mergeMenuOpened$ = this._callAction.mergeMenuOpened$;

  @computed
  private get swapCalls() {
    return this._callAction.displayCallList.filter((call) => {
      const metaInfo = this._callAction.getCallMetaInfo(
        call.telephonySessionId!,
      );
      return (
        !metaInfo?.open &&
        !isOtherDeviceCall(call) &&
        // exist active call also should not include in swapCall list
        call.telephonySessionId !==
          this._callAction.activeCallInfo?.call?.telephonySessionId
      );
    });
  }

  private get mergeCalls() {
    return this._callAction.mergeCalls;
  }

  constructor(
    private _portManager: PortManager,
    private _callingSettings: CallingSettings,
    private _callAction: CallAction,
    @optional('QuickCallActionViewOptions')
    private _QuickCallActionViewOptions?: QuickCallActionViewOptions,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onClient(() => {
        this.bindMenuCloseListener();
      });
    } else {
      this.bindMenuCloseListener();
    }
  }

  private bindMenuCloseListener() {
    fromWatchValue(
      this,
      () => this._callAction.activeCallInfo?.call?.telephonySessionId,
    )
      .pipe(
        tap(() => {
          this.swapMenuOpened$.next(false);
          this.mergeMenuOpened$.next(false);
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  getUIProps():
    | UIProps<
        SetOptional<
          QuickCallActionViewPanelProps,
          'swapMenuOpened' | 'mergeMenuOpened'
        >
      >
    | { hidden: true } {
    const callMap = this._callAction.displayCallsMap;

    const multiple = this._callAction.connectingCalls.length > 1;

    if (multiple) {
      return {
        ringCalls: callMap.ringing,
        holdingCalls: callMap.holding,
        activeCalls: callMap.active,
        swapCalls: this.swapCalls,
        mergeCalls: this.mergeCalls,
        actions: this.multipleActions,
      };
    }

    const actionInfo = this._callAction.announcementInfo;

    if (!actionInfo?.meta) {
      return { hidden: true };
    }

    return {
      currentCall: actionInfo.call,
      ringCalls: [],
      holdingCalls: [],
      activeCalls: [],
      swapCalls: [],
      mergeCalls: [],
      actions: this.singleActions,
    };
  }

  @computed
  get singleActions(): ICallAction[] {
    const actionInfo = this._callAction.announcementInfo;
    if (!actionInfo) return [];

    const { session, meta, call } = actionInfo;
    const { isOnMute = false, isOnHold = false } = session;

    if (!call) return [];
    const disabled = meta?.actionsDisabled;
    const ringing = isRingingCall(call);
    const otherDevice = isOtherDeviceCall(call);
    const actions: ICallAction[] = [];

    if (ringing) {
      if (otherDevice) {
        if (this._callingSettings.isWebphoneMode) {
          actions.push({ type: 'switch', disabled });
        }

        actions.push({ type: 'voicemail', disabled });
        return actions;
      }

      const beQueueCall = isQueueCall(call);
      if (beQueueCall) {
        return [
          { type: 'ignoreQueue', disabled },
          { type: 'answer', disabled },
        ];
      }

      return [
        { type: 'voicemail', disabled },
        { type: 'answer', disabled },
      ];
    }

    actions.push({
      type: isOnMute ? 'unmute' : 'mute',
      disabled: isOnHold || disabled,
    });

    if (otherDevice && this._callingSettings.isWebphoneMode) {
      actions.push({ type: 'switch', disabled });
    }

    actions.push({ type: 'hangUp', disabled });
    return actions;
  }

  @computed
  get multipleActions(): ICallAction[] {
    const actions: ICallAction[] = [];

    const actionInfo = this._callAction.announcementInfo;
    const call = actionInfo?.call;

    const disabled = actionInfo?.meta?.actionsDisabled;

    if (call && isOtherDeviceCall(call)) {
      if (this._callingSettings.isWebphoneMode) {
        actions.push({ type: 'switch', disabled });
      }
    } else {
      if (this.swapCalls.length > 0) actions.push({ type: 'swap', disabled });
      if (this.mergeCalls.length > 0) actions.push({ type: 'merge', disabled });
    }

    actions.push({ type: 'callList' });
    return actions;
  }

  getUIFunctions(): UIFunctions<
    SetOptional<
      QuickCallActionViewPanelProps,
      'onSwapMenuOpen' | 'onMergeMenuOpen'
    >
  > {
    const onAction: OnCallActionType = async (actionType, value) => {
      const telephonySessionId =
        this._callAction.announcementInfo?.call?.telephonySessionId;

      const handler = this._callAction.createActionsHandler(telephonySessionId);

      switch (actionType) {
        case 'swap':
          if (this.swapCalls.length > 1) {
            this.swapMenuOpened$.next(true);

            return;
          }

          if (this.swapCalls.length === 1) {
            // swap to another call
            const swapId = this.swapCalls[0]?.telephonySessionId;

            if (!swapId) return;

            await handler('startSwap', swapId);
            return;
          }
          break;
        default:
          await handler(actionType, value);
          break;
      }

      return false;
    };

    return {
      onAction,
    };
  }

  component(props: QuickCallActionViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());
    const swapMenuOpened = useObservableState(this.swapMenuOpened$, false);
    const mergeMenuOpened = useObservableState(this.mergeMenuOpened$, false);

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });

    if ('hidden' in _props) {
      return null;
    }

    const Component =
      this._QuickCallActionViewOptions?.component || QuickCallActionPanel;

    return (
      <Component
        swapMenuOpened={swapMenuOpened}
        onSwapMenuOpen={(opened) => {
          this.swapMenuOpened$.next(opened);
        }}
        mergeMenuOpened={mergeMenuOpened}
        onMergeMenuOpen={(opened) => {
          this.mergeMenuOpened$.next(opened);
        }}
        {..._props}
        {...uiFunctions}
      />
    );
  }
}
