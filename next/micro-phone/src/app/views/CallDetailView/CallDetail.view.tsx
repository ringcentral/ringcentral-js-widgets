import type { Theme } from '@ringcentral-integration/micro-core/src/app/services';
import {
  CallLogSyncTabId,
  slideOutViewTransition,
  SyncTabId,
  SyncTabView,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  autobind,
  dynamic,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  RouterPlugin,
  takeUntilAppDestroy,
  UIFunctions,
  UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useRef } from 'react';
import {
  distinctUntilChanged,
  filter,
  map,
  merge,
  pairwise,
  switchMap,
  tap,
} from 'rxjs';
import type { SetOptional } from 'type-fest';

import { CallLogTasks } from '../../services';
import { CallLogFormView } from '../CallLogFormView';
import { CallView } from '../CallView';
import { CallViewState } from '../CallView/services';
import { CallsListViewSpring } from '../CallsListViewSpring';

import type {
  CallDetailViewOptions,
  CallDetailViewPanelProps,
  CallDetailViewProps,
} from './CallDetail.view.interface';
import { CallDetailPage } from './CallDetailPage';

@injectable({
  name: 'CallDetailView',
})
export class CallDetailView extends RcViewModule {
  @dynamic('Theme')
  private _theme?: Theme;

  constructor(
    private _syncTabView: SyncTabView,
    private _callViewState: CallViewState,
    private _portManager: PortManager,
    private _callsListView: CallsListViewSpring,
    private _callView: CallView,
    private _router: RouterPlugin,
    @optional() private _callLogTasks?: CallLogTasks,
    @optional() private _callLogFormView?: CallLogFormView,
    @optional('CallDetailViewOptions')
    private _callDetailViewOptions?: CallDetailViewOptions,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindSetCallLogIdListener();
      });
    } else {
      this.bindSetCallLogIdListener();
    }
  }

  private bindSetCallLogIdListener() {
    // just for we know the call from preinsert change to synced call
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      this.fromCurrentCallLogTypeChange()
        .pipe(
          map(([_, callLog]) => {
            this.logger.log('call history synced:', callLog.telephonySessionId);
          }),
          takeUntilAppDestroy,
        )
        .subscribe();
    }

    this.routeGuard();
    this.bindViewCallListeners();
  }

  private bindViewCallListeners() {
    const viewingCallLogIdChange$ = this._callViewState.callDetailCallLog$.pipe(
      distinctUntilChanged(
        (prev, curr) => prev?.telephonySessionId === curr?.telephonySessionId,
      ),
    );

    viewingCallLogIdChange$
      .pipe(
        tap(() => {
          const active = this._syncTabView.getActive(SyncTabId.CALL_LOG);
          // when into call log detail view, ensure show the call log panel instead of ai-note
          if (active && active !== CallLogSyncTabId.LOG) {
            this._syncTabView.setActive(
              SyncTabId.CALL_LOG,
              CallLogSyncTabId.LOG,
            );
          }
        }),
        filter(Boolean),
        tap((callLog) => {
          this._callLogTasks?.fetchAndUpdateTask(callLog, true);
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private routeGuard() {
    const dataNotExist$ = this._callViewState.callDetailCallLog$.pipe(
      map((current) => Boolean(current)),
      distinctUntilChanged(),
      filter((current) => !current),
    );

    dataNotExist$
      .pipe(
        switchMap(async () => {
          if (this._callViewState.inCallDetailRouteTelephonySessionId()) {
            this.logger.log(
              'into history item page with invalid data, go back to dialer',
            );
            await this._router.replace('/dialer');
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  /**
   * use for know the call log type change
   */
  fromCurrentCallLogTypeChange() {
    return merge(
      this._callViewState.callDetailCallLog$.pipe(pairwise()),
      this._callViewState.postCallCallLog$.pipe(pairwise()),
    ).pipe(
      map(([prev, current]) => {
        if (prev && current && prev.__preinsert !== current.__preinsert) {
          return ['synced', current] as const;
        }
        return undefined;
      }),
      filter(Boolean),
    );
  }

  getUIProps(
    _: CallDetailViewProps,
  ): UIProps<SetOptional<CallDetailViewPanelProps, 'currentCallLog'>> {
    return {
      currentCallLog: this._callViewState.callDetailCallLog,
    };
  }

  getUIFunctions(
    _: CallDetailViewProps,
  ): UIFunctions<CallDetailViewPanelProps> {
    return {
      goBack: async () => {
        await slideOutViewTransition(
          () => this._router.push('/dialer'),
          this._theme?.reducedMotion,
        );
      },
      useCallHistoryItemInfo: this._callsListView.useCallHistoryItemInfo,
      useActionsHandler: this._callsListView.useActionsHandler,
    };
  }

  @autobind
  private FormArea() {
    const info = useConnector(() => this._callViewState.callDetailCallLog);

    return <this._callView.CallDetailForm variant="history" info={info} />;
  }

  component(props: CallDetailViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const { currentCallLog, ..._props } = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    if (!currentCallLog) {
      return null;
    }

    return (
      <CallDetailPage
        {..._props}
        {...uiFunctions}
        currentCallLog={currentCallLog}
        footer={this._callLogFormView ? <this._callLogFormView.Save /> : null}
      >
        <this.FormArea />
      </CallDetailPage>
    );
  }
}
