import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  AppFeatures,
  Auth,
  ExtensionFeatures,
  ExtensionInfo,
  Presence,
  RegionSettings,
  track,
  UserInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Brand,
  BrandConfig,
  Locale,
  Theme,
} from '@ringcentral-integration/micro-core/src/app/services';
import { slideInViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import type { CallingSettings } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  CallQueueManagementView,
  CPRClientView,
} from '@ringcentral-integration/micro-setting/src/app/views';
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
  UIFunctions,
  UIProps,
  useConnector,
  userStorage,
} from '@ringcentral-integration/next-core';
import { SettingsPanel } from '@ringcentral-integration/widgets/components/SettingsPanel';
import React, { useRef } from 'react';

import { type IntegrationConfig, QuickAccess, UserGuide } from '../../services';
import type { WelcomeView } from '../WelcomeView';

import type { AutoCallLoggingSwitchView } from './AutoCallLoggingSwitchView';
import type {
  SettingsViewOptions,
  SettingsViewPanelProps,
  SettingsViewProps,
} from './Settings.view.interface';
import { SettingsPanel as SpringSettingsPanel } from './SettingsPanel';

const DEFAULT_REGION_SETTINGS_URL = '/settings/region';
const DEFAULT_CALLING_SETTINGS_URL = '/settings/calling';
const DEFAULT_AUDIO_SETTINGS_URL = '/settings/audio';
const DEFAULT_FEEDBACK_SETTINGS_URL = '/settings/feedback';
const DEFAULT_ISSUE_TACKING_SETTINGS_URL = '/settings/issuesTracking';
const DEFAULT_THEME_SWITCH_URL = '/settings/theme';
const DEFAULT_AUTO_LOG_SETTINGS_URL = '/settings/autoCallLogSettings';
const DEFAULT_CALL_QUEUE_MANAGEMENT_URL = '/settings/callQueueManagement';

@injectable({
  name: 'SettingsView',
})
export class SettingsView extends RcViewModule {
  @dynamic('WelcomeView')
  welcomeView?: WelcomeView;

  @dynamic('AutoCallLoggingSwitchView')
  private _autoCallLoggingSwitchView?: AutoCallLoggingSwitchView;

  @dynamic('IntegrationConfig')
  private _integrationConfig?: IntegrationConfig;

  @state
  private autoLogTextUpdating: boolean = false;

  @action
  private _setAutoLogTextUpdating(val: boolean) {
    this.autoLogTextUpdating = val;
  }

  constructor(
    protected _userInfo: UserInfo,
    protected _auth: Auth,
    protected _theme: Theme,
    protected _brand: Brand,
    protected _locale: Locale,
    protected _accountInfo: AccountInfo,
    protected _extensionInfo: ExtensionInfo,
    protected _regionSettings: RegionSettings,
    protected _extensionFeatures: ExtensionFeatures,
    protected _appFeatures: AppFeatures,
    protected _router: RouterPlugin,
    protected _presence: Presence,
    protected _cPRClientView: CPRClientView,
    protected _callQueueManagementView: CallQueueManagementView,
    @optional('Version') protected _version?: string,
    @optional() protected _quickAccess?: QuickAccess,
    @optional() protected _userGuide?: UserGuide,
    @optional('SettingsViewOptions')
    protected _settingsViewOptions?: SettingsViewOptions,
  ) {
    super();
  }

  @dynamic('CallingSettings')
  protected readonly _callingSettings?: CallingSettings;

  @computed
  get loginNumber() {
    return (
      (this._userInfo.loginNumber &&
        formatNumber({
          phoneNumber: this._userInfo.loginNumber,
          countryCode: this._regionSettings.countryCode,
          areaCode: this._regionSettings.areaCode,
        })!) ||
      (this._brand.name as string)
    );
  }

  @userStorage
  @state
  popUpAppForInboundCall = true;

  @action
  private _togglePopUpAppForInboundCall() {
    this.popUpAppForInboundCall = !this.popUpAppForInboundCall;
  }

  @delegate('server')
  async togglePopUpAppForInboundCall() {
    this._togglePopUpAppForInboundCall();
  }

  @track(trackEvents.clickFeedback)
  trackOnFeedbackClick() {}

