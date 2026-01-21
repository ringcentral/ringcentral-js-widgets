/* eslint-disable no-console */
import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { extendedControlStatus } from '@ringcentral-integration/commons/enums/extendedControlStatus';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type {
  NormalizedSession,
  WebphoneSession,
} from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { validateNumbers } from '@ringcentral-integration/commons/lib/validateNumbers';
import {
  AppFeatures,
  Auth,
  AvailabilityMonitor,
  Client,
  ExtensionDevice,
  ExtensionFeatures,
  RingCentralExtensions,
  RegionSettings,
  track,
  WebSocketSubscription as Subscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ContactMatcher,
  NumberValidate,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Brand,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  applyMethod,
  computed,
  delegate,
  fromWatchValue,
  getRef,
  Initiator,
  injectable,
  optional,
  PortManager,
  state,
  StoragePlugin,
  watch,
} from '@ringcentral-integration/next-core';
import { sleep } from '@ringcentral-integration/utils';
import { find } from 'ramda';
import type { InviteOptions } from 'ringcentral-web-phone/lib/userAgent';
import {
  filter,
  firstValueFrom,
  map,
  merge,
  of,
  race,
  share,
  Subject,
  switchMap,
  timer,
} from 'rxjs';

import { AudioSettings } from '../AudioSettings';

import type {
  BeforeCallEndHandler,
  BeforeCallResumeHandler,
  CallEndHandler,
  CallHoldHandler,
  CallInitHandler,
  CallResumeHandler,
  CallRingHandler,
  CallStartHandler,
  IncomingRequest,
  OffEventHandler,
  SessionReplyOptions,
  SwitchCallActiveCallParams,
  TPickupInboundCall,
  WebphoneOptions,
} from './Webphone.interface';
import { WebphoneBase } from './WebphoneBase';
import { EVENTS } from './events';
import { t } from './i18n';
import { recordStatus } from './recordStatus';
import { sessionStatus } from './sessionStatus';
import {
  extractHeadersData,
  isOnHold,
  isPickupReason,
  isRing,
  normalizeSession,
  sortByLastActiveTimeDesc,
} from './webphoneHelper';

export const INCOMING_CALL_INVALID_STATE_ERROR_CODE = 2;
const customClientDelegateName = 'customClientDelegateName';
const switchWebphoneInstanceName = 'switchWebphoneInstanceName';
const webphoneHandleTimeoutName = 'webphoneHandleTimeoutName';

export class NumberValidError extends Error {
  constructor() {
    super('validate phone numbers fail');
  }
}

@injectable({
  name: 'Webphone',
})
export class Webphone extends WebphoneBase {
  private get _permissionCheck() {
    return this._webphoneOptions?.permissionCheck ?? true;
  }

  readonly invite$ = new Subject<WebphoneSession>();

  private readonly _end$ = new Subject<
    [WebphoneSession, IncomingRequest | undefined]
  >();
  /**
   * # this event only work in main tab
   */
  readonly end$ = this._end$.pipe(
    // when have p-rc-reason, that means that call be switch to other device, should not emit the event
    filter(([_, e]) => !isPickupReason(e)),
    map(([session]) => session),
    share(),
  );

  private _ignore$ = new Subject<string>();

  get ignore$() {
    if (
      process.env.NODE_ENV !== 'production' &&
      this._portManager.shared &&
      !this._portManager.isServer
    ) {
      throw new Error(
        "ignore$ can't be used in client, should always call in server",
      );
    }

    return this._ignore$;
  }

