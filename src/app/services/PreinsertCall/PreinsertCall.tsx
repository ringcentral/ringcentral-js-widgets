import { telephonyStatus } from '@ringcentral-integration/commons/enums/telephonyStatus';
import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import { NumberFormatter } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  computed,
  delegate,
  dynamic,
  fromWatchValue,
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
  delay,
  EMPTY,
  filter,
  firstValueFrom,
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
import { sessionStatus, Webphone } from '../Webphone';
import { getWebphoneSessionStartTime } from '../Webphone/webphoneHelper';

import type { PreinsertCallStatus } from './PreinsertCall.interface';
import {
  createConferenceParticipantRemovalId,
  getPreinsertFakeId,
  isPreinsertCallByTelephoneSessionId,
  parseConferenceParticipantRemovalId,
} from './utils';

@injectable({
  name: 'PreinsertCall',
})
export class PreinsertCall extends RcModule {
  @dynamic('CallMonitor')
  callMonitor!: CallMonitor;

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

  @computed
  get preinsertCalls() {
    return this._webphone.sessions.reduce((acc, session) => {
      const telephonySessionId = session.partyData?.sessionId;
      if (
        // non have telephonySessionId should preinsert
        !telephonySessionId ||
        // have id but not in activeCallControl.sessions, should preinsert
        (telephonySessionId &&
          !this.callMonitor.callsInfo.telephonySessionIdCallMap[
            telephonySessionId
          ] &&
          !this.isPreinsertStatusEnd(telephonySessionId) &&
          // only outbound call should preinsert, inbound currently not want that, that will got a blank call when inbound call
          session.direction === 'Outbound')
      ) {
        // normalize number for ensure the number is matcher mapping with same key
        const fromNumber = this._numberFormatter.normalizeNumber(session.from);
        const toNumber = this._numberFormatter.normalizeNumber(session.to);

        const direction = session.direction;
        const toName = '';
        const fromName = '';
        const partyId = session.partyData?.partyId;

        const contactMapping = this._contactMatcher?.dataMapping ?? {};

        const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
        const toMatches = (toNumber && contactMapping[toNumber]) || [];

        const sessionId = getPreinsertFakeId(session.id);
        const callItem: Call = {
          partyId,
          direction,
          telephonySessionId: session.partyData?.sessionId || sessionId,
          toName,
          fromName,
          from: {
            phoneNumber: fromNumber,
          },
          to: {
            phoneNumber: toNumber,
          },
          webphoneSession: session,
          startTime: getWebphoneSessionStartTime(session),
          sessionId,
          telephonyStatus:
            session.callStatus === sessionStatus.connected
              ? telephonyStatus.callConnected
              : telephonyStatus.ringing,
          fromMatches,
          toMatches,
          activityMatches: [],
        };

        acc.push(callItem);
      }

      return acc;
    }, [] as Call[]);
  }

  constructor(
    private _webphone: Webphone,
    protected _numberFormatter: NumberFormatter,
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
            session,
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
        ).reduce((acc, [telephonySessionId, status]) => {
          if (status === 'end') {
            const session = sessionsMap[telephonySessionId];

            const telephonyStatus = mapTelephonyStatus(
              session?.party?.status?.code!,
            );

            acc[telephonySessionId] = telephonyStatus;
          }

          return acc;
        }, {} as Record<string, ReturnType<typeof mapTelephonyStatus>>);
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

    merge(clearPreinsertStatus$, connectInOtherDevice$)
      .pipe(takeUntilAppDestroy)
      .subscribe();
  }

  isPreinsertStatusEnd(telephonySessionId: string) {
    const currStatus = this.preinsertStatusMap[telephonySessionId];

    return (
      currStatus === 'end' ||
      // currStatus === 'forceTerminate' ||
      currStatus === 'partyRemoved'
    );
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

  // TODO: outbound call still not completed
  // async isPreinsertCallBySessionId(telephonySessionId: string) {
  //   if (isPreinsertCallByTelephoneSessionId(telephonySessionId)) {
  //     this.setPreinsert(telephonySessionId, 'forceTerminate');
  //     // wait preinsert call telephonySessionId ready
  //     const readyPartyCall = await firstValueFrom(
  //       fromWatchValue(this, () => this.preinsertCalls).pipe(
  //         map((preinsertCalls) => {
  //           const partyReadyPreinsertItem = preinsertCalls.find((call) => {
  //             return Boolean(
  //               call.sessionId === telephonySessionId &&
  //                 // when that have party id and be connected
  //                 !isPreinsertCallByTelephoneSessionId(
  //                   call.telephonySessionId,
  //                 ) &&
  //                 // must wait that become connected then can hung up, otherwise server will emit error
  //                 call.telephonyStatus === telephonyStatus.callConnected,
  //             );
  //           });

  //           return partyReadyPreinsertItem;
  //         }),
  //         filter(Boolean),
  //         delay(0),
  //       ),
  //     );

  //     telephonySessionId = readyPartyCall.telephonySessionId!;
  //   }
  // }
}
