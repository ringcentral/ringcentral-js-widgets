import type { Call as ICall } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { isOutbound } from '@ringcentral-integration/commons/lib/callLogHelpers';
import {
  Toast,
  ToastManager,
} from '@ringcentral-integration/micro-core/src/app/services';
import { useToastItemView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  action,
  computed,
  delegate,
  injectable,
  portal,
  PortManager,
  RcModule,
  RouterPlugin,
  state,
  StoragePlugin,
  takeUntilAppDestroy,
  userStorage,
} from '@ringcentral-integration/next-core';
import { Link } from '@ringcentral/spring-ui';
import React from 'react';
import { tap } from 'rxjs';

import type { DialerView } from '../../views/DialerView';
import { Call } from '../Call';
import { CallHistory, type HistoryCall } from '../CallHistory';
import { CallMonitor } from '../CallMonitor';

import type {
  CallLogStatus,
  CallSelectionMap,
  CallsMapping,
} from './CallLogTasks.interface';
import { t } from './i18n';

const DEFAULT_ISSUE_TACKING_SETTINGS_URL = '/settings/issuesTracking';

@injectable({
  name: 'CallLogTasks',
})
export class CallLogTasks extends RcModule {
  protected uniqueManager = this._toastManager.createUniqueManager();

  constructor(
    protected _router: RouterPlugin,
    protected _toast: Toast,
    protected _toastManager: ToastManager,
    protected _storage: StoragePlugin,
    protected _callMonitor: CallMonitor,
    protected _callHistory: CallHistory,
    protected _dialerView: DialerView,
    protected _call: Call,
    protected _portManager: PortManager,
  ) {
    super();
    this._storage.enable(this);
    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindC2DListeners();
      });
    } else {
      this.bindC2DListeners();
    }
  }

  async bindC2DListeners() {
    const newCallProcess$ = this._callMonitor.addListener('NewCall').pipe(
      tap((call) => {
        const { sessionId: identify, to } = call;
        const outboundCall = isOutbound(call);
        const toNumber = to?.phoneNumber;
        if (!identify) {
          this.logger.error('sessionId is undefined');
          return;
        }
        if (outboundCall) {
          const isCallFromCurrentDevice =
            this._dialerView.isCallFromCurrentDevice(toNumber!);

          if (isCallFromCurrentDevice) {
            const entity = this._call.lastRecipient;
            this.logger.log('call from current device', entity);
            if (entity && entity.resourceType === this.thirdPartyResourceType) {
              this.setOutboundCallEntityIdMapping(identify, entity.id!);
            }
          }
        }
        this.fetchAndUpdateTask(call);
      }),
      takeUntilAppDestroy,
    );
    newCallProcess$.subscribe();
  }

  async fetchAndUpdateTask(call: ICall, _fromHistory = false) {
    if (process.env.NODE_ENV !== 'production') {
      this.logger.error(
        'if you use CallLogTasks inside CRM project should override fetchAndUpdateTask method',
        call,
      );
    }
  }

  override async onInitOnce() {
    this._cleanCache();
  }

  @userStorage
  @state
  callsMappingState: CallsMapping = {};

  @action
  update(identify: string, newValue: Partial<CallLogStatus>) {
    const originalState = this.callsMappingState[identify];
    this.callsMappingState[identify] = {
      ...originalState,
      ...newValue,
    };
  }

  @delegate('server')
  async updateCallLogState(identify: string) {
    this.update(identify, {
      latestUpdateTime: Date.now(),
      isEdited: true,
    });
  }

  @delegate('server')
  async saveSuccess(identify: string, withAlert = true) {
    if (withAlert) {
      this._toast.success({
        message: t('saveLogSucceed'),
        allowDuplicates: false,
      });
    }
    const originalState = this.callsMappingState[identify];
    this.update(identify, {
      isSucceed: true,
      isEdited: !!(
        originalState &&
        originalState.latestUpdateTime &&
        originalState.latestSaveTime &&
        originalState.latestSaveTime < originalState.latestUpdateTime
      ),
      isSaving: false,
    });
  }

  @delegate('server')
  async saving(identify: string) {
    this.update(identify, {
      latestSaveTime: Date.now(),
      isSaving: true,
    });
  }

  @delegate('server')
  async markAsUnSaving(identify: string) {
    this.update(identify, {
      isSaving: false,
    });
  }

  @portal
  private saveErrorToast = this._toast.create({
    view: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { action } = useToastItemView();
      return (
        <>
          {t('saveError')}
          <Link
            onClick={() => {
              this._router.push(DEFAULT_ISSUE_TACKING_SETTINGS_URL);
              action?.close();
            }}
          >
            {' '}
            {t('reportIssue')}
          </Link>
        </>
      );
    },
    props: () => ({
      level: 'danger',
      ttl: 0,
    }),
  });

  @delegate('server')
  async saveError(identify: string, withoutToast = false) {
    this.update(identify, {
      isEdited: true,
      isSucceed: false,
      isSaving: false,
    });
    if (!withoutToast) {
      this.uniqueManager.unique(
        () => this._toast.open(this.saveErrorToast),
        'keep',
      );
    }
  }

  async openTask(_call: HistoryCall) {}

  protected _outboundCallEntityIdMapping: Record<string, string> = {};

  setOutboundCallEntityIdMapping(sessionId: string, entityId: string) {
    this._outboundCallEntityIdMapping[sessionId] = entityId;
  }

  @action
  protected deleteTask(ids: string[]) {
    ids.forEach((id) => {
      delete this.callsMappingState[id];
    });
  }

  /**
   * when app refresh, clean the expired data in the taskIds
   *
   * the expired means the data is not in the call history or call monitor
   */
  protected _cleanCache() {
    const expiredTaskIds: string[] = [];

    // only keep the data that will be show in our app
    this.taskIds.forEach((taskId) => {
      if (!this._callHistory.getCallBySessionId(taskId)) {
        expiredTaskIds.push(taskId);
      }
    });

    this.deleteTask(expiredTaskIds);
  }

  get taskIds(): string[] {
    return [];
  }

  get thirdPartyResourceType() {
    return '';
  }

  @computed
  get loggedMap() {
    return Object.keys(this.callsMappingState).reduce((acc, key) => {
      acc[key] = this.callsMappingState[key].isSucceed;
      return acc;
    }, {} as Record<string, boolean>);
  }

  get callSelectionMap(): CallSelectionMap {
    return {};
  }

  public getIsEditFromIdentify(identify: string) {
    return this.callsMappingState[identify]?.isEdited;
  }

  public getIsLoggedFromIdentify(identify: string) {
    return this.callsMappingState[identify]?.isSucceed;
  }
}
