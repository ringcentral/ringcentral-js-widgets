import type { SmartNotes } from '@ringcentral-integration/ai-notes/src/app/services';
import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import {
  AppFeatures,
  type CallMadeLocation,
  ConnectivityManager,
  RateLimiter,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  type Theme,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  slideInViewTransition,
  SyncTabId,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  ComposeText,
  MessageStore,
} from '@ringcentral-integration/micro-message/src/app/services';
import { IntegrationConfig } from '@ringcentral-integration/micro-setting/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  action,
  computed,
  delegate,
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  state,
  useConnector,
} from '@ringcentral-integration/next-core';
import {
  HistoryAction,
  HistoryActionType,
} from '@ringcentral-integration/next-widgets/components/ActionMenuList/useHistoryActionButtons';
import React, { useMemo, useRef } from 'react';
import type { StateSnapshot } from 'react-virtuoso';

import { useContactRenderInfoFromCallHistory } from '../../hooks';
import { Call, CallHistory, CallLogTasks, HistoryCall } from '../../services';
import { CallViewState } from '../CallView/services/CallViewState';
import { DialerView } from '../DialerView';

import type {
  CallsListPanelSpringProps,
  CallsListViewSpringOptions,
  CallsListViewSpringProps,
  ViewCallsFilterType,
} from './CallsList.view.interface';
import { CallsListPage } from './CallsListPage';
import { type CallsListItemViewableManager } from './CallsListViewable';
import i18n, { t } from './i18n';

type UseCallHistoryItemInfoOptions = {
  selectIndex: number;
  variant: 'list' | 'detail';
};

@injectable({
  name: 'CallsListViewSpring',
})
export class CallsListViewSpring extends RcViewModule {
  // @portal
  // private confirmDeleteModal = this._modalView.create<{
  //   call: HistoryCall;
  // }>({
  //   props: ({ call }) => {
  //     return {
  //       variant: 'confirm',
  //       loadingMode: 'button',
  //       header: t('deleteCallHistory'),
  //       content: t('sureToDeleteCallHistory'),
  //       confirmButtonText: t('delete'),
  //       // avoid the action menu be focus back, because that already be hidden
  //       disableBackdropClick: false,
  //       confirmButtonProps: dangerButtonProps,
  //       onConfirm: () => {
  //         const callId = call.id;
  //         if (!callId) return;
  //         // this._callLogger;
  //         // TODO: delete call log
  //       },
  //       ['data-sign']: 'deleteModal',
  //     };
  //   },
  // });

  private get disableLinks() {
    return (
      this._connectivityManager.isOfflineMode ||
      this._connectivityManager.isVoipOnlyMode ||
      this._rateLimiter.restricted
    );
  }

  @dynamic('SmartNotes')
  protected readonly _smartNotes?: SmartNotes;

  @dynamic('CallsListItemViewableManager')
  private _callsListItemViewableManager?: CallsListItemViewableManager;

  @dynamic('Theme')
  private _theme?: Theme;

  constructor(
    private _callViewState: CallViewState,
    private _connectivityManager: ConnectivityManager,
    private _callHistory: CallHistory,
    private _rateLimiter: RateLimiter,
    private _call: Call,
    private _messageStore: MessageStore,
    private _router: RouterPlugin,
    private _appFeatures: AppFeatures,
    private _toast: Toast,
    private _integrationConfig: IntegrationConfig,
    @optional() private _dialerView?: DialerView,
    @optional() private _composeText?: ComposeText,
    @optional() private _callLogTasks?: CallLogTasks,
    @optional('CallsListViewOptions')
    private _callsListViewOptions?: CallsListViewSpringOptions,
  ) {
    super();
  }