  constructor(
    protected _initiator: Initiator,
    protected _regionSettings: RegionSettings,
    protected override _numberValidate: NumberValidate,
    protected override _auth: Auth,
    protected override _toast: Toast,
    protected override _client: Client,
    protected override _appFeatures: AppFeatures,
    protected override _extensionFeatures: ExtensionFeatures,
    protected override _brand: Brand,
    protected override _audioSettings: AudioSettings,
    protected override _storage: StoragePlugin,
    protected override _portManager: PortManager,
    protected override _extensionDevice: ExtensionDevice,
    protected override _ringCentralExtensions: RingCentralExtensions,
    @optional('WebphoneOptions')
    protected override _webphoneOptions: WebphoneOptions,
    @optional('Subscription')
    protected override _subscription?: Subscription,
    @optional()
    protected _contactMatcher?: ContactMatcher,
    @optional()
    protected _availabilityMonitor?: AvailabilityMonitor,
    @optional('Prefix') protected override _prefix?: string,
  ) {
    super(
      _brand,
      _auth,
      _toast,
      _client,
      _numberValidate,
      _appFeatures,
      _extensionFeatures,
      _extensionDevice,
      _audioSettings,
      _storage,
      _portManager,
      _ringCentralExtensions,
      _webphoneOptions,
      _subscription,
      _prefix,
    );
    globalThis.externalClearTimeout = clearTimeout;
    globalThis.externalSetTimeout = setTimeout;

    const enableContactMatchWhenNewCall =
      this._webphoneOptions?.enableContactMatchWhenNewCall ?? true;
    if (enableContactMatchWhenNewCall && this._contactMatcher) {
      this._contactMatcher.addQuerySource({
        getQueriesFn: () => this.sessionPhoneNumbers,
        readyCheckFn: () => this.ready,
      });
    }

    if (this._portManager.shared) {
      this._portManager.onMainTab(() => {
        let reloadResolve: (() => void) | null = null;
        return watch(
          this,
          () => this.hasCallSessions,
          () => {
            if (this.hasCallSessions) {
              this._initiator.reloadPromise = new Promise((resolve) => {
                reloadResolve = resolve;
              });
            } else {
              reloadResolve?.();
              reloadResolve = null;
              this._initiator.reloadPromise = null;
            }
          },
        );
      });
      if (!this._portManager.isWorkerMode) {
        this.useWebphoneMainTab();
        const handleWebphoneMainTab = async (options: any) => {
          if (!this.checkMainTab()) {
            return new Promise(() => {
              // do not resolve and it can't response if it's not custom main tab
            });
          }
          const module = getRef(this).modules![options.module];
          const result = await applyMethod(module, options);
          return result;
        };
        this._portManager.onClient((transport) => {
          if (!this._portManager.isWorkerMode) {
            // main tab should be auto-connected by default.
            this.isMainClient = false;
          }
          // TODO: fix type
          // @ts-ignore
          transport.listen(customClientDelegateName, handleWebphoneMainTab);
          window.addEventListener('pagehide', () => {
            if (this.checkMainTab()) {
              // @ts-ignore
              transport.emit(switchWebphoneInstanceName);
            }
          });
        });
        this._portManager.onServer((transport) => {
          // @ts-ignore
          transport.listen(customClientDelegateName, handleWebphoneMainTab);
          // @ts-ignore
          transport.listen(switchWebphoneInstanceName, async () => {
            await this.switchWebphoneInstance();
          });
        });
      } else {
        this._portManager.onClient((transport) => {
          let timeoutId = 0;
          const timeoutMap = new Map<number, () => void>();
          globalThis.externalSetTimeout = ((
            callback: (args: void) => void,
            timeout?: number,
          ): number => {
            timeoutId += 1;
            const currentTimeoutId = timeoutId;
            timeoutMap.set(currentTimeoutId, callback);
            transport
              .emit(
                {
                  name: 'webphoneHandleTimeoutName' as any,
                  // The transport response timeout should be longer than the external timer duration.
                  timeout: timeout! + 5 * 60 * 1000,
                },
                timeout,
              )
              .then(() => {
                const callback = timeoutMap.get(currentTimeoutId);
                if (callback) {
                  timeoutMap.delete(currentTimeoutId);
                  callback();
                }
              });
            return timeoutId;
          }) as typeof setTimeout;
          globalThis.externalClearTimeout = ((timeoutId: number) => {
            timeoutMap.delete(timeoutId);
          }) as typeof clearTimeout;
        });
        this._portManager.onServer((transport) => {
          // @ts-ignore
          transport.listen(webphoneHandleTimeoutName, async (timeout) => {
            // SIP.js issue: https://github.com/onsip/SIP.js/issues/1071
            // Workaround:
            // Heavy throttling of chained JS timers beginning in Chrome 88
            // Need to execute timer in shared worker
            // https://developer.chrome.com/blog/timer-throttling-in-chrome-88
            await sleep(timeout);
          });
        });
      }
    }
  }

  checkMainTab = () => this.isMainClient;

  useWebphoneMainTab(target: object = this) {
    if (this._portManager.shared && !this._portManager.isWorkerMode) {
      this._portManager.checkMainTabMapping.set(target, this.checkMainTab);
      this._portManager.customClientDelegateNameMapping.set(
        target,
        customClientDelegateName,
      );
    }
  }

  async switchWebphoneInstance(options: { forceDisconnect?: boolean } = {}) {
    const checkMainTab = this._portManager.checkMainTabMapping.get(this);
    if (checkMainTab && !checkMainTab()) {
      if (options.forceDisconnect) {
        await this.disconnect();
      } else {
        // just keep other tab webphone instance
        await this.setStateOnUnregistered();
        // TODO: handle to disconnect other tab webphone when call is answered
      }
      // do not use `await`, it has no response
      this.disableMainClient();
      // wait for main tab to disconnect
      this.isMainClient = true;
      await this.connect();
      return true;
    }
    return false;
  }

  protected override initialize(): void {
    super.initialize();
    if (typeof this._webphoneOptions?.onCallEnd === 'function') {
      this._eventEmitter.on(EVENTS.callEnd, this._webphoneOptions?.onCallEnd);
    }
    if (typeof this._webphoneOptions?.onCallRing === 'function') {
      this._eventEmitter.on(EVENTS.callRing, this._webphoneOptions?.onCallRing);
    }
    if (typeof this._webphoneOptions?.onCallStart === 'function') {
      this._eventEmitter.on(
        EVENTS.callStart,
        this._webphoneOptions?.onCallStart,
      );
    }
    if (typeof this._webphoneOptions?.onCallResume === 'function') {
      this._eventEmitter.on(
        EVENTS.callResume,
        this._webphoneOptions?.onCallResume,
      );
    }
    if (typeof this._webphoneOptions?.onCallHold === 'function') {
      this._eventEmitter.on(EVENTS.callHold, this._webphoneOptions?.onCallHold);
    }
    if (typeof this._webphoneOptions?.onCallInit === 'function') {
      this._eventEmitter.on(EVENTS.callInit, this._webphoneOptions?.onCallInit);
    }
    if (typeof this._webphoneOptions?.onBeforeCallResume === 'function') {
      this._eventEmitter.on(
        EVENTS.beforeCallResume,
        this._webphoneOptions?.onBeforeCallResume,
      );
    }
    if (typeof this._webphoneOptions?.onBeforeCallEnd === 'function') {
      this._eventEmitter.on(
        EVENTS.beforeCallEnd,
        this._webphoneOptions?.onBeforeCallEnd,
      );
    }

    this._reconnectAfterSessionEnd = null;
  }

  @state
  activeSessionId?: string | null = null;

  @state
  ringSessionId?: string | null = null;

  @state
  lastEndedSessions: NormalizedSession[] = [];

  @state
  sessions: NormalizedSession[] = [];

  @action
  private _updateSessionsState(sessions: NormalizedSession[]) {
    this.sessions.splice(
      0,
      this.sessions.length,
      ...sessions.sort(sortByLastActiveTimeDesc),
    );
  }

  @delegate('server')
  async updateSessionsState(sessions: NormalizedSession[]) {
    this._updateSessionsState(sessions);
  }

