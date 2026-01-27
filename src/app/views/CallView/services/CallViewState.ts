import type { SmartNotes } from '@ringcentral-integration/ai-notes/src/app/services';
import type { Call as ICall } from '@ringcentral-integration/commons/interfaces/Call.interface';
import {
  action,
  computed,
  delegate,
  dynamic,
  fromWatchValue,
  injectable,
  optional,
  PortManager,
  RcModule,
  RouterPlugin,
  state,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { tap } from 'rxjs';

import type { Recipient } from '../../../services/Call';
import { CallHistory, HistoryCall } from '../../../services/CallHistory';
import { CallLogTasks } from '../../../services/CallLogTasks';
import { CallMonitor } from '../../../services/CallMonitor';

interface CallViewStateData {
  // Keypad view state
  keypadToNumber: string;
  // Transfer view state
  transferToNumber: string;
  transferRecipients: Recipient[];
  // Reply with message state
  replayMessage: string;
  // Forward view state
  forwardToNumber: string;
  forwardRecipients: Recipient[];
}

const DEFAULT_STATE = {
  keypadToNumber: '',
  transferToNumber: '',
  transferRecipients: [],
  replayMessage: '',
  forwardToNumber: '',
  forwardRecipients: [],
};

export type CallViewType =
  | 'hidden'
  | 'callList'
  | 'addCall'
  | 'activeCall'
  | 'postCall';

function extractIdFromHistoryRoute(route: string): string | null {
  const match = route.match(/\/history\/(.+)/);
  return match ? match[1] : null;
}

@injectable({
  name: 'CallViewState',
})
export class CallViewState extends RcModule {
  @dynamic('SmartNotes')
  protected readonly _smartNotes?: SmartNotes;

  @state
  view: CallViewType = 'hidden';

  @action
  _setView(val: CallViewType) {
    this.view = val;
  }

  @delegate('server')
  async setView(val: CallViewType) {
    this._setView(val);
  }

  @state
  private states: Record<string, CallViewStateData> = {};

  @action
  private _setCallViewState(
    telephonySessionId: string,
    state: Partial<CallViewStateData>,
  ) {
    this.states[telephonySessionId] = {
      ...(this.states[telephonySessionId] || DEFAULT_STATE),
      ...state,
    };
  }

  @delegate('server')
  async setCallViewState(
    telephonySessionId: string,
    state: Partial<CallViewStateData>,
  ) {
    this._setCallViewState(telephonySessionId, state);
  }

  @action
  private _clearCallViewState(telephonySessionId: string) {
    delete this.states[telephonySessionId];
  }

  getCallViewState(telephonySessionId: string): CallViewStateData {
    return this.states[telephonySessionId] || DEFAULT_STATE;
  }

  @state
  postCallViewTelephonySessionId: string | null = null;

  @action
  setPostCallViewTelephonySessionId(val: string | null) {
    this.postCallViewTelephonySessionId = val;
  }

  @action
  _setPostCallView(telephonySessionId: string | null) {
    this.setPostCallViewTelephonySessionId(telephonySessionId);

    if (telephonySessionId) {
      this._setView('postCall');
    }
  }

  @delegate('server')
  async setPostCallView(telephonySessionId: string | null) {
    this._setPostCallView(telephonySessionId);
  }

  inCallDetailRouteTelephonySessionId() {
    return extractIdFromHistoryRoute(this._router.currentPath);
  }

  /**
   * the call log history data render at the call detail page
   */
  @computed
  get callDetailCallLog() {
    const telephonySessionId = this.inCallDetailRouteTelephonySessionId();

    return this.getHistoryWithExtraLog(telephonySessionId);
  }

  callDetailCallLog$ = fromWatchValue(this, () => this.callDetailCallLog);

  /**
   * the post call data render at the post call view
   */
  @computed
  get postCallCallLog() {
    return this.getHistoryWithExtraLog(this.postCallViewTelephonySessionId);
  }

  postCallCallLog$ = fromWatchValue(this, () => this.postCallCallLog);

  constructor(
    private _router: RouterPlugin,
    private _portManager: PortManager,
    private _callMonitor: CallMonitor,
    private _callHistory: CallHistory,
    @optional() private _callLogTasks?: CallLogTasks,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindClearFormListener();
      });
    } else {
      this.bindClearFormListener();
    }
  }

  private bindClearFormListener() {
    // when call ended, clear the call view state
    this._callMonitor
      .addListener('CallEnded')
      .pipe(
        tap((call) => {
          this._clearCallViewState(call.telephonySessionId!);
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  getExtraLogData(sessionId: string, telephonySessionId: string) {
    const callLogTasks = this._callLogTasks;
    const smartNotes = this._smartNotes;

    const extraLogData =
      callLogTasks || smartNotes
        ? {
            isLogged: callLogTasks?.loggedMap[sessionId],
            callSelectionInfo: callLogTasks?.callSelectionMap[sessionId],
            hasSmartNote: smartNotes?.aiNotedCallMapping[telephonySessionId],
          }
        : undefined;

    return extraLogData;
  }

  getHistoryWithExtraLog(telephonySessionId: string | null | undefined) {
    if (!telephonySessionId) return undefined;
    const callLog =
      this._callHistory.getHistoryByTelephonySessionId(telephonySessionId);

    if (!callLog) return undefined;

    const sessionId = callLog.sessionId;
    const extraLogData = this.getExtraLogData(sessionId, telephonySessionId);

    return { ...callLog, ...extraLogData } as HistoryCall;
  }

  getCallWithExtraLog(sessionId: string | null | undefined) {
    if (!sessionId) return undefined;

    const call = this._callMonitor.getCallBySessionId(sessionId!);

    if (!call) return undefined;

    const telephonySessionId = call.telephonySessionId;
    const extraLogData = this.getExtraLogData(sessionId, telephonySessionId!);

    return { ...call, ...extraLogData } as ICall;
  }
}