  useCallHistoryItemInfo = (
    call: HistoryCall,
    // TODO: support select contact
    {
      selectIndex,
      variant = 'list',
      delaySavingState,
      DelayComponent,
    }: UseCallHistoryItemInfoOptions & {
      delaySavingState?: {
        delayUpdatingStartTime: number;
        delayUpdatingMinutes: number;
      } | null;
      DelayComponent?: React.ComponentType<{
        startTime: number;
        durationMinutes: number;
      }>;
    },
  ): {
    info: ReturnType<typeof useContactRenderInfoFromCallHistory>;
    actions: HistoryAction[];
  } => {
    const inCallListView = variant === 'list';

    const info = useContactRenderInfoFromCallHistory(call, {
      phoneNumberDisplayMode: inCallListView
        ? 'phoneNumber'
        : // in call detail view, the phoneNumber already display in other place
          'unknown',
      startTimeMode: inCallListView ? 'withoutTime' : 'withTime',
      hideBlockedFromInfo: true,
      showLogInfo: this.displayCRMLog,
      delaySavingState,
      DelayComponent,
    });

    const {
      isOfflineMode,
      isWebphoneUnavailableMode,
      isWebphoneInitializing,
      restricted,
      isIdle,
      disableLinks,
      hasInternalSMSPermission,
      hasOutboundSMSPermission,
      // isCDCEnabled,
    } = useConnector(() => ({
      disableLinks: this.disableLinks,
      isOfflineMode: this._connectivityManager.isOfflineMode,
      isWebphoneUnavailableMode:
        this._connectivityManager.isWebphoneUnavailableMode,
      isWebphoneInitializing: this._connectivityManager.isWebphoneInitializing,
      restricted: this._rateLimiter.restricted,
      isIdle: Boolean(this._call && this._call.isIdle),
      hasInternalSMSPermission: this._appFeatures.hasInternalSMSPermission,
      hasOutboundSMSPermission: this._appFeatures.hasOutboundSMSPermission,
      // isCDCEnabled: this._appFeatures.isCDCEnabled,
    }));

    const { t } = useLocale(i18n);

    const {
      renderInfo,
      formattedPhoneNumber,
      showViewLogIcon,
      isConferenceCall,
    } = info;

    const { dialToPhoneNumber, matchedContact, type } = renderInfo;

    const actions = useMemo(() => {
      const actions: HistoryAction[] = [];

      if (showViewLogIcon) {
        const thirdPartyName = this._integrationConfig.name;
        if (process.env.NODE_ENV !== 'production' && !thirdPartyName) {
          // eslint-disable-next-line no-console
          console.error(
            '[CallsListView] showViewLogIcon be true, but thirdPartyLogAppName not be set, must set that',
          );
        }

        actions.push({
          type: 'viewLog',
          label: t('viewInCrm', {
            thirdPartyLogAppName: thirdPartyName!,
          }),
        });
      }

      // when that be conference call, not have any other actions
      if (isConferenceCall) return actions;

      if (dialToPhoneNumber) {
        actions.push({
          type: 'call',
          disabled:
            isOfflineMode ||
            isWebphoneUnavailableMode ||
            isWebphoneInitializing ||
            restricted ||
            !isIdle ||
            disableLinks,
        });

        if (this._appFeatures.hasComposeTextPermission) {
          actions.push({
            type: 'text',
            disabled:
              disableLinks ||
              (type === 'extensionNumber'
                ? !hasInternalSMSPermission
                : !hasOutboundSMSPermission),
          });
        }
      }

      actions.push(
        ...this._integrationConfig.getActionButtons({
          dialToPhoneNumber,
          matchedContact,
          disabled: disableLinks,
        }),
      );

      // if (markAble) {
      //   actions.push({
      //     type: unreadCounts === 0 ? 'mark' : 'unmark',
      //     disabled: disableLinks,
      //   });
      // }

      if (variant === 'list' && formattedPhoneNumber) {
        actions.push({
          type: 'copyNumber',
        });
      }

      // TODO: our old version still not support delete call history
      // actions.push({
      //   type: 'delete',
      //   disabled: disableLinks,
      // });

      return actions;
    }, [
      dialToPhoneNumber,
      disableLinks,
      formattedPhoneNumber,
      hasInternalSMSPermission,
      hasOutboundSMSPermission,
      isConferenceCall,
      isIdle,
      isOfflineMode,
      isWebphoneInitializing,
      isWebphoneUnavailableMode,
      matchedContact,
      restricted,
      showViewLogIcon,
      t,
      type,
      variant,
    ]);

    return {
      info,
      actions,
    };
  };