  getUIProps({
    showCalling = true,
    showAudio = true,
    showFeedback = this._settingsViewOptions?.showFeedback ?? true,
    // in spring-ui by default not show that
    showUserGuide = process.env.THEME_SYSTEM === 'spring-ui'
      ? // TODO: welcome page not include in this stage, but in test env we already have that test to check all exist case of welcome page can be passed to reduce wrong update in the future
        process.env.NODE_ENV === 'test'
        ? true
        : false
      : true,
    showPresenceSettings = true,
    showQuickAccess = false,
    params,
  }: SettingsViewProps): UIProps<SettingsViewPanelProps> {
    const loggedIn = this._auth.loggedIn;

    return {
      version: this._version!,
      loginNumber: this.loginNumber,
      showFeedback,
      showQuickAccess,
      showSpinner: !(
        this._accountInfo.ready &&
        this._auth.ready &&
        loggedIn &&
        this._extensionInfo.ready &&
        this._locale.ready &&
        this._regionSettings.ready &&
        (!this._callingSettings || this._callingSettings.ready) &&
        this._appFeatures.ready &&
        (!this._presence || this._presence.ready)
      ),
      showCalling:
        showCalling &&
        this._callingSettings &&
        this._appFeatures.isCallingEnabled,
      showAudio: showAudio && this._appFeatures.isCallingEnabled,
      showRegion:
        loggedIn &&
        this._regionSettings.showRegionSettings &&
        this._appFeatures.isCallingEnabled,
      currentLocale: this._locale.currentLocale,
      eulaLabel: this._brand.brandConfig.eulaLabel as string,
      eulaLink: this._brand.brandConfig.eulaLink as string,
      outboundSMS: this._appFeatures.hasComposeTextPermission,
      isCallQueueMember: this._extensionInfo.isCallQueueMember,
      dndStatus: this._presence?.dndStatus!,
      userStatus:
        // TODO: spring-ui use presenceStatus as the user status, because presenceStatus will group the user status and telephony status, that be real user status(in meeting also will be busy)
        (process.env.THEME_SYSTEM === 'spring-ui'
          ? this._presence?.presenceStatus
          : this._presence?.userStatus) || undefined,
      openPresenceSettings: !!(
        this._presence &&
        params &&
        params.showPresenceSettings
      ),
      showPresenceSettings:
        // https://jira_domain/browse/RCINT-43739
        // TODO: currently we only show the presence settings when has edit permission, but that may consider about the user which only has the read permission also should show but not allow to edit
        showPresenceSettings && this._appFeatures.hasEditPresenceStatus,
      showUserGuide: showUserGuide && !!this._userGuide?.hasPermission,
      brandConfig: this._brand.brandConfig as BrandConfig,
      showRemoveMeetingWarning:
        !!this._settingsViewOptions?.showRemoveMeetingWarning,
      showTrackingIssue: true,
      showMatchesToggle: this._settingsViewOptions?.showMatchesToggle,
      showPopUpForInboundCall:
        this._appFeatures.isCallingEnabled &&
        this._settingsViewOptions?.showPopUpForInboundCall,
      showMatches: !!this._settingsViewOptions?.showMatches,
      autoLogSMSEnabled: !!this._settingsViewOptions?.autoLogSMSEnabled,
      showThemeSwitch:
        this._theme.supportedThemeTypes &&
        this._theme.supportedThemeTypes.length > 1,
      autoLogSMSTitle: this._settingsViewOptions?.autoLogSMSTitle,
      enableAcceptQueueCallsControl:
        this._appFeatures.enableAcceptQueueCallsControl,
      versionContainer: this._settingsViewOptions?.versionContainer,
      autoLogTextUpdating: this.autoLogTextUpdating,
      isLogRefreshing: this._settingsViewOptions?.isLogRefreshing,
      ...(process.env.THEME_SYSTEM === 'spring-ui'
        ? {
            crmService: this._integrationConfig?.name,
            popUpAppForInboundCall:
              this._settingsViewOptions?.popUpAppForInboundCall ??
              this.popUpAppForInboundCall,
            customRenderInfo: this._settingsViewOptions?.customRenderInfo,
            showAutoLogSMS: !!this._settingsViewOptions?.showAutoLogSMS,
          }
        : undefined),
    };
  }

  private _navigateTo(url: string) {
    return slideInViewTransition(
      () => this._router.push(url),
      this._theme.reducedMotion,
    );
  }

