import type { SmartNotes } from '@ringcentral-integration/ai-notes/src/app/services';
import type { SmartNotesView } from '@ringcentral-integration/ai-notes/src/app/views';
import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import {
  isInbound,
  isOutbound,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import {
  RateLimiter,
  RingCentralExtensions,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  AppFooterNav,
  AppMainContent,
  ExpandedLayoutPopper,
  ToastPositionAdjustor,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  CallLogSyncTabId,
  ModalRef,
  SyncTabId,
  SyncTabProps,
  SyncTabView,
  VIEW_TRANSITION_DETAIL_IDENTIFY,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  action,
  autobind,
  computed,
  delegate,
  dynamic,
  fromWatch,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  Root,
  state,
  takeUntilAppDestroy,
  useConnector,
} from '@ringcentral-integration/next-core';
import { Divider } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';
import React, { type FC, useLayoutEffect, useMemo, useRef } from 'react';
import {
  combineLatest,
  defer,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  merge,
  mergeMap,
  NEVER,
  of,
  pipe,
  share,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

import {
  ActiveCallControl,
  CallAction,
  type CallMetaInfo,
  CallMonitor,
  HistoryCall,
  isHoldingCall,
  isOtherDeviceCall,
  isQueueCall,
  isRingingCall,
  PreinsertCall,
  useActiveCallInfoWithPreinsert,
  useLatestExistCall,
  Webphone,
} from '../../services';
import type { CallLogFormViewProps } from '../CallLogFormView';
import { CallLogFormView } from '../CallLogFormView';
import { QuickCallActionView } from '../QuickCallActionView';

import type { CallViewOptions } from './Call.view.interface';
import i18n from './i18n';
import { ActiveCallsView } from './routes/ActiveCallsViewSpring';
import { AddCallView } from './routes/AddCallViewSpring';
import { CallControlView } from './routes/CallControlViewSpring';
import { ForwardView } from './routes/ForwardViewSpring';
import { IncomingCallView } from './routes/IncomingCallViewSpring';
import { KeypadView } from './routes/KeypadViewSpring';
import { PostCallView } from './routes/PostCallViewSpring';
import { ReplyWithMessageView } from './routes/ReplyWithMessageViewSpring';
import { TransferView } from './routes/TransferViewSpring';
import { CallViewState } from './services';

const FullWrapper: FC = ({ children }) => (
  <>
    {/* <FocusTrap open> */}
    <div
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className="absolute top-0 left-0 size-full z-drawer flex flex-col"
    >
      {children}
    </div>
    {/* </FocusTrap> */}
    <AppFooterNav />
  </>
);

@injectable({
  name: 'CallView',
})
export class CallView extends RcViewModule implements ModalRef {
  @state
  closedOtherTelephonySessionId: string | null = null;

  @action
  private _setClosedOtherTelephonySessionId(val: string) {
    this.closedOtherTelephonySessionId = val;
  }

  @delegate('server')
  async setClosedOtherTelephonySessionId(val: string) {
    this._setClosedOtherTelephonySessionId(val);
  }

  @computed
  get showQuickCallAction() {
    switch (this._callViewState.view) {
      case 'callList':
        return false;
      case 'addCall':
        return true;
      default:
        return this._callAction.hasHiddenCalls;
    }
  }

  get isShowPostCallView() {
    return this._callViewOptions?.showPostCallView ?? true;
  }

  get defaultCallLogFormExpanded() {
    return (
      this._callAction.expandedAbility &&
      (this._callViewOptions?.defaultCallLogFormExpanded ?? true)
    );
  }

  @dynamic('SmartNotes')
  protected readonly _smartNotes?: SmartNotes;

  @dynamic('SmartNotesView')
  protected readonly _smartNotesView?: SmartNotesView;

  constructor(
    private _callAction: CallAction,
    private _callMonitor: CallMonitor,
    private _syncTabView: SyncTabView,
    private _root: Root,
    private _callViewState: CallViewState,
    private _keypadView: KeypadView,
    private _incomingCallView: IncomingCallView,
    private _activeCallsView: ActiveCallsView,
    private _transferView: TransferView,
    private _callControlView: CallControlView,
    private _forwardView: ForwardView,
    private _replyWithMessageView: ReplyWithMessageView,
    private _postCallView: PostCallView,
    private _addCallView: AddCallView,
    private _quickCallActionView: QuickCallActionView,
    private _activeCallControl: ActiveCallControl,
    private _preInsertCall: PreinsertCall,
    private _portManager: PortManager,
    private _ringCentralExtensions: RingCentralExtensions,
    private _rateLimiter: RateLimiter,
    private _webphone: Webphone,
    @optional() private _callLogFormView?: CallLogFormView,
    @optional('CallViewOptions')
    private _callViewOptions?: CallViewOptions,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindCallListeners();
      });
      this._portManager.onMainTab(() => {
        this.bindBeforeunload();
      });
      this._portManager.onClient(() => {
        this.initWebphoneEvent();
      });
    } else {
      this.bindCallListeners();
      this.bindBeforeunload();
      this.initWebphoneEvent();
    }
  }

  private bindCallListeners() {
    const newCallProcess$ = this._callMonitor.addListener('NewCall').pipe(
      mergeMap((call) => {
        this.logger.log('new call', call);

        const outboundCall = isOutbound(call);
        const newTelephonySessionId = call.telephonySessionId!;

        const currentCallEnd$ = this._callMonitor.addListener('CallEnded').pipe(
          filter(
            (currCall) => currCall.telephonySessionId === newTelephonySessionId,
          ),
          tap((currCall) => {
            this.logger.log(`call ended`, {
              currCall,
              newTelephonySessionId,
              allCalls: this._callMonitor.allCalls,
            });

            this._callAction.trackCallEventResult(currCall);

            const result = this.processShowPostCallView(
              newTelephonySessionId,
              currCall,
            );

            if (!result) {
              this._callAction._remove(newTelephonySessionId);
            }
          }),
        );

        const untilCallEnd = pipe(
          // use NEVER to keep the subscription alive for the takeUntil always listen the call end event
          switchMap(() => NEVER),
          takeUntil(currentCallEnd$),
        );

        const newCall$ = defer(() => {
          this.processNewCall(call);

          const newCallTelephonyStatus = call.telephonyStatus;
          const isRingingView =
            !outboundCall && newCallTelephonyStatus === 'Ringing';

          return of(isRingingView);
        });

        if (outboundCall) {
          this.logger.log(`new outbound call`);

          return newCall$.pipe(untilCallEnd);
        }

        const call$ = this._callAction
          .fromCallAllInfo(newTelephonySessionId)
          .pipe(
            map((info) => info?.call),
            distinctUntilChanged(),
            share(),
          );

        // from have webphone session to not have webphone session, means be ignored
        const ignored$ = call$.pipe(
          filter((_call) => Boolean(_call && _call.webphoneSession)),
          take(1),
          switchMap(() => call$),
          filter((_call) => Boolean(_call && !_call.webphoneSession)),
        );

        const currentCallConnected$ = this._callMonitor
          .addListener('CallUpdated')
          .pipe(
            filter((call) => call.telephonySessionId === newTelephonySessionId),
            filter((call) => call.telephonyStatus === 'CallConnected'),
            tap(() => {
              this.logger.log(`inbound call connected`);
            }),
            share(),
          );

        this.logger.log(`new inbound call`);

        return newCall$.pipe(
          switchMap((isRingingView) => {
            // only be ringing view need to wait for call connected
            return isRingingView
              ? merge(
                  currentCallConnected$.pipe(
                    take(1),
                    switchMap(async () => {
                      await this._callAction.openAndNavigate(
                        newTelephonySessionId,
                        {
                          currentPath: 'controls',
                          minimized: false,
                        },
                        {
                          view: 'activeCall',
                        },
                      );
                    }),
                  ),
                  ignored$.pipe(
                    take(1),
                    tap((call) => {
                      this.logger.log(`call webphone be ignored`, call);
                      this._callAction.updateCallMetaInfo(
                        newTelephonySessionId,
                        {
                          open: false,
                          minimized: false,
                        },
                      );
                    }),
                    takeUntil(currentCallConnected$),
                  ),
                )
              : NEVER;
          }),
          untilCallEnd,
        );
      }),
      takeUntilAppDestroy,
    );

    const callListProcess$ = combineLatest([
      fromWatch(this, () => this._callViewState.view).pipe(
        tap((view) => {
          // once view become the callList, close all incoming calls
          if (view === 'callList') {
            this._callAction.closeAllIncomingCalls();
          }
        }),
      ),
      fromWatch(this, () => this._callMonitor.allCalls.length),
    ]).pipe(
      tap(([view, length]) => {
        // when call become only have one call, back to active call view
        if (
          (view === 'callList' && length <= 1) ||
          (view === 'addCall' && length === 0)
        ) {
          return this._callViewState._setView('activeCall');
        }

        return EMPTY;
      }),
      takeUntilAppDestroy,
    );

    const expandedCallProcess$ = fromWatch(
      this,
      () =>
        [
          this._callAction.displayCallAllInfo,
          this._callViewState.view,
        ] as const,
      {
        multiple: true,
      },
    ).pipe(
      map(([info, view]) => {
        const beQueueCall = info?.call && isQueueCall(info.call);
        const telephonySessionId = info?.call?.telephonySessionId;
        const meta = info?.meta;

        return {
          id: telephonySessionId,
          expanded:
            meta &&
            // only expanded when info be open
            meta.open &&
            // only when view is activeCall and expanded able to show
            view === 'activeCall' &&
            // minimized mode never show expanded panel
            !meta.minimized &&
            // when queue call only when controls path is not `incoming`
            (beQueueCall
              ? meta.currentPath !== 'incoming' && meta.expanded
              : meta.expanded),
        };
      }),
      // only when id or expanded change, need to update the expanded state
      distinctUntilChanged((prev, curr) => isEqual(prev, curr)),
      tap((state) => {
        this.logger.log(`display call change`, state);
      }),
      tap(({ id, expanded }) => {
        this.processExpandedCall(id, expanded);
      }),
      takeUntilAppDestroy,
    );

    newCallProcess$.subscribe();
    callListProcess$.subscribe();
    this._callAction.fullScreenCallActionOpened$
      .pipe(takeUntilAppDestroy)
      .subscribe();

    if (this.defaultCallLogFormExpanded) expandedCallProcess$.subscribe();
  }

  /**
   * use one action to batch the dispatch action in once
   */
  @action
  private processNewCall(call: Call) {
    const inbound = isInbound(call);
    const newTelephonySessionId = call.telephonySessionId!;
    const newCallTelephonyStatus = call.telephonyStatus;

    const actions = this._callAction.actions;
    const activeSessionId = this._activeCallControl.activeSessionId;
    const outbound = !inbound;
    // when new outbound but have existing call, hold existing call
    if (
      outbound &&
      // when be conference call, the exist active call will be terminated, not need hold
      !call.isConferenceCall &&
      activeSessionId &&
      newTelephonySessionId !== activeSessionId
    ) {
      const activeCall = this._callAction.activeCallInfo?.call;

      if (
        // new call is outbound, and curr call be active call and not in other device, then should hold current call
        activeCall &&
        activeCall.telephonySessionId !== newTelephonySessionId &&
        !isOtherDeviceCall(activeCall) &&
        !isHoldingCall(activeCall) &&
        !isRingingCall(activeCall)
      ) {
        actions.hold(activeSessionId);
      }

      this._callAction._updateCallMetaInfo(activeSessionId, {
        open: false,
        minimized: false,
      });
    }

    const isRingingView = inbound && newCallTelephonyStatus === 'Ringing';

    this._callAction['_openAndNavigate'](
      newTelephonySessionId,
      {
        currentPath: isRingingView ? 'incoming' : 'controls',
        minimized: isRingingView
          ? this._callAction.existRingingOpenCallMetaInfo?.meta?.minimized ??
            true
          : false,
      },
      {
        closeOtherActives: !inbound,
        view: isRingingView ? undefined : 'activeCall',
      },
    );
    this.logger.log(`openAndNavigate`, newTelephonySessionId);
  }

  // for batch the action in once
  @action
  private processExpandedCall(
    id: string | undefined,
    expanded: boolean | null | undefined,
  ) {
    if (!id || expanded === undefined) {
      this._root['_setExpanded'](false);

      return;
    }

    if (expanded === null) {
      // when first time
      this._callAction['_updateCallMetaInfo'](id, {
        expanded: true,
      });
      return;
    }

    // when expanded state change, update the expanded state to target call
    if (this._root.expanded !== expanded) {
      this._root['_setExpanded'](expanded);
    }
  }

  private processWarmTransferEnd(
    newTelephonySessionId: string,
    currCall: Call,
  ) {
    const warnTransferringData =
      this._activeCallControl.transferCallMapping[currCall.telephonySessionId!];

    if (!warnTransferringData) return;

    const isDisplayCall =
      this._callAction.isFullSizeDisplayCall(newTelephonySessionId) ||
      this._callAction.isFullSizeDisplayCall(
        warnTransferringData.relatedTelephonySessionId,
      );

    if (isDisplayCall) {
      this._callAction._updateCallMetaInfo(
        warnTransferringData.relatedTelephonySessionId,
        {
          open: true,
        },
      );
    }

    if (!warnTransferringData.isOriginal) {
      this.logger.log(
        `warn transferring related call end, original call be`,
        warnTransferringData.relatedTelephonySessionId,
      );

      return warnTransferringData.relatedTelephonySessionId;
    } else {
      this.logger.log(
        `warn transferring original call end`,
        newTelephonySessionId,
      );
      return newTelephonySessionId;
    }
  }

  private processShowPostCallView(
    newTelephonySessionId: string,
    currCall: Call,
  ) {
    const transferringOriginalTelephonySessionId = this.processWarmTransferEnd(
      newTelephonySessionId,
      currCall,
    );

    if (!this.isShowPostCallView) return;

    if (
      this._preInsertCall.isBringInPartyPreinsertStatus(newTelephonySessionId)
    ) {
      this.logger.log(
        `bring in party conference call ended, not into history page`,
      );

      return;
    }

    const isDisplayCall = this._callAction.isFullSizeDisplayCall(
      newTelephonySessionId,
    );

    if (!isDisplayCall) return;

    const transferringOriginalInfo =
      transferringOriginalTelephonySessionId &&
      this._callAction.getAllInfoByTelephonySessionId(
        transferringOriginalTelephonySessionId,
      );

    const shouldIntoPostCall = transferringOriginalInfo
      ? // if that be transferring original call, only when that be connected able to into post call page, because when hangup the transfer target directly, that not need into post call page, keep in original call page
        ['CallConnected'].includes(
          transferringOriginalInfo.call?.telephonyStatus as string,
        )
      : ['CallConnected', 'OnHold'].includes(
          currCall.telephonyStatus as string,
        );

    if (!shouldIntoPostCall) return;

    const targetTelephonySessionId =
      transferringOriginalTelephonySessionId || newTelephonySessionId;
    this.logger.log(`redirect to post call page`, targetTelephonySessionId);

    this._callViewState._setPostCallView(targetTelephonySessionId);

    return newTelephonySessionId;
  }

  private async initWebphoneEvent() {
    this._webphone.onWebphoneRegistered(async () => {
      if (!this._rateLimiter.restricted && this._ringCentralExtensions) {
        try {
          this.logger.log('[onWebphoneRegistered] recover websocket');
          await this._ringCentralExtensions.recoverWebSocketConnection();
        } catch (ex) {
          this.logger.warn('[onWebphoneRegistered]', ex);
        }
      }
    });
  }

  private bindBeforeunload() {
    globalThis.window.addEventListener('beforeunload', (event) => {
      const calling = this._webphone.sessions.length > 0;
      if (calling) {
        event.preventDefault();
        event.returnValue = true;
      }
    });
  }

  @computed
  get enableSmartNote() {
    // if project provide the brandAllowsSmartNotes, and not support smart notes, early return false
    if (this._callViewOptions?.brandAllowsSmartNotes === false) {
      return false;
    }

    return !!this._smartNotes && !!this._smartNotesView;
  }

  @autobind
  CallDetailForm({ variant = 'history', info }: CallLogFormViewProps) {
    const { t } = useLocale(i18n);

    const afterCallEnd = variant === 'history' || variant === 'postCall';

    const tabs = useMemo(() => {
      const result: SyncTabProps['tabs'] = [];
      if (!info) return result;

      // call log form
      if (this._callLogFormView) {
        result.push({
          id: CallLogSyncTabId.LOG,
          label: t('callLogTitle'),
          component: (
            <this._callLogFormView.component variant={variant} info={info} />
          ),
        });
      }

      // smart note
      if (this.enableSmartNote) {
        if (afterCallEnd && (info as HistoryCall).hasSmartNote) {
          result.push({
            id: CallLogSyncTabId.AI_NOTE,
            label: t('aiNoteTitleInHistory'),
            component: this._smartNotesView ? (
              <this._smartNotesView.component
                variant={afterCallEnd ? 'history' : 'expanded'}
                info={info!}
                mode="post-call"
                data-sign="ai-notes-panel"
                data-tab-type="history"
              />
            ) : null,
          });
        } else if (variant === 'expanded' && this._smartNotes?.hasPermission) {
          result.push({
            id: CallLogSyncTabId.AI_NOTE,
            label: t('aiNoteTitleInActiveCall'),
            component: this._smartNotesView ? (
              <this._smartNotesView.component
                variant={variant}
                info={info!}
                mode="in-call"
                data-sign="ai-notes-panel"
                data-tab-type="active-call"
              />
            ) : null,
          });
        }
      }

      return result;
    }, [info, afterCallEnd, t, variant]);

    if (tabs.length === 0) {
      return null;
    }

    return (
      <>
        {tabs.length === 1 ? (
          <>
            {variant !== 'expanded' && <Divider className="mx-4" />}
            {tabs[0].component}
          </>
        ) : (
          <this._syncTabView.component
            id={SyncTabId.CALL_LOG}
            data-sign="call-log-tabs"
            variant="standard"
            pill={afterCallEnd}
            tabs={tabs}
            className={clsx('flex-none', afterCallEnd && 'px-4')}
            tabClassName="flex-none w-auto"
            tabRootClassName="h-8"
          />
        )}
      </>
    );
  }

  @autobind
  private CallLogArea() {
    const { expanded, info, view, postCallCallLog } = useConnector(() => ({
      postCallCallLog: this._callViewState.postCallCallLog,
      info: this._callAction.displayCallAllInfo,
      view: this._callViewState.view,
      expanded: this._root.expanded,
    }));

    const curr = info || postCallCallLog;

    const isPostCall = view === 'postCall';
    const shouldRender =
      isPostCall ||
      (!isPostCall &&
        (expanded ||
          // when first time end call, the call will be dismiss, and expanded be false but still should keep the dom render to avoid user typing be interrupted
          !info?.call));
    const call = useLatestExistCall(info);

    const renderInfo = call || postCallCallLog;
    const logSectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (isPostCall) {
        const activeElement = document.activeElement;
        const logSection = logSectionRef.current;

        if (activeElement && logSection?.contains(activeElement)) {
          this.logger.log(
            'still active inside the log section, scroll into view',
          );

          activeElement.scrollIntoView();
        }
      }
    }, [isPostCall]);

    const open = curr && view !== 'hidden';

    /**
     * we use the same dom element to prevent the flicker when switch between call log and post call log
     */
    return (
      <>
        {open ? (
          <ExpandedLayoutPopper expanded={!isPostCall}>
            <div
              id={VIEW_TRANSITION_DETAIL_IDENTIFY}
              className="flex flex-col w-full h-full"
              data-sign={
                isPostCall ? 'post-log-panel' : 'during-call-log-panel'
              }
              data-call-log-id={renderInfo?.telephonySessionId}
            >
              {isPostCall ? (
                // the top info of post call log
                <div className="flex-none">
                  <this._postCallView.component variant="header" />
                </div>
              ) : null}

              <div
                ref={logSectionRef}
                data-sign="log-notes-transcript-section"
                className="pointer-events-auto flex-auto flex flex-col overflow-y-auto overflow-x-hidden"
              >
                {isPostCall && <this._postCallView.component variant="info" />}
                {
                  // when ever have call log, but both log not exist, means that redux still processing, keep the dom
                  shouldRender && (
                    <this.CallDetailForm
                      variant={isPostCall ? 'postCall' : 'expanded'}
                      info={renderInfo}
                    />
                  )
                }
              </div>
              {shouldRender && this._callLogFormView && (
                <>
                  <ToastPositionAdjustor>
                    <footer>
                      <this._callLogFormView.Save />
                    </footer>
                  </ToastPositionAdjustor>
                </>
              )}
            </div>
          </ExpandedLayoutPopper>
        ) : null}
      </>
    );
  }

  @autobind
  private CallItem({ call, meta }: { call?: Call; meta?: CallMetaInfo }) {
    if (!meta) {
      this.logger.error('meta not found', { call });

      return null;
    }

    const { open, currentPath } = meta;
    if (!open) return null;

    if (!call) {
      this.logger.error('call not found', { call });

      return null;
    }

    switch (currentPath) {
      case 'keypad':
        return (
          <FullWrapper>
            <this._keypadView.component call={call} {...meta} />
          </FullWrapper>
        );
      case 'incoming':
        return <this._incomingCallView.component call={call} {...meta} />;
      case 'controls':
        return (
          <FullWrapper>
            <this._callControlView.component call={call} {...meta} />
          </FullWrapper>
        );
      case 'transfer':
        return (
          <FullWrapper>
            <this._transferView.component call={call} {...meta} />
          </FullWrapper>
        );
      case 'forward':
        return (
          <FullWrapper>
            <this._forwardView.component call={call} {...meta} />
          </FullWrapper>
        );
      case 'reply':
        return (
          <FullWrapper>
            <this._replyWithMessageView.component call={call} {...meta} />
          </FullWrapper>
        );
      default:
        this.logger.error('unknown call path, should not happen', {
          currentPath,
          call,
          meta,
        });
        return null;
    }
  }

  @autobind
  Announcement() {
    const { showQuickCallAction } = useConnector(() => ({
      showQuickCallAction: this.showQuickCallAction,
    }));

    return showQuickCallAction ? <this._quickCallActionView.component /> : null;
  }

  @autobind
  IncomingCallList() {
    const { ringingCallInfoList } = useConnector(() => ({
      ringingCallInfoList: this._callAction.ringingCallInfoList,
    }));

    return (
      <AppMainContent>
        {ringingCallInfoList.map((info) => (
          <this.CallItem key={info.call.telephonySessionId} {...info} />
        ))}
      </AppMainContent>
    );
  }

  component() {
    const view = useConnector(() => this._callViewState.view);

    const activeRenderCallInfo = useActiveCallInfoWithPreinsert(
      this._callAction,
    );

    const modeView = useMemo(() => {
      switch (view) {
        case 'callList':
          return (
            <FullWrapper>
              <this._activeCallsView.component />
            </FullWrapper>
          );
        case 'addCall':
          return (
            <FullWrapper>
              <this._addCallView.component />
            </FullWrapper>
          );
        case 'activeCall': {
          // only show active call when not ringing call, ringing call will show in the ringing call list
          const notRingingCall =
            activeRenderCallInfo && !isRingingCall(activeRenderCallInfo.call);
          if (notRingingCall) {
            return <this.CallItem {...activeRenderCallInfo} />;
          }

          this.logger.error('wrong view', { view, activeRenderCallInfo });
          return null;
        }
        case 'postCall':
        case 'hidden':
          return null;
        default:
          this.logger.error('wrong view', { view });
          return null;
      }
    }, [activeRenderCallInfo, view]);

    return (
      <AppMainContent>
        {modeView}
        <this.CallLogArea />
      </AppMainContent>
    );
  }
}