  @action
  _setActiveSessionId(sessionId: string) {
    this.activeSessionId = sessionId;
  }

  @delegate('server')
  async setActiveSessionId(sessionId: string) {
    this._setActiveSessionId(sessionId);
  }

  @action
  _setStateOnCallRing(session: NormalizedSession) {
    this.ringSessionId = session.id;
  }

  @delegate('server')
  async setStateOnCallRing(session: NormalizedSession) {
    this._setStateOnCallRing(session);
  }

  @action
  _setStateOnCallStart(session: NormalizedSession) {
    this.activeSessionId = session.id;
    if (this.ringSessionId === session.id) {
      const ringSessions = this.sessions.filter((x) => isRing(x));
      this.ringSessionId = (ringSessions[0] && ringSessions[0].id) || null;
    }
  }

  @delegate('server')
  async setStateOnCallStart(session: NormalizedSession) {
    this._setStateOnCallStart(session);
  }

  @action
  private _setStateOnCallEnd(session: NormalizedSession) {
    if (this.activeSessionId === session.id) {
      const activeSessions = this.sessions.filter((x) => !isRing(x));
      activeSessions.sort(sortByLastActiveTimeDesc);
      this.activeSessionId =
        (activeSessions[0] && activeSessions[0].id) || null;
    }
    if (this.ringSessionId === session.id) {
      const ringSessions = this.sessions.filter((x) => isRing(x));
      this.ringSessionId = (ringSessions[0] && ringSessions[0].id) || null;
    }
    if (
      /**
       * don't add incoming call that isn't relied by current app
       *   to end sessions. this call can be answered by other apps
       */
      !session.startTime &&
      !session.isToVoicemail &&
      !session.isForwarded &&
      !session.isReplied
    ) {
      return;
    }
    const lastSessions = [session].concat(
      this.lastEndedSessions.filter((x) => x.id !== session.id),
    );
    this.lastEndedSessions = lastSessions.slice(0, 5);
  }

  @delegate('server')
  async setStateOnCallEnd(session: NormalizedSession) {
    this._setStateOnCallEnd(session);
  }

  /**
   * the process when accept the call, both for inbound and outbound call
   */
  private _onAccepted(session: WebphoneSession) {
    this.logger.log('initWebphoneSessionEvents', session);

    session.on('accepted', async (incomingResponse) => {
      if (session.__rc_callStatus === sessionStatus.finished) {
        return;
      }
      this.logger.log('accepted');
      session.__rc_callStatus = sessionStatus.connected;
      extractHeadersData(session, incomingResponse.headers);
      await this._onCallStart(session);
      if (
        session.__rc_extendedControls &&
        session.__rc_extendedControlStatus === extendedControlStatus.pending
      ) {
        this._playExtendedControls(session);
      }
    });
    session.on('progress', async (incomingResponse) => {
      this.logger.log('progress...', incomingResponse);
      session.__rc_callStatus = sessionStatus.connecting;
      extractHeadersData(session, incomingResponse.headers);
      this.invite$.next(session);
      await this._updateSessions();
    });
    session.on('rejected', async () => {
      this.logger.log('rejected');
      session.__rc_callStatus = sessionStatus.finished;
      await this._onCallEnd(session);
    });
    session.on('failed', async (response, cause) => {
      this.logger.log('Failed', cause);
      session.__rc_callStatus = sessionStatus.finished;
      await this._onCallEnd(session);
    });
    session.on('terminated', async (e) => {
      this.logger.log('Terminated', e);
      this._end$.next([session, e]);
      session.__rc_callStatus = sessionStatus.finished;
      await this._onCallEnd(session);
    });
    session.on('cancel', async () => {
      this.logger.log('Cancel');
      session.__rc_callStatus = sessionStatus.finished;
      await this._onCallEnd(session);
    });
    // @ts-ignore
    session.on('replaced', async (newSession: WebphoneSession) => {
      this.logger.log('replaced', newSession);
      session.__rc_callStatus = sessionStatus.replaced;
      newSession.__rc_callStatus = sessionStatus.connected;
      newSession.__rc_direction = callDirections.inbound;
      await this._updateSessions();
      this._onAccepted(newSession);
    });
    session.on('muted', async () => {
      this.logger.log('Muted');
      session.__rc_isOnMute = true;
      session.__rc_callStatus = sessionStatus.onMute;
      await this._updateSessions();
    });
    session.on('unmuted', async () => {
      this.logger.log('Unmuted');
      session.__rc_isOnMute = false;
      session.__rc_callStatus = sessionStatus.connected;
      await this._updateSessions();
    });
    session.on('SessionDescriptionHandler-created', () => {
      // @ts-ignore
      session.sessionDescriptionHandler.on('userMediaFailed', () => {
        this._audioSettings.onGetUserMediaError();
      });
    });
  }

  override async _onInvite(session: WebphoneSession) {
    this.invite$.next(session);
    session.__rc_creationTime = Date.now();
    session.__rc_lastActiveTime = Date.now();
    session.__rc_direction = callDirections.inbound;
    session.__rc_callStatus = sessionStatus.connecting;
    extractHeadersData(session, session.request.headers);
    session.on('rejected', async () => {
      this.logger.log('Ringing Rejected');
      await this._onCallEnd(session);
    });
    session.on('terminated', async (e) => {
      this.logger.log('Ringing Terminated', e);
      this._end$.next([session, e]);
      await this._onCallEnd(session);
    });
    await this._onCallRing(session);
  }

  async _playExtendedControls(session: WebphoneSession) {
    session.__rc_extendedControlStatus = extendedControlStatus.playing;
    const controls = session.__rc_extendedControls!.slice();
    for (let i = 0, len = controls.length; i < len; i += 1) {
      if (
        session.__rc_extendedControlStatus === extendedControlStatus.playing
      ) {
        if (controls[i] === ',') {
          await sleep(2000);
        } else {
          await this.sendDTMF(controls[i], session.id);
        }
      } else {
        return;
      }
    }
    session.__rc_extendedControlStatus = extendedControlStatus.stopped;
  }

