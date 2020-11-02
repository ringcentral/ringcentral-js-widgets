import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import EventEmitter from 'events';
import { Module } from 'ringcentral-integration/lib/di';

import {
  dialoutStatuses,
  DialoutStatusesType,
  messageTypes,
} from '../../enums';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import {
  EvAddSessionNotification,
  EvBaseCall,
  EvDropSessionNotification,
  EvEndedCall,
  EvHoldResponse,
  EvOffhookInitResponse,
  EvOffhookTermResponse,
} from '../../lib/EvClient/interfaces';
import { Deps, Presence } from './EvPresence.interface';

@Module({
  name: 'EvPresence',
  deps: [
    'EvSubscription',
    'EvCallDataSource',
    'EvClient',
    'Storage',
    'Beforeunload',
    'Alert',
    { dep: 'PresenceOptions', optional: true },
  ],
})
class EvPresence extends RcModuleV2<Deps> implements Presence {
  beforeunloadHandler = () => false;
  eventEmitter = this._deps.evCallDataSource.eventEmitter;

  evPresenceEvents = new EventEmitter();

  showOffHookInitError = true;

  get callIds() {
    return this._deps.evCallDataSource.callIds;
  }

  get otherCallIds() {
    return this._deps.evCallDataSource.otherCallIds;
  }

  get callLogsIds() {
    return this._deps.evCallDataSource.callLogsIds;
  }

  get callsMapping() {
    return this._deps.evCallDataSource.callsMapping;
  }

  get rawCallsMapping() {
    return this._deps.evCallDataSource.rawCallsMapping;
  }

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvPresence',
    });
  }

  @storage
  @state
  isOffhook = false;

  @storage
  @state
  isManualOffhook = false;

  @storage
  @state
  isOffhooking = false;

  @storage
  @state
  dialoutStatus: DialoutStatusesType = dialoutStatuses.idle;

  @computed((that: EvPresence) => [that.callIds, that.callsMapping])
  get calls() {
    return this.callIds
      .map((id) => this.callsMapping[id])
      .filter((call) => !!call);
  }

  @computed((that: EvPresence) => [that.otherCallIds, that.callsMapping])
  get otherCalls() {
    return this.otherCallIds.map((id) => this.callsMapping[id]);
  }

  @computed((that: EvPresence) => [that.callLogsIds, that.callsMapping])
  get callLogs() {
    return this.callLogsIds.map((id) => this.callsMapping[id]);
  }

  @action
  setDialoutStatus(status: DialoutStatusesType) {
    if (this.dialoutStatus !== status) {
      this.dialoutStatus = status;
    }
  }

  @action
  setOffhookInit() {
    this.isOffhooking = false;
    this.isOffhook = true;
    this._checkBeforeunload();
  }

  @action
  setOffhookTerm() {
    this.isOffhooking = false;
    this.isOffhook = false;
    this.isManualOffhook = false;
    this._checkBeforeunload();
  }

  @action
  setIsManualOffhook(isManualOffhook: boolean) {
    this.isManualOffhook = isManualOffhook;
  }

  @action
  setOffhook(status: boolean) {
    this.isOffhook = status;
    this._checkBeforeunload();
  }

  @action
  setOffhooking(offhooking: boolean) {
    this.isOffhooking = offhooking;
  }

  addNewCall(call: EvBaseCall) {
    this._deps.evCallDataSource.addNewCall(call);
  }

  addNewSession(session: EvAddSessionNotification) {
    this._deps.evCallDataSource.addNewSession(session);
  }

  dropSession(dropSession: EvDropSessionNotification) {
    this._deps.evCallDataSource.dropSession(dropSession);
  }

  removeEndedCall(endedCall: EvEndedCall) {
    this._deps.evCallDataSource.removeEndedCall(endedCall);
  }

  setCallHoldStatus(res: EvHoldResponse) {
    this._deps.evCallDataSource.setCallHoldStatus(res);
  }

  clearCalls() {
    this._deps.evCallDataSource.clearCalls();
  }

  onInitOnce() {
    this._bindSubscription();
  }

  private _bindSubscription() {
    this._deps.evSubscription
      .subscribe(
        EvCallbackTypes.OFFHOOK_INIT,
        (data: EvOffhookInitResponse) => {
          this.evPresenceEvents.emit(EvCallbackTypes.OFFHOOK_INIT, data);
          if (data.status === 'OK') {
            this.setOffhookInit();
          } else {
            // when that is reject integrated softphone, we not alert error
            if (this.showOffHookInitError) {
              this._deps.alert.danger({
                message: messageTypes.OFFHOOK_INIT_ERROR,
              });
            }
            this.setOffhookTerm();
            this.showOffHookInitError = true;
          }
        },
      )
      .subscribe(
        EvCallbackTypes.OFFHOOK_TERM,
        (data: EvOffhookTermResponse) => {
          if (data.status === 'OK') {
            this.setOffhookTerm();
          } else {
            this._deps.alert.danger({
              message: messageTypes.OFFHOOK_TERM_ERROR,
            });
            console.error(data);
          }
        },
      )
      .subscribe(EvCallbackTypes.ADD_SESSION, (data) => {
        if (data.status === 'OK') {
          this.addNewSession(data);
        } else {
          this._deps.alert.danger({
            message: messageTypes.ADD_SESSION_ERROR,
          });
        }
      })
      .subscribe(EvCallbackTypes.DROP_SESSION, (data) => {
        if (data.status === 'OK') {
          this.dropSession(data);
        } else {
          this._deps.alert.danger({
            message: messageTypes.DROP_SESSION_ERROR,
          });
        }
      })
      .subscribe(EvCallbackTypes.HOLD, (data) => {
        if (data.status === 'OK') {
          this.setCallHoldStatus(data);
        } else {
          this._deps.alert.danger({
            message: messageTypes.HOLD_ERROR,
          });
        }
      })
      .subscribe(EvCallbackTypes.NEW_CALL, (data) => {
        this.addNewCall(data);
      })
      .subscribe(EvCallbackTypes.END_CALL, (data) => {
        const id = this._deps.evClient.encodeUii(data);
        if (!this.callsMapping[id]) return;
        if (!this.isManualOffhook) {
          this._deps.evClient.offhookTerm();
        }
        this.removeEndedCall(data);
      });
  }

  private _checkBeforeunload() {
    if (this.isOffhook) {
      this._deps.beforeunload.add(this.beforeunloadHandler);
    } else {
      this._deps.beforeunload.remove(this.beforeunloadHandler);
    }
  }

  get isCallConnected() {
    return this.dialoutStatus === dialoutStatuses.callConnected;
  }
}

export { EvPresence };
