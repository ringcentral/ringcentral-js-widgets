import type TelephonySessionsEventBody from '@rc-ex/core/lib/definitions/TelephonySessionsEventBody';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import {
  NumberFormatter,
  type WebSocketSubscription as Subscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  delegate,
  dynamic,
  fromWatchValue,
  inject,
  injectable,
  logger,
  optional,
  RcModule,
  state,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { Session as TelephonySession } from 'ringcentral-call-control/lib/Session';
import {
  combineLatest,
  concatMap,
  defer,
  filter,
  map,
  merge,
  Observable,
  of,
  pairwise,
  take,
  tap,
} from 'rxjs';

import { ActiveCallControlSessionData } from '../ActiveCallControl/ActiveCallControl.interface';
import { mapTelephonyStatus } from '../ActiveCallControl/helpers';
import type { CallMonitor } from '../CallMonitor';
import {
  formatWebphoneSessionSummary,
  sessionStatus,
  Webphone,
} from '../Webphone';

import type { PreinsertCallStatus } from './PreinsertCall.interface';
import {
  createConferenceParticipantRemovalId,
  parseConferenceParticipantRemovalId,
} from './utils';

const telephonySessionsEndPoint = /\/telephony\/sessions$/;

type PreinsertServerHandlerOptions = {
  dropTelephonySession?: (telephonySessionId: string) => Promise<void> | void;
};

@injectable({
  name: 'PreinsertCall',
})
export class PreinsertCall extends RcModule {
  @dynamic('CallMonitor')
  callMonitor!: CallMonitor;

  private readonly _cancelledPreinsertWebphoneSessionIds = new Set<string>();
  private readonly _cancelledPreinsertTelephonySessionIds = new Set<string>();
  private readonly _cancellingPreinsertTelephonySessionIds = new Set<string>();

  @state
  preinsertStatusMap: Record<string, PreinsertCallStatus> = {};

  preinsertStatusMap$ = fromWatchValue(this, () => this.preinsertStatusMap);

  @action
  private _setPreinsert(
    telephonySessionId: string,
    status: PreinsertCallStatus,
  ) {
    this.preinsertStatusMap[telephonySessionId] = status;
  }

  @action
  private cleanPreinsert(telephonySessionIds: string[]) {
    telephonySessionIds.forEach((telephonySessionId) => {
      delete this.preinsertStatusMap[telephonySessionId];
    });
  }

  @delegate('server')
  async setPreinsert(telephonySessionId: string, status: PreinsertCallStatus) {
    if (this.preinsertStatusMap[telephonySessionId] !== status) {
      this._setPreinsert(telephonySessionId, status);
    }
  }

  @action
  private _removePreinsert(telephonySessionId: string) {
    delete this.preinsertStatusMap[telephonySessionId];
  }

  @delegate('server')
  async removePreinsert(telephonySessionId: string) {
    if (this.preinsertStatusMap[telephonySessionId]) {
      this._removePreinsert(telephonySessionId);
    }
  }

  constructor(
    private _webphone: Webphone,
    protected _numberFormatter: NumberFormatter,
    @inject('Subscription') private _subscription: Subscription,
    @optional() protected _contactMatcher?: ContactMatcher,
  ) {
    super();
  }

  listenPreinsertFromWebphone() {
    merge(
      this._webphone.invite$.pipe(
        concatMap((session) => {
          const telephonySessionId = session.__rc_partyData?.sessionId;

          return defer(() => {
            // when not get telephonySessionId, need to wait for that have value
            if (!telephonySessionId) {
              const value$ = new Observable((subscriber) => {
                let value: any = undefined;
                // Create property descriptor to track changes
                Object.defineProperty(session, '__rc_partyData', {
                  get() {
                    return value;
                  },
                  set(val) {
                    value = val;
                    subscriber.next(val);
                  },
                });

                return () => {
                  // recover property descriptor
                  Object.defineProperty(session, '__rc_partyData', {
                    value,
                    writable: true,
                  });
                };
              });

              return value$.pipe(
                // wait partyData have value
                map(() => session.__rc_partyData?.sessionId),
                filter(Boolean),
              );
            }

            return of(telephonySessionId);
          }).pipe(
            take(1),
            concatMap((telephonySessionId) =>
              this.removePreinsert(telephonySessionId),
            ),
          );
        }),
      ),
      this._webphone.end$.pipe(
        concatMap(async (session) => {
          const telephonySessionId = session.__rc_partyData?.sessionId;

          logger.log(`[${this.identifier}] end call trigger`, {
            session: formatWebphoneSessionSummary(session),
            telephonySessionId,
          });

          if (
            !telephonySessionId ||
            // only when client side not have that data need to set end status, otherwise, use keep the current status, like ignore also trigger that, but that should keep as ignore, and switch should not trigger that
            this.preinsertStatusMap[telephonySessionId]
          ) {
            return;
          }

          logger.log(
            `[${this.identifier}] set client call status`,
            telephonySessionId,
          );
          return this.setPreinsert(telephonySessionId, 'end');
        }),
      ),
    )
      .pipe(takeUntilAppDestroy)
      .subscribe();
  }

  listenPreinsertServerHandler(
    sessionsMap$: Observable<
      Record<string, ActiveCallControlSessionData | undefined>
    >,
    options: PreinsertServerHandlerOptions = {},
  ) {
    // clear not exist session id in preinsertStatusMap
    const clearPreinsertStatus$ = sessionsMap$.pipe(
      tap((sessionsMap) => {
        const clearIds = Object.keys(this.preinsertStatusMap).reduce(
          (acc, source) => {
            // the source is {telephonySessionId}_____{removedPartyId}, so need to split to get the telephonySessionId to ensure that the session is exist
            const { telephonySessionId } =
              parseConferenceParticipantRemovalId(source);
            // when not exist in sessionsMap, should remove that
            if (!sessionsMap[telephonySessionId]) {
              acc.push(source);
            }

            return acc;
          },
          [] as string[],
        );
        if (clearIds.length > 0) {
          this.cleanPreinsert(clearIds);
        }
      }),
    );

    // when from not connected to connected, should remove the preinsert call status, because that be connect in other device
    const connectInOtherDevice$ = combineLatest([
      this.preinsertStatusMap$,
      sessionsMap$,
    ]).pipe(
      map(([preinsertStatusMap, sessionsMap]) => {
        const preinsertEndSessionStatusMap = Object.entries(
          preinsertStatusMap,
        ).reduce(
          (acc, [telephonySessionId, status]) => {
            if (status === 'end') {
              const session = sessionsMap[telephonySessionId];

              const telephonyStatus = mapTelephonyStatus(
                session?.party?.status?.code!,
              );

              acc[telephonySessionId] = telephonyStatus;
            }

            return acc;
          },
          {} as Record<string, ReturnType<typeof mapTelephonyStatus>>,
        );
        return preinsertEndSessionStatusMap;
      }),
      pairwise(),
      tap(([prev, current]) => {
        Object.entries(current).forEach(
          ([telephonySessionId, currTelephonyStatus]) => {
            const prevTelephonyStatus = prev[telephonySessionId];

            // when from not connected to connected, should remove the preinsert call status, because that be connect in other device
            if (
              prevTelephonyStatus &&
              currTelephonyStatus &&
              prevTelephonyStatus !== 'CallConnected' &&
              currTelephonyStatus === 'CallConnected'
            ) {
              logger.log(
                `[${this.identifier}] connected in other device, show that`,
                telephonySessionId,
              );

              this._removePreinsert(telephonySessionId);
            }
          },
        );
      }),
    );

    const markCancelledPreinsertFromMessage$ = this._subscription
      .fromMessage$<TelephonySessionsEventBody>(telephonySessionsEndPoint)
      .pipe(
        tap((message) => {
          const telephonySessionId = message?.telephonySessionId;

          if (
            telephonySessionId &&
            this._isCancelledPreinsertSession(telephonySessionId)
          ) {
            this._cancelledPreinsertTelephonySessionIds.add(telephonySessionId);
            void this.setPreinsert(telephonySessionId, 'end');
          }
        }),
      );

    const cancelPreinsertCall$ = sessionsMap$.pipe(
      tap((sessionsMap) => {
        Object.values(sessionsMap).forEach((session) => {
          if (!session?.telephonySessionId) {
            return;
          }

          const webphoneSessionId = this._getCurrentDeviceCallsBySessionId(
            session.telephonySessionId,
          );
          const shouldCancel =
            this._cancelledPreinsertTelephonySessionIds.has(
              session.telephonySessionId,
            ) ||
            (webphoneSessionId &&
              this._cancelledPreinsertWebphoneSessionIds.has(
                webphoneSessionId,
              ));

          if (shouldCancel) {
            void this._hangupCancelledPreinsertCall(
              session.telephonySessionId,
              webphoneSessionId,
              options,
            );
          }
        });

        this._cleanCancelledPreinsertWebphoneSessionIds();
      }),
    );

    merge(
      clearPreinsertStatus$,
      connectInOtherDevice$,
      markCancelledPreinsertFromMessage$,
      cancelPreinsertCall$,
    )
      .pipe(takeUntilAppDestroy)
      .subscribe();
  }

  private _cleanCancelledPreinsertWebphoneSessionIds() {
    Array.from(this._cancelledPreinsertWebphoneSessionIds).forEach(
      (webphoneSessionId) => {
        if (
          !this._webphone.sessions.some(
            (session) => session.id === webphoneSessionId,
          )
        ) {
          this._cancelledPreinsertWebphoneSessionIds.delete(webphoneSessionId);
        }
      },
    );
  }

  private _getCurrentDeviceCallsBySessionId(telephonySessionId: string) {
    return this._webphone.sessions.find(
      (session) => session.partyData?.sessionId === telephonySessionId,
    )?.id;
  }

  isCurrentDeviceWebphoneSession(
    telephonySessionId: string,
    webphoneSessionId: string,
  ) {
    return (
      this._getCurrentDeviceCallsBySessionId(telephonySessionId) ===
      webphoneSessionId
    );
  }

  private _isCancelledPreinsertSession(telephonySessionId: string) {
    const webphoneSessionId =
      this._getCurrentDeviceCallsBySessionId(telephonySessionId);

    return (
      this._cancelledPreinsertTelephonySessionIds.has(telephonySessionId) ||
      Boolean(
        webphoneSessionId &&
        this._cancelledPreinsertWebphoneSessionIds.has(webphoneSessionId),
      )
    );
  }

  isCancelledPreinsertSession(telephonySessionId: string) {
    return this._isCancelledPreinsertSession(telephonySessionId);
  }

  private _getPreinsertWebphoneSession(webphoneSessionId?: string | null) {
    if (webphoneSessionId) {
      return this._webphone.sessions.find(
        (session) => session.id === webphoneSessionId,
      );
    }

    return this._webphone.sessions.find(
      (session) =>
        session.direction === 'Outbound' &&
        session.callStatus !== sessionStatus.finished,
    );
  }

  @delegate('server')
  async cancelPreinsertConnectingCall(webphoneSessionId?: string | null) {
    const webphoneSession =
      this._getPreinsertWebphoneSession(webphoneSessionId);

    if (!webphoneSession) {
      return null;
    }

    this._cancelledPreinsertWebphoneSessionIds.add(webphoneSession.id);

    const telephonySessionId = webphoneSession.partyData?.sessionId;
    if (telephonySessionId) {
      this._cancelledPreinsertTelephonySessionIds.add(telephonySessionId);
      await this.setPreinsert(telephonySessionId, 'end');
    }

    await this._hangupPreinsertWithWebphone(webphoneSession.id);
    return webphoneSession.id;
  }

  private async _hangupCancelledPreinsertCall(
    telephonySessionId: string,
    webphoneSessionId: string | undefined,
    options: PreinsertServerHandlerOptions,
  ) {
    if (this._cancellingPreinsertTelephonySessionIds.has(telephonySessionId)) {
      return;
    }

    this._cancellingPreinsertTelephonySessionIds.add(telephonySessionId);
    this._cancelledPreinsertTelephonySessionIds.add(telephonySessionId);

    try {
      await this.setPreinsert(telephonySessionId, 'end');

      if (webphoneSessionId) {
        this._cancelledPreinsertWebphoneSessionIds.add(webphoneSessionId);
        await this._hangupPreinsertWithWebphone(webphoneSessionId);
        return;
      }

      await options.dropTelephonySession?.(telephonySessionId);
    } catch (error) {
      logger.log(`[${this.identifier}] cancel preinsert call failed`, error);
    } finally {
      this._cancellingPreinsertTelephonySessionIds.delete(telephonySessionId);
    }
  }

  @delegate('mainClient')
  protected async _hangupPreinsertWithWebphone(
    currentDeviceWebphoneId: string,
  ) {
    await this._webphone.hangup(currentDeviceWebphoneId, (error) => {
      logger.log(`[${this.identifier}] preinsert hangup failed`, error);
    });
  }

  isPreinsertStatusEnd(telephonySessionId: string) {
    const currStatus = this.preinsertStatusMap[telephonySessionId];

    return currStatus === 'end' || currStatus === 'partyRemoved';
  }

  isPreinsertStatusIgnored(telephonySessionId: string) {
    const currStatus = this.preinsertStatusMap[telephonySessionId];

    return currStatus === 'ignore';
  }

  isBringInPartyPreinsertStatus(telephonySessionId: string) {
    const currStatus = this.preinsertStatusMap[telephonySessionId];

    return currStatus === 'bringInParty';
  }

  checkParticipantStillExist(session: TelephonySession, partyId: string) {
    const participantStatus =
      this.preinsertStatusMap[
        createConferenceParticipantRemovalId(session.id, partyId)
      ];

    if (participantStatus === 'partyRemoved') {
      return false;
    }

    return true;
  }
}
