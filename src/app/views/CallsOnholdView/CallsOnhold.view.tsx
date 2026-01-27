import {
  AccountInfo,
  AppFeatures,
  ConnectivityManager,
  ConnectivityMonitor,
  ExtensionInfo,
  RateLimiter,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ContactMatcher,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { ContactDetailsView } from '@ringcentral-integration/micro-contacts/src/app/views';
import {
  Brand,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import { ModalView } from '@ringcentral-integration/micro-core/src/app/views';
import { ComposeText } from '@ringcentral-integration/micro-message/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  injectable,
  optional,
  PortManager,
  RouterPlugin,
  useParams,
} from '@ringcentral-integration/next-core';
import { filter } from 'ramda';

import {
  ActiveCallControl,
  CallingSettings,
  CallLogger,
  CallMonitor,
  Webphone,
} from '../../services';
import type {
  ActiveCallsViewOptions,
  ActiveCallsViewProps,
} from '../ActiveCallsView';
import { ActiveCallsView } from '../ActiveCallsView';
import { MergeCallConfirmView } from '../MergeCallConfirmView';
import { SwitchCallConfirmView } from '../SwitchCallConfirmView';

import type {
  CallsOnholdPanelProps,
  CallsOnholdViewProps,
  ICallsOnholdViewParams,
} from './CallsOnhold.view.interface';

@injectable({
  name: 'CallsOnholdView',
})
export class CallsOnholdView extends ActiveCallsView {
  constructor(
    protected override _brand: Brand,
    protected override _locale: Locale,
    protected override _callMonitor: CallMonitor,
    protected override _rateLimiter: RateLimiter,
    protected override _contactSearch: ContactSearch,
    protected override _regionSettings: RegionSettings,
    protected override _contactMatcher: ContactMatcher,
    protected override _callingSettings: CallingSettings,
    protected override _router: RouterPlugin,
    protected override _appFeatures: AppFeatures,
    protected override _connectivityMonitor: ConnectivityMonitor,
    protected override _connectivityManager: ConnectivityManager,
    protected override _accountInfo: AccountInfo,
    protected override _extensionInfo: ExtensionInfo,
    protected override _portManager: PortManager,
    protected override _modalView: ModalView,
    @optional() protected override _webphone?: Webphone,
    @optional() protected override _callLogger?: CallLogger,
    @optional() protected override _composeText?: ComposeText,
    @optional() protected override _mergeCallConfirmView?: MergeCallConfirmView,
    @optional()
    protected override _switchCallConfirmView?: SwitchCallConfirmView,
    @optional() protected override _contactDetailsView?: ContactDetailsView,
    @optional() protected override _activeCallControl?: ActiveCallControl,
    @optional('ActiveCallsViewOptions')
    protected override _activeCallsViewOptions?: ActiveCallsViewOptions,
  ) {
    super(
      _brand,
      _locale,
      _callMonitor,
      _rateLimiter,
      _contactSearch,
      _regionSettings,
      _contactMatcher,
      _callingSettings,
      _router,
      _appFeatures,
      _connectivityMonitor,
      _connectivityManager,
      _accountInfo,
      _extensionInfo,
      _portManager,
      _modalView,
      _webphone,
      _callLogger,
      _composeText,
      _mergeCallConfirmView,
      _switchCallConfirmView,
      _contactDetailsView,
      _activeCallControl,
      _activeCallsViewOptions,
    );
  }

  private params: ICallsOnholdViewParams = {};

  @computed((that: CallsOnholdView) => [
    that._callMonitor.allCalls,
    that.params.fromSessionId,
  ])
  get calls() {
    return filter(
      (call) =>
        !!(
          call.webphoneSession &&
          call.webphoneSession.id !== this.params.fromSessionId
        ),
      this._callMonitor.allCalls,
    );
  }

  override getUIProps(
    options: CallsOnholdViewProps,
  ): UIProps<CallsOnholdPanelProps> {
    return {
      ...super.getUIProps(options),
      calls: this.calls,
    };
  }

  override getUIFunctions(
    options: CallsOnholdViewProps,
  ): UIFunctions<CallsOnholdPanelProps> {
    return {
      ...super.getUIFunctions(options),
      onMerge: async (sessionId) => {
        // to track user click merge
        this._callMonitor.callsOnHoldClickMergeTrack();
      },
      onBackButtonClick: () => {
        if (this._webphone?.sessions.length) {
          this._router.goBack();
          return;
        }

        this._router.go(-2);
      },
      onAdd: () => {
        // to track use click add button
        this._callMonitor.callsOnHoldClickAddTrack();
        this._router.push(
          `/conferenceCall/dialer/${this.params.fromNumber}/${this.params.fromSessionId}`,
        );
      },
      getAvatarUrl: options.getAvatarUrl,
      webphoneHangup: async (sessionId) => {
        // track user click hangup on calls onhold page
        this._callMonitor.callsOnHoldClickHangupTrack();
        return this._webphone && this._webphone.hangup(sessionId);
      },
    };
  }

  override component(props: ActiveCallsViewProps) {
    this.params = useParams<ICallsOnholdViewParams>();

    return super.component(props);
  }
}