  @track(trackEvents.inboundWebRTCCallConnected)
  _trackCallAnswer() {
    //
  }

  @delegate('mainClient')
  async answer(sessionId: string) {
    const sipSession = this.originalSessions[sessionId];
    const session = this.sessions.find((session) => session.id === sessionId);
    if (!session || !isRing(session)) {
      return;
    }
    try {
      await this._holdOtherSession(sessionId);
      this._onAccepted(sipSession);
      await sipSession.accept(await this.getAcceptOptions());
      this._trackCallAnswer();
    } catch (e: any) {
      this.logger.log('Accept failed', e);
      if (e.code !== INCOMING_CALL_INVALID_STATE_ERROR_CODE) {
        // FIXME:
        // 2 means the call is answered
        await this._onCallEnd(sipSession);
      }
    }
  }

  @delegate('mainClient')
  async reject(sessionId: string) {
    const session = this.originalSessions[sessionId];
    const activeSession = this._getNormalizedSession(session);
    const isCallQueueCall = activeSession?.callQueueName;

    if (!session || session.__rc_callStatus === sessionStatus.finished) {
      return;
    }
    try {
      // If call is a callQueue call, specifically use session.ignore() to ignore it successfully
      // session.reject() creates the bug https://jira_domain/browse/RCINT-39616
      if (isCallQueueCall) {
        await session.ignore();
        return;
      }
      await session.reject();
      this.emitIgnoreEvent(sessionId);
    } catch (e) {
      this.logger.log('reject fail', e);
      await this._onCallEnd(session);
    }
  }

  // ignore not have socket event, because that be current device behaviors, so emit ignore event for outside know that
  @delegate('server')
  private async emitIgnoreEvent(sessionId: string) {
    this._ignore$.next(sessionId);
  }

  @delegate('mainClient')
  async resume(sessionId: string) {
    await this.unhold(sessionId);
  }

