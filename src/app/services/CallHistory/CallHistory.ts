import { callResults } from '@ringcentral-integration/commons/enums/callResults';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import {
  getPhoneNumberMatches,
  sortByStartTime,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import debounce from '@ringcentral-integration/commons/lib/debounce';
import { normalizeNumber } from '@ringcentral-integration/commons/lib/normalizeNumber';
import {
  AccountInfo,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ActivityMatcher,
  CompanyContacts,
  ContactMatcher,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  action,
  computed,
  delegate,
  fromWatchValue,
  injectable,
  optional,
  RcModule,
  state,
  storage,
  StoragePlugin,
  takeUntilAppDestroy,
  userStorage,
  watch,
} from '@ringcentral-integration/next-core';
import dayjs from 'dayjs';
import { EMPTY, map, merge, switchMap, tap } from 'rxjs';

import { isProceeding, isQueueCall } from '../ActiveCallControl';
import { CallLog } from '../CallLog';
import { CallMonitor } from '../CallMonitor';
import { callingModes, CallingSettings } from '../CallingSettings';
import { PreinsertCall } from '../PreinsertCall';

import type { CallHistoryOptions, HistoryCall } from './CallHistory.interface';
import {
  addNumbersFromCall,
  pickFullPhoneNumber,
  pickPhoneOrExtensionNumber,
} from './callHistoryHelper';

const DEFAULT_CLEAN_TIME = 24 * 60 * 60 * 1000;

@injectable({
  name: 'CallHistory',
})
export class CallHistory extends RcModule {
  private _debouncedSearch = debounce(this.callsSearch, 230, false);
  private _minSearchStringLength = 3;

  constructor(
    private _companyContacts: CompanyContacts,
    private _accountInfo: AccountInfo,
    private _callLog: CallLog,
    private _storage: StoragePlugin,
    private _callMonitor: CallMonitor,
    private _preInsertCall: PreinsertCall,
    @optional() private _callingSettings?: CallingSettings,
    @optional() private _activityMatcher?: ActivityMatcher,
    @optional() private _contactMatcher?: ContactMatcher,
    @optional('CallHistoryOptions')
    private _callHistoryOptions?: CallHistoryOptions,
  ) {
    super();
    const enableCache = this._callHistoryOptions?.enableCache ?? true;
    if (enableCache) {
      this._storage.enable(this);
    }

    const enableContactMatchInCallHistory =
      this._callHistoryOptions?.enableContactMatchInCallHistory ?? true;
    if (enableContactMatchInCallHistory && this._contactMatcher) {
      this._contactMatcher.addQuerySource({
        getQueriesFn: () => this.uniqueNumbers,
        readyCheckFn: () =>
          this._callMonitor.ready &&
          this._callLog.ready &&
          this._accountInfo.ready,
      });
    }
    this._activityMatcher?.addQuerySource({
      getQueriesFn: () => this.sessionIds,
      readyCheckFn: () => this._callMonitor.ready && this._callLog.ready,
    });
  }

  @storage
  @state
  lastCheckTimeStamp = dayjs().valueOf();

  @storage
  @state
  endedCalls: Call[] = [];

  @state
  searchInput = '';

  @state
  filteredCalls: HistoryCall[] = [];

  @action
  private _updateLastCheckTimeStamp(timestamp = dayjs().valueOf()) {
    this.lastCheckTimeStamp = timestamp;
  }

  @delegate('server')
  async updateLastCheckTimeStamp(timestamp = dayjs().valueOf()) {
    this._updateLastCheckTimeStamp(timestamp);
  }

  @action
  private setFilteredCalls(data: HistoryCall[] = []) {
    this.filteredCalls = data;
  }

  @action
  setSearchInput(input = '') {
    this.searchInput = input;
  }

  @action
  private updateEndCall(i: number, endedCalls: Partial<Call>) {
    Object.assign(this.endedCalls[i], { ...endedCalls, __preinsert: true });
  }

  @action
  private setEndedCalls(endedCalls: Call[], timestamp: number) {
    endedCalls.forEach((call) => {
      const callWithDuration: Call = {
        ...call,
        duration: Math.floor((timestamp - call.startTime!) / 1000),
        // mark the call is ended from preinsert
        __preinsert: true,
      };
      const idx = this.endedCalls.findIndex(
        (item) => item.telephonySessionId === call.telephonySessionId,
      );
      if (idx > -1) {
        // replace old one if found
        this.endedCalls[idx] = callWithDuration;
      } else {
        this.endedCalls.push(callWithDuration);
      }
    });
  }

  removeEndedCalls(endedCalls: Pick<Call, 'telephonySessionId'>[]) {
    this.overrideEndedCalls(
      this.endedCalls.filter(
        (call) =>
          !(
            endedCalls.find(
              ({ telephonySessionId }) =>
                telephonySessionId === call.telephonySessionId,
            ) ||
            // clean current overdue ended call (default clean time: 1day).
            Date.now() - call.startTime! > DEFAULT_CLEAN_TIME
          ),
      ),
    );
  }

  removeExpiredEndedCalls() {
    this.overrideEndedCalls(
      this.endedCalls.filter(
        (call) => !(Date.now() - call.startTime! > DEFAULT_CLEAN_TIME),
      ),
    );
  }

  @action
  private overrideEndedCalls(calls: Call[]) {
    this.endedCalls.splice(0, this.endedCalls.length, ...calls);
  }

  @action
  cleanEndedCalls() {
    this.endedCalls = [];
  }

  @action
  removeAllEndedCalls() {
    this.endedCalls = [];
    this.markedList = [];

    this.markRemoved();
  }

  // The call logs which has been removed from remote
  // The marked telephonySessionId should not been added to ended calls afterwards.
  @storage
  @state
  markedList: Pick<Call, 'telephonySessionId'>[] = [];

  @action
  markRemoved() {
    this.markedList = this.markedList.concat(this._callMonitor.allCalls);
  }

  @userStorage
  @state
  conferenceCallMapping: Record<string, boolean> = {};

  @action
  addConferenceCallMapping(telephonySessionId: string) {
    this.conferenceCallMapping[telephonySessionId] = true;
  }

  override onInit() {
    // the watchers are setup after CallLog is ready
    // this means the initial batch of call logs are already loaded when the watchers are set
    // so we need to trigger the match manually for those to be matched
    this._contactMatcher?.triggerMatch({
      ignoreCache: !!this._callHistoryOptions?.contactMatchIgnoreCache,
    });
    this._activityMatcher?.triggerMatch();

    this.removeExpiredEndedCalls();
  }

  override onInitOnce() {
    if (this._contactMatcher) {
      watch(
        this,
        () => [this.uniqueNumbers, this.ready] as const,
        () => {
          if (this.ready && this._contactMatcher!.ready) {
            this._contactMatcher!.triggerMatch();
          }
        },
        {
          multiple: true,
        },
      );
    }

    if (this._activityMatcher) {
      watch(
        this,
        () => this.sessionIds,
        () => {
          if (this.ready && this._activityMatcher!.ready) {
            this._activityMatcher!.triggerMatch();
          }
        },
      );
    }

    watch(
      this,
      () => this._callMonitor.allCalls,
      (newMonitorCalls, oldMonitorCalls) => {
        if (!this.ready) return;

        // for save conference call info
        newMonitorCalls.forEach((call) => {
          if (
            call.isConferenceCall &&
            !this.conferenceCallMapping[call.telephonySessionId!]
          ) {
            this.addConferenceCallMapping(call.telephonySessionId!);
          }
        });

        const endedCalls = (oldMonitorCalls || []).filter(
          (call) =>
            !newMonitorCalls.find(
              (currentCall) =>
                call.telephonySessionId === currentCall.telephonySessionId,
            ) &&
            // if the call's callLog has been fetch, skip
            !this._callLog.calls.find(
              (currentCall) =>
                call.telephonySessionId === currentCall.telephonySessionId,
            ) &&
            // if delete all during active call
            !this.markedList.find((currentCall) => {
              const flag =
                call.telephonySessionId === currentCall.telephonySessionId;
              return flag;
            }),
        );
        if (endedCalls.length) {
          this.logger.log('self add end call list', endedCalls);
          this._addEndedCalls(endedCalls);
        }
      },
    );

    watch(
      this,
      // use watch multiple, because this.ready is async, can't become true in time, so need watch this.ready, too
      () =>
        [this._callLog.calls, this._callMonitor.allCalls, this.ready] as const,
      ([currentCalls = [], activeCalls = [], ready]) => {
        if (!ready) return;
        const ids: Record<string, boolean> = {};
        currentCalls.forEach((call) => {
          ids[call.telephonySessionId!] = true;
        });
        // if a callQueue call has been ignored, it will be added to endedCalls, when it comes back again, need to remove this from endedCalls
        activeCalls.forEach((call) => {
          ids[call.telephonySessionId!] = true;
        });
        const shouldRemovedCalls = this.endedCalls.filter(
          (call) => ids[call.telephonySessionId!],
        );
        if (shouldRemovedCalls.length) {
          this.removeEndedCalls(shouldRemovedCalls);
        }
      },
      {
        multiple: true,
      },
    );

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      this.listenEndedCallsAnsweredElsewhere(this._callMonitor);
    }
  }

  private listenEndedCallsAnsweredElsewhere(_callMonitor: CallMonitor) {
    fromWatchValue(this, () => this.endedCalls)
      .pipe(
        switchMap((endedCalls) => {
          const obsList$ = endedCalls.map((call, index) => {
            const { telephonySessionId, callQueueName } = call;
            if (!callQueueName || call.delegate) return EMPTY;

            return merge(
              _callMonitor.fromCallAnsweredElsewhere(telephonySessionId!).pipe(
                map((data) => {
                  this.logger.log('CallAnsweredElsewhere', data);
                  const { representedBy } = data;
                  const extensionId = representedBy.extensionId;

                  return {
                    result: 'Answered Elsewhere',
                    delegate: {
                      id: extensionId,
                      name: this.getMatchedContactName(extensionId),
                    },
                  } satisfies Partial<Call>;
                }),
              ),
              _callMonitor.fromMissedCalls(telephonySessionId!).pipe(
                map((data) => {
                  this.logger.log('MissedCalls', data);

                  return { result: 'Missed' } satisfies Partial<Call>;
                }),
              ),
            ).pipe(
              tap((data) => {
                this.updateEndCall(index, data);
              }),
            );
          });

          return merge(...obsList$);
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private getMatchedContactName(extensionId: string) {
    const matchedCompanyContact =
      this._companyContacts.allContactsMap[extensionId];
    return matchedCompanyContact
      ? `${matchedCompanyContact.firstName} ${matchedCompanyContact.lastName}`
      : '';
  }

  override onReset() {
    this.setSearchInput('');
    this.cleanEndedCalls();
  }

  private _addEndedCalls(endedCalls: Call[]) {
    endedCalls.forEach((call) => {
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        // when that is queue call, set as Answered Elsewhere
        if (isQueueCall(call) && isProceeding(call.telephonySession!)) {
          call.result = 'Ringing Elsewhere';
          call.delegationType = 'QueueForwarding';
        } else if (
          this._preInsertCall.isPreinsertStatusIgnored(call.telephonySessionId!)
        ) {
          call.result = 'Missed';
        } else {
          call.result = 'Disconnected';
          call.isRecording = false;
          call.warmTransferInfo = undefined;
        }
      } else {
        call.result = 'Disconnected';
        call.isRecording = false;
        call.warmTransferInfo = undefined;
      }
    });
    this.setEndedCalls(endedCalls, Date.now());
    this._callLog.sync();
  }

  // TODO: move to UI module
  // for track click to sms in call history
  @delegate('server')
  @track(trackEvents.clickToSMSCallHistory)
  async onClickToSMS() {
    //
  }

  // TODO: move to UI module
  // for track click to call in call history
  @delegate('server')
  @track((that: CallHistory) => [
    that._callingSettings?.callingMode === callingModes.ringout
      ? trackEvents.clickToDialCallHistoryWithRingOut
      : trackEvents.clickToDialCallHistory,
  ])
  async onClickToCall() {
    //
  }

  @delegate('server')
  async updateSearchInput(input: string) {
    this.setSearchInput(input);
  }

  @computed((that: CallHistory) => [
    that._callLog.calls,
    that._accountInfo.countryCode,
  ])
  get normalizedCalls() {
    return this._callLog.calls
      .map((call) => {
        const callFrom = {
          ...call.from,
        } as CallLog['calls'][number]['from'];
        if (callFrom!.phoneNumber) {
          callFrom!.phoneNumber = normalizeNumber({
            phoneNumber: callFrom!.phoneNumber,
            countryCode: this._accountInfo.countryCode,
            maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
          });
        }
        const callTo = {
          ...call.to,
        } as CallLog['calls'][number]['to'];
        if (callTo!.phoneNumber) {
          callTo!.phoneNumber = normalizeNumber({
            phoneNumber: callTo!.phoneNumber,
            countryCode: this._accountInfo.countryCode,
            maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
          });
        }

        const conferenceCallProps: {
          sessionId?: string;
          isConferenceCall?: boolean;
        } = {};
        if (this.conferenceCallMapping[call.telephonySessionId!]) {
          conferenceCallProps.sessionId = call.telephonySessionId;
          conferenceCallProps.isConferenceCall = true;
        }

        return {
          ...call,
          ...conferenceCallProps,
          from: callFrom,
          to: callTo,
        } as HistoryCall;
      })
      .sort(sortByStartTime);
  }

  get enableFullPhoneNumberMatch() {
    return this._callHistoryOptions?.enableFullPhoneNumberMatch ?? false;
  }

  /**
   * Allow sub class to have different find matches logic.
   * @param contactMapping
   * @param call
   * @returns
   */
  findMatches(contactMapping: Record<string, Entity[]>, call: Call) {
    const pickNumber = this.enableFullPhoneNumberMatch
      ? pickFullPhoneNumber
      : pickPhoneOrExtensionNumber;

    const fromNumber =
      call.from &&
      pickNumber(call.from.phoneNumber!, call.from.extensionNumber);
    const toNumber =
      call.to && pickNumber(call.to.phoneNumber!, call.to.extensionNumber);

    const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
    const toMatches = (toNumber && contactMapping[toNumber]) || [];
    return {
      fromMatches,
      toMatches,
    };
  }

  @computed
  get callsInfo() {
    const acc = {
      sessionIds: [] as string[],
      telephonySessionIds: [] as string[],
      map: {} as Record<string, HistoryCall>,
      telephonySessionIdCallMap: {} as Record<string, HistoryCall>,
      calls: [] as HistoryCall[],
    };

    const contactMapping = this._contactMatcher?.dataMapping ?? {};
    const activityMapping = this._activityMatcher?.dataMapping ?? {};
    const callMatched = this._callMonitor.callMatched ?? {};
    const telephonySessionIds: Record<string, boolean> = {};
    const calls = this.normalizedCalls.map((call) => {
      telephonySessionIds[call.telephonySessionId!] = true;
      const fromName = call.from!.name || call.from!.phoneNumber;
      const toName = call.to.name || call.to.phoneNumber;
      const { fromMatches, toMatches } = this.findMatches(
        contactMapping,
        call as Call,
      );
      const activityMatches = activityMapping[call.sessionId!] || [];
      const matched = callMatched[call.sessionId!];
      const item = {
        ...call,
        fromName,
        toName,
        fromMatches,
        toMatches,
        activityMatches,
        toNumberEntity: matched,
      };

      acc.sessionIds.push(call.sessionId!);
      acc.telephonySessionIds.push(call.telephonySessionId!);
      acc.map[call.sessionId!] = item;
      acc.telephonySessionIdCallMap[call.telephonySessionId!] = item;

      return item;
    });
    const filteredEndedCalls = this.endedCalls
      .filter((call) => !telephonySessionIds[call.telephonySessionId!])
      .map((call) => {
        const activityMatches = activityMapping[call.sessionId] || [];
        const fromNumber =
          call.from && (call.from.phoneNumber || call.from.extensionNumber);
        const toNumber =
          call.to && (call.to.phoneNumber || call.to.extensionNumber);
        const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
        const toMatches = (toNumber && contactMapping[toNumber]) || [];
        const item = {
          ...call,
          activityMatches,
          fromMatches,
          toMatches,
        } as HistoryCall;

        acc.sessionIds.push(call.sessionId!);
        acc.telephonySessionIds.push(call.telephonySessionId!);
        acc.map[call.sessionId!] = item;
        acc.telephonySessionIdCallMap[call.telephonySessionId!] = item;

        return item;
      });
    const result = [...filteredEndedCalls, ...calls].sort(
      sortByStartTime,
    ) as HistoryCall[];

    acc.calls = result;

    return acc;
  }

  get calls() {
    return this.callsInfo.calls;
  }

  /**
   * the history all calls include the calls from callMonitor and the calls from callHistory, means all the call that user ever have or processing
   */
  @computed
  get allCalls() {
    return [...this._callMonitor.allCalls, ...this.calls];
  }

  /**
   * the history all calls include the calls from callMonitor and the calls from callHistory, means all the call that user ever have or processing
   */
  @computed
  get allCallsMap() {
    return {
      ...this._callMonitor.callsInfo.map,
      ...this.callsInfo.map,
    };
  }

  /**
   * the history all calls include the calls from callMonitor and the calls from callHistory, means all the call that user ever have or processing
   */
  @computed
  get allCallsTelephonySessionIdMap() {
    return {
      ...this._callMonitor.callsInfo.telephonySessionIdCallMap,
      ...this.callsInfo.telephonySessionIdCallMap,
    };
  }

  /**
   * the history all calls include the calls from callMonitor and the calls from callHistory, means all the call that user ever have or processing
   */
  @computed
  get allCallsTelephonySessionId() {
    return [
      ...this._callMonitor.callsInfo.telephonySessionIds,
      ...this.callsInfo.telephonySessionIds,
    ];
  }

  getHistoryCallBySessionId(sessionId: string) {
    return this.callsInfo.map[sessionId];
  }

  getCallBySessionId(sessionId: string) {
    return this.allCallsMap[sessionId];
  }

  getCallByTelephonySessionId(telephonySessionId: string) {
    return this.allCallsTelephonySessionIdMap[telephonySessionId];
  }

  @delegate('server')
  async debouncedSearch(...args: any[]) {
    this._debouncedSearch.call(this, ...args);
  }

  @delegate('server')
  async callsSearch() {
    if (this.searchInput === '') {
      return;
    }
    const calls = this.calls;
    const searchInput = this.searchInput;

    const searchResult = this.doSearch(calls, searchInput);
    this.setFilteredCalls(searchResult);
  }

  private doSearch(calls: HistoryCall[], searchInput: string) {
    const effectSearchStr = searchInput.toLowerCase().trim();
    if (
      !effectSearchStr ||
      effectSearchStr.length < this._minSearchStringLength
    ) {
      return calls;
    }
    return calls
      .filter((call) => {
        const { phoneNumber, matches } = getPhoneNumberMatches(call as Call);
        const matchesMatched = matches!.some((entities) => {
          if (!entities || !entities.id) return false;
          if (
            entities.name &&
            entities.name.toLowerCase().indexOf(effectSearchStr) > -1
          )
            return true;
          if (entities.phone && entities.phone.indexOf(effectSearchStr) > -1)
            return true;
          return false;
        });

        if (matchesMatched) {
          return true;
        }
        if (phoneNumber && phoneNumber.indexOf(effectSearchStr) > -1) {
          return true;
        }

        // search the from/to (besides the contact match data) info shown in the list
        const callerName =
          call.direction === 'Inbound' ? call.from?.name : call.to?.name;
        if (
          callerName &&
          callerName.toLowerCase().indexOf(effectSearchStr) > -1
        ) {
          return true;
        }

        return false;
      })
      .sort(sortByStartTime);
  }

  @computed
  get latestCalls() {
    if (this._activityMatcher?.dataMapping) {
      const newCalls = this.filterCalls.map((call) => ({
        ...call,
        activityMatches:
          this._activityMatcher?.dataMapping[call.sessionId!] || [],
      }));
      return newCalls;
    }
    return this.filterCalls;
  }

  @computed
  private get latestCallsInfo() {
    const telephonySessionIdMap = new Map<string, HistoryCall>();
    const preinsertTelephonySessionIdMap = new Map<string, HistoryCall>();

    this.latestCalls.forEach((history) => {
      const telephonySessionId = history.telephonySessionId!;
      if (history.__preinsert) {
        preinsertTelephonySessionIdMap.set(telephonySessionId, history);
      } else {
        telephonySessionIdMap.set(telephonySessionId, history);
      }
    });

    return {
      preinsertTelephonySessionIdMap,
      telephonySessionIdMap,
    };
  }

  @computed((that: CallHistory) => [that.normalizedCalls, that.endedCalls])
  get uniqueNumbers() {
    const output: string[] = [];
    const numberMap: Record<string, boolean> = {};
    (this.normalizedCalls as Call[]).forEach(
      addNumbersFromCall(output, numberMap, this.enableFullPhoneNumberMatch),
    );
    this.endedCalls.forEach(
      addNumbersFromCall(output, numberMap, this.enableFullPhoneNumberMatch),
    );
    return output;
  }

  @computed((that: CallHistory) => [that.normalizedCalls, that.endedCalls])
  get sessionIds() {
    const sessionIds: Record<string, boolean> = {};
    return this.normalizedCalls
      .map((call) => {
        sessionIds[call.sessionId!] = true;
        return call.sessionId!;
      })
      .concat(
        this.endedCalls
          .filter((call) => !sessionIds[call.sessionId])
          .map((call) => call.sessionId),
      );
  }

  @computed((that: CallHistory) => [
    that.searchInput,
    that.calls,
    that.filteredCalls,
  ])
  get filterCalls() {
    if (this.searchInput === '') {
      return this.calls;
    }
    return this.filteredCalls;
  }

  @computed
  get missedCallsUnreadCounts() {
    return this.calls.filter(
      (call) =>
        (call.result === callResults.missed ||
          call.result === callResults.voicemail) &&
        call.startTime &&
        call.startTime > this.lastCheckTimeStamp,
    ).length;
  }

  /**
   * get history by `telephonySessionId`
   *
   * when call end will preinsert the end call data into the `endedCalls`, and wait data `synced` from backend, the primary key be `telephonySessionId`, you can know the data source from the `preinsert` field, synced data will not have this field.
   */
  getHistoryByTelephonySessionId(
    telephonySessionId: string | null | undefined,
  ) {
    if (!telephonySessionId) return undefined;

    return (
      this.latestCallsInfo.telephonySessionIdMap.get(telephonySessionId) ||
      this.latestCallsInfo.preinsertTelephonySessionIdMap.get(
        telephonySessionId,
      )
    );
  }
}