  @delegate('server')
  private async onAutoLogSMSChange() {
    this._setAutoLogTextUpdating(true);

    try {
      await this._settingsViewOptions?.onAutoLogSMSChange?.();
    } finally {
      this._setAutoLogTextUpdating(false);
    }
  }

  getUIFunctions({
    regionSettingsUrl = DEFAULT_REGION_SETTINGS_URL,
    callingSettingsUrl = DEFAULT_CALLING_SETTINGS_URL,
    audioSettingsUrl = DEFAULT_AUDIO_SETTINGS_URL,
    feedbackSettingsUrl = DEFAULT_FEEDBACK_SETTINGS_URL,
    autoCallLogSettingsUrl = DEFAULT_AUTO_LOG_SETTINGS_URL,
  }: SettingsViewProps): UIFunctions<SettingsViewPanelProps> {
    return {
      onLogoutButtonClick: async () => {
        await this._auth.logout({ reason: 'Manually sign out' });
      },
      onRegionSettingsLinkClick: () => {
        this._navigateTo(regionSettingsUrl);
      },
      onCallingSettingsLinkClick: () => {
        this._navigateTo(callingSettingsUrl);
      },
      onAutoCallLogSettingLinkClick: () => {
        this._navigateTo(autoCallLogSettingsUrl);
      },
      onAudioSettingsLinkClick: () => {
        this._navigateTo(audioSettingsUrl);
      },
      onFeedbackSettingsLinkClick: () => {
        if (this._settingsViewOptions?.onFeedBackSettingsLink) {
          this._settingsViewOptions.onFeedBackSettingsLink();
        } else {
          this._navigateTo(feedbackSettingsUrl);
        }
        this.trackOnFeedbackClick();
      },
      onUserGuideClick: () => {
        if (process.env.THEME_SYSTEM === 'spring-ui' && this.welcomeView) {
          this.welcomeView.start(this._router.currentPath);
          return;
        }
        this._userGuide?.start();
      },
      onTrackingClick: () => {
        this._navigateTo(DEFAULT_ISSUE_TACKING_SETTINGS_URL);
      },
      onQuickAccessLinkClick: () => {
        this._quickAccess?.enter();
      },
      setAvailable: () => this._presence?.setAvailable(),
      setBusy: () => this._presence?.setBusy(),
      setDoNotDisturb: () => this._presence?.setDoNotDisturb(),
      setInvisible: () => this._presence?.setInvisible(),
      toggleAcceptCallQueueCalls: () =>
        this._presence?.toggleAcceptCallQueueCalls(),
      onToggleShowMatches: () =>
        this._settingsViewOptions?.onToggleShowMatches?.(),
      onTogglePopUpAppForInboundCall: (checked?: boolean) => {
        this._settingsViewOptions?.onTogglePopUpAppForInboundCall?.(checked);
        this.togglePopUpAppForInboundCall();
      },
      onAutoLogSMSChange: this.onAutoLogSMSChange.bind(this),
      onThemeSwitchClick: () => {
        this._navigateTo(DEFAULT_THEME_SWITCH_URL);
      },
      onCallQueueManagementClick: this._callQueueManagementView
        .enableCallQueueManagement
        ? () => {
            this._navigateTo(DEFAULT_CALL_QUEUE_MANAGEMENT_URL);
          }
        : undefined,
    };
  }

  component(props: SettingsViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
        // only spring-ui support those additional items
        ...(process.env.THEME_SYSTEM === 'spring-ui'
          ? {
              additional: this._settingsViewOptions?.additional,
              additionalLogItems: (
                <>
                  {
                    // when have inject the AutoCallLoggingSwitchView, it will be show the AutoCallLoggingSwitchView in the SettingsView
                    this._autoCallLoggingSwitchView ? (
                      <this._autoCallLoggingSwitchView.component />
                    ) : null
                  }
                  {this._settingsViewOptions?.additionalLogItems}
                </>
              ),
              additionalAnalytics:
                this._settingsViewOptions?.additionalAnalytics,
            }
          : undefined),
      };
    });

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      // use connector to ensure the update functions are updated
      const connectorUpdateFunctions = useConnector(() => ({
        onRefreshLog: this._settingsViewOptions?.onRefreshLog,
      }));

      const Component =
        this._settingsViewOptions?.component || SpringSettingsPanel;
      return (
        <Component {..._props} {...uiFunctions} {...connectorUpdateFunctions} />
      );
    }

    const Component = this._settingsViewOptions?.component || SettingsPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