  @delegate('mainClient')
  async forward(sessionId: string, forwardNumber: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return false;
    }
    try {
      let validatedResult;
      let validPhoneNumber;
      if (!this._permissionCheck) {
        validatedResult = validateNumbers({
          allowRegionSettings: !!this._brand.brandConfig.allowRegionSettings,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          phoneNumbers: [forwardNumber],
        });
        validPhoneNumber = validatedResult[0];
      } else {
        const isEDPEnabled = this._appFeatures.isEDPEnabled;
        validatedResult = isEDPEnabled
          ? this._numberValidate.validate([forwardNumber])
          : await this._numberValidate.validateNumbers([forwardNumber]);

        if (!validatedResult.result) {
          this._numberValidate.handleValidateToasts(validatedResult);
          return false;
        }
        if (isEDPEnabled) {
          const parsedNumbers = await this._numberValidate.parseNumbers([
            forwardNumber,
          ]);
          if (parsedNumbers) {
            validPhoneNumber =
              parsedNumbers[0].availableExtension ??
              parsedNumbers[0].parsedNumber;
          }
        } else {
          // TODO: fix type
          // @ts-ignore
          validPhoneNumber = validatedResult.numbers?.[0]?.e164;
        }
      }
      session.__rc_isForwarded = true;
      await session.forward(
        validPhoneNumber,
        await this.getAcceptOptions(),
        {},
      );
      this.logger.log('Forwarded successfully');
      await this._onCallEnd(session);
      this._addTrackAfterForward();
      return true;
    } catch (e) {
      this.logger.error(`forward fail`, e);
      this._toast.warning({
        message: t('failWithoutStatusCode', {
          brandName: this._brand.name,
        }),
      });
      this._addTrackAfterForward();
      return false;
    }
  }

  _addTrackAfterForward() {
    if (this.activeSession && !this.activeSession.isOnHold) {
      const rawActiveSession = this.originalSessions[this.activeSession.id];
      this._addTrack(rawActiveSession);
    }
  }

  @delegate('mainClient')
  async mute(
    sessionId: string,
    errorHandler?: (error: any) => void | Promise<void>,
  ) {
    try {
      this._sessionHandleWithId(sessionId, async (session: WebphoneSession) => {
        session.__rc_isOnMute = true;
        session.mute();
        await this._updateSessions();
      });
      return true;
    } catch (e) {
      this.logger.error(`mute fail`, e);
      if (errorHandler) {
        errorHandler(e);
      } else {
        this._toast.warning({
          message: t('muteError'),
        });
      }
      return false;
    }
  }

  @delegate('mainClient')
  async unmute(sessionId: string) {
    this._sessionHandleWithId(sessionId, async (session: WebphoneSession) => {
      session.__rc_isOnMute = false;
      session.unmute();
      await this._updateSessions();
    });
  }

  @delegate('mainClient')
  async hold(
    sessionId: string,
    errorHandler?: (error: any) => void | Promise<void>,
  ) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return false;
    }
    if (session.localHold) {
      return true;
    }
    try {
      await session.hold();
      session.__rc_callStatus = sessionStatus.onHold;
      await this._updateSessions();
      this._onCallHold(session);
      return true;
    } catch (e) {
      this.logger.error(`hold error:`, e);
      if (errorHandler) {
        errorHandler(e);
      } else {
        this._toast.warning({
          message: t('holdError'),
        });
      }
      return false;
    }
  }

  async _holdOtherSession(currentSessionId: string | null) {
    await Promise.all(
      Object.values(this.originalSessions).map(
        async (session: WebphoneSession) => {
          if (currentSessionId === session.id) {
            return;
          }
          if (session.localHold) {
            return;
          }
          if (session.__rc_callStatus === sessionStatus.connecting) {
            return;
          }

          await session.hold();
          session.__rc_callStatus = sessionStatus.onHold;
          this._onCallHold(session);
        },
      ),
    );
    await this._updateSessions();
  }

  @delegate('mainClient')
  async unhold(
    sessionId: string,
    errorHandler?: (error: any) => Promise<void> | void,
  ) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      if (session.localHold) {
        await this._holdOtherSession(session.id);
        this._onBeforeCallResume(session);
        await session.unhold();
        session.__rc_callStatus = sessionStatus.connected;
        await this._updateSessions();
        await this._onCallResume(session);
      }
    } catch (e) {
      this.logger.log(`unhold fail`, e);
      errorHandler?.(e);
    }
  }

  @delegate('mainClient')
  async startRecord(sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    // If the status of current session is not connected,
    // the recording process can not be started.
    if (session.__rc_callStatus === sessionStatus.connecting) {
      return;
    }
    try {
      session.__rc_recordStatus = recordStatus.pending;
      await this._updateSessions();
      await session.startRecord();
      session.__rc_recordStatus = recordStatus.recording;
      await this._updateSessions();
    } catch (e: any) {
      this.logger.error(`start record fail`, e);
      session.__rc_recordStatus = recordStatus.idle;
      await this._updateSessions();
      // Recording has been disabled
      if (e && e.code === -5) {
        this._toast.danger({
          message: t('recordDisabled'),
        });
        // Disabled phone recording
        session.__rc_recordStatus = recordStatus.noAccess;
        await this._updateSessions();
        return;
      }
      this._toast.danger({
        message: t('recordError', {
          errorCode: e.code,
        }),
      });
    }
  }

  @delegate('mainClient')
  async stopRecord(
    sessionId: string,
    errorHandler?: (error: any) => void | Promise<void>,
  ) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      session.__rc_recordStatus = recordStatus.pending;
      await this._updateSessions();
      await session.stopRecord();
      session.__rc_recordStatus = recordStatus.idle;
      await this._updateSessions();
    } catch (e) {
      this.logger.error(`stop record fail`, e);
      session.__rc_recordStatus = recordStatus.recording;
      await this._updateSessions();
      errorHandler?.(e);
    }
  }

  @delegate('mainClient')
  async park(sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      const result = await session.park();
      this.logger.log('Parked successfully', result);
      if (result['park extension']) {
        this._toast.success({
          message: t('parked', {
            parkedNumber: `*${result['park extension']}`,
          }),
          ttl: 0,
        });
      }
    } catch (e) {
      this.logger.log('park fail', e);
    }
  }

  @delegate('mainClient')
  async transfer(transferNumber: string, sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      session.__rc_isOnTransfer = true;
      await this._updateSessions();
      let numberResult;
      let validPhoneNumber;
      if (!this._permissionCheck) {
        try {
          numberResult = validateNumbers({
            allowRegionSettings: !!this._brand.brandConfig.allowRegionSettings,
            areaCode: this._regionSettings.areaCode,
            countryCode: this._regionSettings.countryCode,
            phoneNumbers: [transferNumber],
          });
        } catch (error: any) {
          this._numberValidate.handleValidateToasts({
            result: false,
            errors: [error],
          });
          throw new NumberValidError();
        }

        validPhoneNumber = numberResult && numberResult[0];
      } else {
        const isEDPEnabled = this._appFeatures.isEDPEnabled;
        const numberResult = isEDPEnabled
          ? this._numberValidate.validate([transferNumber])
          : await this._numberValidate.validateNumbers([transferNumber]);

        if (!numberResult.result) {
          this._numberValidate.handleValidateToasts(numberResult);
          throw new NumberValidError();
        }
        if (isEDPEnabled) {
          const parsedNumbers = await this._numberValidate.parseNumbers([
            transferNumber,
          ]);
          validPhoneNumber =
            parsedNumbers?.[0].availableExtension ??
            parsedNumbers?.[0].parsedNumber;
        } else {
          // TODO: fix type
          // @ts-ignore
          validPhoneNumber = numberResult.numbers?.[0]?.e164;
        }
      }
      await session.transfer(validPhoneNumber);
      session.__rc_isOnTransfer = false;
      await this._updateSessions();
      await this._onCallEnd(session);
    } catch (e) {
      session.__rc_isOnTransfer = false;
      await this._updateSessions();

      if (e instanceof NumberValidError) {
        return;
      }

      this._showTransferError();
    }
  }

  private _showTransferError() {
    this._toast.danger({
      message: t('transferError'),
    });
  }

  @delegate('mainClient')
  async startWarmTransfer(transferNumber: string, sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      session.__rc_isOnTransfer = true;
      await this._updateSessions();
      const numberResult = validateNumbers({
        allowRegionSettings: !!this._brand.brandConfig.allowRegionSettings,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        phoneNumbers: [transferNumber],
      });
      const validPhoneNumber = numberResult && numberResult[0];
      const fromNumber =
        session.__rc_direction === callDirections.outbound
          ? session.request.from.uri.user!
          : session.request.to.uri.user!;
      await this.makeCall({
        toNumber: validPhoneNumber,
        fromNumber,
        homeCountryId: this._regionSettings.homeCountryId,
        // TODO: should check that type issue
        // @ts-ignore
        extendedControls: '',
        transferSessionId: sessionId,
      });
    } catch (e) {
      this.logger.log('startWarmTransfer fail', e);
      session.__rc_isOnTransfer = false;
      await this._updateSessions();
      this._showTransferError();
    }
  }

  @delegate('mainClient')
  async completeWarmTransfer(newSessionId: string) {
    const newSession = this.originalSessions[newSessionId];
    if (!newSession) {
      return;
    }
    const oldSessionId = newSession.__rc_transferSessionId;
    const oldSession = this.originalSessions[oldSessionId!];
    if (!oldSession) {
      return;
    }
    newSession.__rc_isOnTransfer = true;
    await this._updateSessions();
    try {
      await oldSession.warmTransfer(newSession);
    } catch (e) {
      this.logger.log('completeWarmTransfer fail', e);
      newSession.__rc_isOnTransfer = false;
      await this._updateSessions();
      this._showTransferError();
    }
  }

  @delegate('mainClient')
  async flip(flipValue: string, sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      await session.flip(flipValue);
      // await this._onCallEnd(session);
      session.__rc_isOnFlip = true;
      this.logger.log('Flipped successfully');
    } catch (e) {
      this.logger.log('flip fail', e);
      session.__rc_isOnFlip = false;
      this._toast.warning({
        message: t('flipError'),
      });
    }
    await this._updateSessions();
  }

  private async _sendDTMF(dtmfValue: string, session: WebphoneSession) {
    try {
      await session.dtmf(dtmfValue, 100);
    } catch (e) {
      this.logger.log('sendDTMF fail', e);
    }
  }

  @delegate('mainClient')
  async sendDTMF(dtmfValue: string, sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (session) {
      await this._sendDTMF(dtmfValue, session);
    }
  }

  @delegate('mainClient')
  async hangup(
    sessionId: string,
    errorHandler?: (error: any) => void | Promise<void>,
  ) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      this._onBeforeCallEnd(session);
      await session.terminate();
    } catch (e) {
      this.logger.log('hangup fail', e);

      await this._onCallEnd(session);
      errorHandler?.(e);
    }
  }

  @delegate('mainClient')
  async toVoiceMail(sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      session.__rc_isToVoicemail = true;
      await session.toVoicemail();
    } catch (e) {
      this.logger.log('toVoiceMail fail', e);

      await this._onCallEnd(session);
      this._toast.warning({
        message: t('toVoiceMailError'),
      });
    }
  }

  @delegate('mainClient')
  async replyWithMessage(
    sessionId: string,
    replyOptions: SessionReplyOptions,
    errorHandler?: (error: any) => void | Promise<void>,
  ) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      session.__rc_isReplied = true;
      await session.replyWithMessage(replyOptions);
      return true;
    } catch (e) {
      this.logger.log('replyWithMessage fail', e);
      await this._onCallEnd(session);
      errorHandler?.(e);
    }
  }

  _addTrack(rawSession: WebphoneSession) {
    if (rawSession && this._webphone) {
      const { remote, local } = this._webphone.userAgent.media || {};

      if (remote && local) {
        rawSession.addTrack(remote, local);
      }
    }
  }

  _sessionHandleWithId(
    sessionId: string,
    func: (session: WebphoneSession) => void,
  ) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return null;
    }
    return func(session);
  }

  async _invite(
    toNumber: string,
    {
      inviteOptions,
      extendedControls,
      transferSessionId,
    }: {
      inviteOptions: InviteOptions;
      extendedControls?: string[];
      transferSessionId?: string;
    },
  ) {
    const errorCode = this.errorCode;
    if (errorCode) {
      this.logger.log(
        'webphone not able to make call, errorCode or not ready or not connected more than 30s',
        {
          ready: this.ready,
          connected: this.connected,
          errorCode: this.errorCode,
        },
      );
      this.showErrorToast({
        errorCode: errorCode,
      });

      return null;
    }

    if (
      toNumber.length > 6 &&
      (!this._availabilityMonitor || !this._availabilityMonitor.isVoIPOnlyMode)
    ) {
      // in new project, we don't need to check device lines every time when make call, only validate device lines use ExtensionDevice
      if (process.env.THEME_SYSTEM !== 'spring-ui') {
        await this._fetchDL();
      }

      // TODO: should add some update logic for device lines, not only base on re-login
      const pass = this.validateDeviceLines();
      if (!pass) return null;
    }

    // also ensure connected and ready state
    const webphone = await this.ensureAbleToMakeCall();

    if (!webphone) {
      this.logger.log(
        'webphone not able to make call, errorCode or not ready or not connected more than 30s',
        {
          ready: this.ready,
          connected: this.connected,
          errorCode: this.errorCode,
          webSocketReady: this._ringCentralExtensions?.isWebSocketReady,
          subscriptionReady: this._subscription?.subscriptionReady ?? false,
          subscriptionFilters: this._subscription?.filters.length ?? 0,
        },
      );

      return;
    }

    await this._holdOtherSession(null);
    const session = webphone.userAgent.invite(
      toNumber,
      inviteOptions,
    ) as WebphoneSession;
    session.__rc_direction = callDirections.outbound;
    session.__rc_callStatus = sessionStatus.setup;
    session.__rc_creationTime = Date.now();
    session.__rc_lastActiveTime = Date.now();
    session.__rc_fromNumber = inviteOptions.fromNumber!;
    session.__rc_extendedControls = extendedControls;
    session.__rc_extendedControlStatus = extendedControlStatus.pending;
    session.__rc_transferSessionId = transferSessionId!;
    this._onAccepted(session);
    await this._onCallInit(session);
    return session;
  }

  private ensureWebphoneInstance() {
    if (!this._webphone) {
      this.logger.log('webphone instance not exist, wait for it');

      return this.rcWebphoneInstance$.pipe(filter(Boolean));
    }

    return of(this._webphone);
  }

  private async ensureAbleToMakeCall() {
    const readyToMakCall$ = fromWatchValue(
      this,
      () => [this.ready, this.connected] as const,
      {
        multiple: true,
      },
    ).pipe(filter(([ready, connected]) => ready && connected));

    const notAble$ = merge(
      // when have error code, also means not able to make call, webphone not connected successfully
      fromWatchValue(this, () => this.errorCode).pipe(filter(Boolean)),
      timer(30 * 1000),
    ).pipe(map(() => null));

    const webphone = await firstValueFrom(
      race([
        readyToMakCall$.pipe(switchMap(() => this.ensureWebphoneInstance())),
        notAble$,
      ]),
    );

    if (!webphone) {
      return null;
    }

    const shouldRecover =
      !!this._ringCentralExtensions &&
      !this._ringCentralExtensions.isWebSocketReady;

    const realtimeReady = await this._awaitRealtimeRecovery({
      recover: shouldRecover,
    });

    if (!realtimeReady) {
      return null;
    }

    return webphone;
  }

  /**
   * start an outbound call.
   * @param {toNumber} recipient number
   * @param {fromNumber} call Id
   * @param {homeCountryId} homeCountry Id
   */
  @delegate('mainClient')
  async makeCall({
    toNumber,
    fromNumber,
    homeCountryId,
    extendedControls,
    transferSessionId,
  }: {
    toNumber: string;
    fromNumber?: string;
    homeCountryId: string;
    extendedControls?: string[];
    transferSessionId?: string;
  }) {
    const inviteOptions = {
      sessionDescriptionHandlerOptions: (await this.getAcceptOptions())
        .sessionDescriptionHandlerOptions,
      fromNumber,
      homeCountryId,
    };
    const result = await this._invite(toNumber, {
      inviteOptions,
      extendedControls,
      transferSessionId,
    });
    return result
      ? {
          id: result.id,
        }
      : null;
  }

  /**
   * switch a active call into web phone session.
   */
  @delegate('mainClient')
  async switchCall(
    { id, from, direction, to, sipData }: SwitchCallActiveCallParams,
    homeCountryId: string,
  ) {
    const extraHeaders = [];
    extraHeaders.push(
      `Replaces: ${id};to-tag=${sipData.fromTag};from-tag=${sipData.toTag}`,
    );
    extraHeaders.push('RC-call-type: replace');
    const toNumber =
      direction === callDirections.outbound ? to.phoneNumber : from.phoneNumber;
    const fromNumber =
      direction === callDirections.outbound ? from.phoneNumber : to.phoneNumber;
    const inviteOptions = {
      sessionDescriptionHandlerOptions: (await this.getAcceptOptions())
        .sessionDescriptionHandlerOptions,
      fromNumber,
      homeCountryId,
      extraHeaders,
    };
    const session = await this._invite(toNumber, {
      inviteOptions,
    });
    return session?.data?.sessionId;
  }

  @delegate('mainClient')
  async pickupInboundCall({
    sessionId,
    toNumber,
    fromNumber,
    serverId,
  }: TPickupInboundCall) {
    const extraHeaders = [
      `RC-call-type: inbound-pickup; session-id: ${sessionId}; server-id: ${serverId}`,
    ];
    const inviteOptions = {
      sessionDescriptionHandlerOptions: (await this.getAcceptOptions())
        .sessionDescriptionHandlerOptions,
      fromNumber,
      extraHeaders,
    };
    const session = await this._invite(toNumber, {
      inviteOptions,
    });

    this._trackCallAnswer();

    return session;
  }

  @delegate('mainClient')
  async updateSessionMatchedContact(
    sessionId: string,
    contact: { id: string },
  ) {
    this._sessionHandleWithId(sessionId, async (session) => {
      session.__rc_contactMatch = contact;
      await this._updateSessions();
    });
  }

  @delegate('mainClient')
  async _updateSessions() {
    await this.updateSessionsState(
      [...Object.values(this.originalSessions)].map(
        normalizeSession,
      ) as NormalizedSession[],
    );
  }

  @delegate('mainClient')
  async toggleMinimized(sessionId: string) {
    this._sessionHandleWithId(sessionId, async (session: WebphoneSession) => {
      session.__rc_minimized = !session.__rc_minimized;
      await this._updateSessions();
    });
  }

  async _onCallInit(session: WebphoneSession) {
    await this._updateSessions();
    const normalizedSession = this._getNormalizedSession(session);
    await this.setActiveSessionId(normalizedSession!.id);

    this._contactMatcher?.triggerMatch();

    this._eventEmitter.emit(
      EVENTS.callInit,
      normalizedSession,
      this.activeSession,
    );
  }

  async _onCallStart(session: WebphoneSession) {
    await this._updateSessions();
    const normalizedSession = this._getNormalizedSession(session);

    await this.setStateOnCallStart(normalizedSession!);

    this._eventEmitter.emit(
      EVENTS.callStart,
      normalizedSession,
      this.activeSession,
    );
  }

  async _onCallRing(session: WebphoneSession) {
    await this._updateSessions();
    const normalizedSession = this._getNormalizedSession(session);
    await this.setStateOnCallRing(normalizedSession!);

    this._contactMatcher?.triggerMatch();

    if (this.activeSession && !isOnHold(this.activeSession)) {
      this._webphone!.userAgent.audioHelper.playIncoming(false);
    }
    this._eventEmitter.emit(
      EVENTS.callRing,
      normalizedSession,
      this.ringSession,
    );
  }

  _onBeforeCallEnd(session: WebphoneSession) {
    const normalizedSession = this._getNormalizedSession(session);
    this._eventEmitter.emit(
      EVENTS.beforeCallEnd,
      normalizedSession,
      this.activeSession,
    );
  }

  _releaseVideoElementsOnSessionsEmpty() {
    if (this._remoteVideo && this._localVideo && this.sessions.length === 0) {
      // Pause video elements to release system Video Wake Lock RCINT-15582
      if (!this._remoteVideo.paused) {
        this._remoteVideo.pause();
        this._remoteVideo.srcObject = null;
      }
      if (!this._localVideo.paused) {
        this._localVideo.pause();
      }
    }
  }

  _reconnectWebphoneIfNecessaryOnSessionsEmpty() {
    if (this._reconnectAfterSessionEnd && this.sessions.length === 0) {
      const reason = this._reconnectAfterSessionEnd.reason;
      if (reason) {
        this._toast.warning({
          message: reason,
          allowDuplicates: false,
        });
      }
      this._reconnectAfterSessionEnd = null;
      this.connect({ skipConnectDelay: true, force: true, skipDLCheck: true });
    }
  }

  async _onCallEnd(session: WebphoneSession) {
    // should remove __rc_transferSessionId when the call is warm transfer call
    const transferSession = this.sessions.find((s) => {
      return s.warmTransferSessionId === session.id;
    });
    if (transferSession) {
      const originalTransferSession = this.originalSessions[transferSession.id];
      if (originalTransferSession) {
        delete originalTransferSession.__rc_transferSessionId;
      }
    }

    session.__rc_extendedControlStatus = extendedControlStatus.stopped;
    const normalizedSession = this._getNormalizedSession(session);
    if (!normalizedSession) {
      return;
    }
    if (session.__rc_transferSessionId) {
      const transferSession =
        this.originalSessions[session.__rc_transferSessionId];
      if (transferSession) {
        transferSession.__rc_isOnTransfer = false;
      }
    }
    await this._updateSessions();
    await this.setStateOnCallEnd(normalizedSession);
    this._eventEmitter.emit(
      EVENTS.callEnd,
      normalizedSession,
      this.activeSession,
      this.ringSession,
    );
    this._releaseVideoElementsOnSessionsEmpty();
    this._reconnectWebphoneIfNecessaryOnSessionsEmpty();
  }

  _onBeforeCallResume(session: WebphoneSession) {
    const normalizedSession = this._getNormalizedSession(session);
    this._eventEmitter.emit(
      EVENTS.beforeCallResume,
      normalizedSession,
      this.activeSession,
    );
  }

  async _onCallResume(session: WebphoneSession) {
    const normalizedSession = this._getNormalizedSession(session);
    await this.setActiveSessionId(normalizedSession!.id);

    this._eventEmitter.emit(
      EVENTS.callResume,
      normalizedSession,
      this.activeSession,
    );
  }

  _onCallHold(session: WebphoneSession) {
    const normalizedSession = this._getNormalizedSession(session);
    this._eventEmitter.emit(
      EVENTS.callHold,
      normalizedSession,
      this.activeSession,
    );
  }

  onCallStart(handler: CallStartHandler) {
    this._eventEmitter.on(EVENTS.callStart, handler);
  }

  onCallInit(handler: CallInitHandler) {
    this._eventEmitter.on(EVENTS.callInit, handler);
  }

  onCallRing(handler: CallRingHandler) {
    this._eventEmitter.on(EVENTS.callRing, handler);
  }

  onCallEnd(handler: CallEndHandler) {
    this._eventEmitter.on(EVENTS.callEnd, handler);
  }

  onBeforeCallResume(handler: BeforeCallResumeHandler) {
    this._eventEmitter.on(EVENTS.beforeCallResume, handler);
  }

  onCallResume(handler: CallResumeHandler) {
    this._eventEmitter.on(EVENTS.callResume, handler);
  }

  onCallHold(handler: CallHoldHandler) {
    this._eventEmitter.on(EVENTS.callHold, handler);
  }

  onBeforeCallEnd(handler: BeforeCallEndHandler) {
    this._eventEmitter.on(EVENTS.beforeCallEnd, handler);
  }

  onWebphoneRegistered(handler: () => void): OffEventHandler {
    this._eventEmitter.on(EVENTS.webphoneRegistered, handler);
    return () => {
      this._eventEmitter.off(EVENTS.webphoneRegistered, handler);
    };
  }

  onWebphoneUnregistered(handler: () => void): OffEventHandler {
    this._eventEmitter.on(EVENTS.webphoneUnregistered, handler);
    return () => {
      this._eventEmitter.off(EVENTS.webphoneUnregistered, handler);
    };
  }

  override async _disconnect() {
    await super._disconnect();
    await this._updateSessions();
  }

  get hasCallSessions() {
    return this.sessions.length > 0;
  }

  @computed(({ sessions }: Webphone) => [sessions])
  get sessionPhoneNumbers(): string[] {
    const outputs: string[] = [];
    this.sessions.forEach((session) => {
      outputs.push(session.to);
      outputs.push(session.from);
    });
    return outputs;
  }

  /**
   * Current active session(Outbound and InBound that answered)
   */
  @computed(({ activeSessionId, sessions }: Webphone) => [
    activeSessionId,
    sessions,
  ])
  get activeSession(): NormalizedSession | null | undefined {
    if (!this.activeSessionId) {
      return null;
    }
    const activeSession = find(
      (session) => session.id === this.activeSessionId,
      this.sessions,
    );
    return activeSession;
  }

  /**
   * Current ring session(inbound)
   */
  @computed(({ ringSessionId, sessions }: Webphone) => [
    ringSessionId,
    sessions,
  ])
  get ringSession(): NormalizedSession | null | undefined {
    if (!this.ringSessionId) {
      return null;
    }
    const session = find(
      (session) => session.id === this.ringSessionId,
      this.sessions,
    );
    return session;
  }

  @computed(({ sessions }: Webphone) => [sessions])
  get ringSessions(): NormalizedSession[] {
    return this.sessions.filter((session) => isRing(session));
  }

  @computed(({ sessions }: Webphone) => [sessions])
  get onHoldSessions(): NormalizedSession[] {
    return this.sessions.filter((session) => isOnHold(session));
  }

  async getAcceptOptions() {
    return {
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: await this._audioSettings.getInputDeviceOptions(),
          video: false,
        },
      },
    };
  }

  get isOnTransfer() {
    return this.activeSession && this.activeSession.isOnTransfer;
  }

  @computed(({ ringSessions }: Webphone) => [ringSessions])
  get ringingCallOnView(): NormalizedSession | null | undefined {
    return find((session) => !session.minimized, this.ringSessions);
  }

  private _getNormalizedSession(session: WebphoneSession) {
    return find((x) => x.id === session.id, this.sessions);
  }
}