  useActionsHandler = (
    call: HistoryCall,
    info: ReturnType<typeof useContactRenderInfoFromCallHistory>,
    location: CallMadeLocation,
  ) => {
    // TODO: select contact auto log when autoLog be enable

    const telephonySessionId = call.telephonySessionId;
    return async <T extends HistoryActionType>(actionType: T) => {
      this.logger.log('exec actionType', actionType, {
        telephonySessionId,
      });
      const { renderInfo, signalSourceInfo } = info;
      const { matchedContact } = renderInfo;

      switch (actionType) {
        case 'viewDetail': {
          const callLogInfo =
            this._callHistory.getHistoryByTelephonySessionId(
              telephonySessionId,
            );

          if (callLogInfo) {
            await slideInViewTransition(
              () => this._router.push(`/history/${telephonySessionId}`),
              this._theme?.reducedMotion,
            );

            break;
          }

          this.logger.log(
            `disableLinks: ${this.disableLinks}, ${telephonySessionId} not found`,
          );

          break;
        }
        case 'addEntity':
          this._integrationConfig.onCreateEntity?.(signalSourceInfo);
          break;
        case 'viewEntity':
          this._integrationConfig.onViewEntity?.(matchedContact, {
            isMaybeMatch: !!renderInfo.metadata.showMaybe,
            call,
          });
          break;
        case 'call':
          {
            const actionInfo = info.getActionInfo();
            if (actionInfo && this._dialerView) {
              this._dialerView.trackCallingEvent(location);
              this._dialerView.call({ recipient: actionInfo });

              this._messageStore.onClickToCall({
                // for track conversation.type
                fromType: 'CallHistory',
              });

              this._router.push('/dialer', {
                [SyncTabId.DIALPAD]: 'keypad',
              });
            } else if (process.env.NODE_ENV !== 'production') {
              // eslint-disable-next-line no-console
              console.error('[CallsListView], can\'t handle "call" action', {
                renderInfo,
                matchedContact,
                conversation: call,
              });
            }
          }
          break;
        case 'text': {
          const actionInfo = info.getActionInfo();
          if (actionInfo) {
            this._composeText?.addToNumber(actionInfo);

            this._router.push('/composeText');
            // for track
            this._messageStore.onClickToSMS();
          } else if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error('[CallsListView], can\'t handle "call" action', {
              renderInfo,
              matchedContact,
              conversation: call,
            });
          }

          break;
        }
        case 'copyNumber':
          {
            const result = info.copyNumber();
            if (result) {
              this._toast.success({ message: result, allowDuplicates: false });
            }
          }
          break;
        case 'viewLog':
          {
            this._callLogTasks?.openTask(call);
          }
          break;
        // case 'delete':
        //   if (!callLogId) return;
        //   this._modalView.open(this.confirmDeleteModal, {
        //     call,
        //   });

        //   break;

        default:
          this.logger.warn(
            `CallsListView, can't handle "${actionType}" action`,
          );
      }
    };
  };

  @state
  viewCallsFilter: ViewCallsFilterType = 'all';

  @action
  private _setViewCallsFilter(val: ViewCallsFilterType) {
    this.viewCallsFilter = val;
  }

  @delegate('server')
  async setViewCallsFilter(val: ViewCallsFilterType) {
    this._setViewCallsFilter(val);
  }

  @state
  lastPositions: Record<string, StateSnapshot | undefined> = {};

  @action
  private _setLastPosition(type: ViewCallsFilterType, val?: StateSnapshot) {
    const index = type || 'undefined';
    this.lastPositions[index] = val;
  }

  @delegate('server')
  async setLastPosition(type: ViewCallsFilterType, val?: StateSnapshot) {
    this._setLastPosition(type, val);
  }

  @computed
  get viewCalls() {
    switch (this.viewCallsFilter) {
      case 'missed': {
        return this.latestCalls.filter(
          (call) =>
            call.result === 'Missed' ||
            (call.result as any) === 'Answered Elsewhere',
        );
      }
      case 'outgoing': {
        return this.latestCalls.filter(
          (call) => call.direction === callDirection.outbound,
        );
      }
      case 'incoming': {
        return this.latestCalls.filter(
          (call) => call.direction === callDirection.inbound,
        );
      }
      case 'logged': {
        return this.latestCalls.filter((call) => call.isLogged);
      }
      case 'unlogged': {
        return this.latestCalls.filter((call) => !call.isLogged);
      }
      case 'all':
      default:
        return this.latestCalls;
    }
  }

  @computed
  get latestCalls() {
    if (!this._callLogTasks && !this._smartNotes)
      return this._callHistory.latestCalls;

    return this._callHistory.latestCalls.map((call) => {
      return {
        ...call,
        ...this._callViewState.getExtraLogData(
          call.sessionId,
          call.telephonySessionId!,
        ),
      } as HistoryCall;
    });
  }

  get displayCRMLog() {
    return this._callsListViewOptions?.displayCRMLog ?? false;
  }

  @computed
  get viewCallsFilterSelections() {
    const crmAdditionalFilters = this.displayCRMLog
      ? [
          {
            label: t('callsFilterLogged'),
            value: 'logged',
          },
          {
            label: t('callsFilterUnLogged'),
            value: 'unlogged',
          },
        ]
      : [];
    return [
      {
        label: t('callsFilterAll'),
        value: 'all',
      },
      {
        label: t('callsFilterMissed'),
        value: 'missed',
      },
      {
        label: t('callsFilterOutgoing'),
        value: 'outgoing',
      },
      {
        label: t('callsFilterIncoming'),
        value: 'incoming',
      },
      ...crmAdditionalFilters,
    ];
  }

  getUIProps(_: CallsListViewSpringProps): UIProps<CallsListPanelSpringProps> {
    const index = this.viewCallsFilter || 'undefined';
    return {
      calls: this.viewCalls,
      lastPosition: this.lastPositions[index],
      searchInput: this._callHistory.searchInput,
      viewCallsFilter: this.viewCallsFilter,
      viewCallsFilterSelections: this.viewCallsFilterSelections,
    };
  }

  getUIFunctions(
    _: CallsListViewSpringProps,
  ): UIFunctions<CallsListPanelSpringProps> {
    return {
      setLastPosition: (type, position) => {
        this.setLastPosition(type, position);
      },
      onSearchInputChange: (value: string) => {
        this._callHistory.updateSearchInput(value);
        this._callHistory.debouncedSearch();
      },
      setViewCallsFilter: (value: ViewCallsFilterType) =>
        this.setViewCallsFilter(value),
      useCallHistoryItemInfo: this.useCallHistoryItemInfo,
      useActionsHandler: this.useActionsHandler,
      onFocus: () => {
        this._callHistory.updateLastCheckTimeStamp();
      },
      useItemRender: this._callsListItemViewableManager?.useItemRender,
    };
  }

  component(props: CallsListViewSpringProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component = this._callsListViewOptions?.component || CallsListPage;

    return <Component {..._props} {...uiFunctions} />;
  }
}

export type UseCallsListActions = InstanceType<
  typeof CallsListViewSpring
>['useActionsHandler'];

export type OnCallsListActionsType = ReturnType<UseCallsListActions>;

export type UseCallHistoryItemInfo = InstanceType<
  typeof CallsListViewSpring
>['useCallHistoryItemInfo'];

// export type OnCallsListActionsType = ReturnType<UseCallsListActions>;
