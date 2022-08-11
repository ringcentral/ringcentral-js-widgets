import moment from 'moment';
import { filter, find, isEmpty, pick } from 'ramda';
import type MeetingServiceInfoResource from '@rc-ex/core/lib/definitions/MeetingServiceInfoResource';
import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
} from '@ringcentral-integration/core';
import { DEFAULT_LOCALE } from '@ringcentral-integration/i18n';

import {
  comparePreferences,
  generateRandomPassword,
  getDefaultMeetingSettings,
  getDefaultTopic,
  getInitializedStartTime,
  getMobileDialingNumberTpl,
  getPhoneDialingNumberTpl,
  MeetingType,
  prunePreferencesObject,
  UTC_TIMEZONE_ID,
} from '../../helpers/meetingHelper';
import { IMeeting } from '../../interfaces/Meeting.interface';
import background from '../../lib/background';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { trackEvents } from '../../enums/trackEvents';
import { Analytics } from '../AnalyticsV2';
import {
  ASSISTED_USERS_MYSELF,
  COMMON_SETTINGS,
  DEFAULT_LOCK_SETTINGS,
  LAST_MEETING_SETTINGS,
  PMIRequirePassword,
  RCM_PASSWORD_REGEX,
  SAVED_DEFAULT_MEETING_SETTINGS,
} from './constants';
import {
  getExtensionName,
  getHostId,
  getRcmUriRegExp,
  getRcvUriRegExp,
} from './helper';
import type {
  CommonPersonalMeetingSettings,
  DefaultScheduleLockedSettings,
  Deps,
  EffectiveScheduleUserSettings,
  LastMeetingSetting,
  LockedSettings,
  MeetingDelegator,
  MeetingDelegatorsResponse,
  MeetingInfoResponse,
  MeetingInitialExtraData,
  MeetingScheduleResource,
  Preferences,
  RcmInvitationInfo,
  RcMMeetingModel,
  RequirePwdTypeForPMI,
  SavedDefaultMeetingSetting,
  ScheduleMeetingLockedSettings,
  ScheduleMeetingResponse,
  UpdatingStatus,
  UserScheduleMeetingSettingResponse,
  UserSettings,
  UserTelephonySettingResponse,
} from './Meeting.interface';
import { MeetingErrors } from './meetingErrors';
import { meetingStatus } from './meetingStatus';

@Module({
  name: 'Meeting',
  deps: [
    'Brand',
    'Alert',
    'Client',
    'ExtensionInfo',
    'Storage',
    'VideoConfiguration',
    'Locale',
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'MeetingOptions', optional: true },
  ],
})
export class Meeting<T extends Deps = Deps>
  extends RcModuleV2<T>
  implements IMeeting
{
  // @ts-expect-error
  protected _fetchDelegatorsTimeout: NodeJS.Timeout = null;
  // @ts-expect-error
  private _fetchPersonMeetingTimeout: NodeJS.Timeout = null;
  // @ts-expect-error
  private _createMeetingPromise: Promise<ScheduleMeetingResponse>;

  constructor(deps: Deps) {
    // @ts-expect-error
    super({ deps, enableCache: true, storageKey: 'Meeting' });
  }

  @state
  meeting: RcMMeetingModel | null = null;

  @state
  isScheduling: boolean = false;

  @state
  // including meetingId whose are in updating status
  updatingStatus: UpdatingStatus = [];

  @storage
  @state
  personalMeeting: RcMMeetingModel | null = null;

  @storage
  @state
  savedDefaultMeetingSetting: SavedDefaultMeetingSetting = {};

  @storage
  @state
  lastMeetingSetting: LastMeetingSetting = {};

  @state
  delegators: MeetingDelegator[] = [];

  @state
  userSettings: Partial<UserSettings> = {};

  @state
  lockedSettings: Partial<LockedSettings> = {};

  @state
  preferences: Partial<Preferences> = {};

  @state
  isPreferencesChanged: boolean = false;

  get extensionName(): string {
    // @ts-expect-error
    return this._deps.extensionInfo.info?.name;
  }

  @computed(({ extensionName, currentLocale }: Meeting) => [
    extensionName,
    currentLocale,
  ])
  get defaultTopic(): string {
    return getDefaultTopic(this.extensionName, this.currentLocale);
  }

  @computed((that: Meeting) => [that.userSettings?.scheduleMeeting])
  get scheduleUserSettings(): Partial<UserScheduleMeetingSettingResponse> {
    return this.userSettings?.scheduleMeeting || {};
  }

  @computed((that: Meeting) => [that.userSettings?.telephony])
  get telephonyUserSettings(): Partial<UserTelephonySettingResponse> {
    return this.userSettings?.telephony || {};
  }

  @computed((that: Meeting) => [
    that.enablePersonalMeeting,
    that.enableServiceWebSettings,
    that.scheduleUserSettings.usePmiForScheduledMeetings,
  ])
  get usePmiDefaultFromSW(): boolean {
    // @ts-expect-error
    return (
      this.enablePersonalMeeting &&
      this.enableServiceWebSettings &&
      this.scheduleUserSettings.usePmiForScheduledMeetings
    );
  }

  @computed((that: Meeting) => [that.extensionInfo.info.id])
  get loginUser(): MeetingDelegator {
    return {
      id: `${this.extensionInfo.info.id}`,
      name: ASSISTED_USERS_MYSELF,
      isLoginUser: true,
    };
  }

  @computed((that: Meeting) => [that.lockedSettings?.scheduleMeeting])
  get scheduleLockedSettings(): Partial<ScheduleMeetingLockedSettings> {
    return this.lockedSettings?.scheduleMeeting || {};
  }

  @computed((that: Meeting) => [
    that.enableServiceWebSettings,
    that.scheduleLockedSettings,
  ])
  get defaultLockedSettings(): DefaultScheduleLockedSettings {
    if (!this.enableServiceWebSettings || !this.scheduleLockedSettings) {
      return {};
    }
    return pick(COMMON_SETTINGS, this.scheduleLockedSettings);
  }

  @computed((that: Meeting) => [
    that.enableServiceWebSettings,
    that.scheduleUserSettings,
  ])
  get commonUserSettings(): EffectiveScheduleUserSettings {
    if (!this.enableServiceWebSettings) {
      return {};
    }
    return pick(COMMON_SETTINGS, this.scheduleUserSettings);
  }

  @computed((that: Meeting) => [
    that.enablePersonalMeeting,
    that.personalMeeting,
  ])
  get commonPersonalMeetingSettings(): CommonPersonalMeetingSettings {
    if (!this.enablePersonalMeeting) {
      return {};
    }
    return pick([...COMMON_SETTINGS, 'password'], this.personalMeeting || {});
  }

  @computed((that: Meeting) => [that._deps.locale.currentLocale])
  get currentLocale() {
    return this._deps.locale.currentLocale || DEFAULT_LOCALE;
  }

  get pmiDefaultSettings(): RcMMeetingModel {
    if (!this.enableServiceWebSettings) {
      // @ts-expect-error
      return this.personalMeeting;
    }

    return this.enforcePassword(
      {
        ...this.initialMeetingSetting,
        settingLock: this.defaultLockedSettings,
      },
      {
        userSettings: this.commonUserSettings,
        personalMeetingSettings: this.commonPersonalMeetingSettings,
      },
      true,
    );
  }

  getGeneralDefaultSettings(): RcMMeetingModel {
    if (!this.enableServiceWebSettings) {
      const savedSetting = this.showSaveAsDefault
        ? this.savedDefaultMeetingSetting
        : this.lastMeetingSetting;
      return {
        ...this.initialMeetingSetting,
        ...savedSetting,
        meetingType: MeetingType.SCHEDULED,
      };
    }

    return this.enforcePassword(
      {
        ...this.initialMeetingSetting,
        settingLock: this.defaultLockedSettings,
      },
      {
        userSettings: this.commonUserSettings,
        personalMeetingSettings: this.commonPersonalMeetingSettings,
      },
      false,
    );
  }

  get defaultMeetingSetting(): RcMMeetingModel {
    const initialSetting = this.initialMeetingSetting;
    const usePmi = this.usePmiDefaultFromSW;
    const userSettings = this.userSettings;
    const savedSetting = this.showSaveAsDefault
      ? this.savedDefaultMeetingSetting
      : this.lastMeetingSetting;

    if (this.enableServiceWebSettings) {
      if (!isEmpty(userSettings)) {
        return usePmi
          ? this.pmiDefaultSettings
          : this.getGeneralDefaultSettings();
      }
      return initialSetting;
    }

    const meeting = {
      ...initialSetting,
      ...savedSetting,
      meetingType: MeetingType.SCHEDULED,
    };
    return meeting;
  }

  getInitialMeetingSetting() {
    const meetingName = getExtensionName({
      extensionInfo: this.extensionInfo,
      // @ts-expect-error
      enableScheduleOnBehalf: this.enableScheduleOnBehalf,
      // @ts-expect-error
      meeting: this.meeting,
      delegators: this.delegators,
    });
    const startTime = getInitializedStartTime();
    const hostId = getHostId({
      // @ts-expect-error
      enableScheduleOnBehalf: this.enableScheduleOnBehalf,
      // @ts-expect-error
      meeting: this.meeting,
      extensionInfo: this.extensionInfo,
    });
    const setting = getDefaultMeetingSettings(
      meetingName,
      this.currentLocale,
      startTime,
      hostId,
    );
    if (!this.enableServiceWebSettings) {
      return setting;
    }
    return {
      ...setting,
      ...DEFAULT_LOCK_SETTINGS,
      _pmiPassword: '',
    };
  }

  get initialMeetingSetting(): RcMMeetingModel {
    // @ts-expect-error
    return this.getInitialMeetingSetting();
  }

  get extensionInfo() {
    return this._deps.extensionInfo;
  }

  get showSaveAsDefault() {
    return this._deps.meetingOptions?.showSaveAsDefault ?? false;
  }

  get enablePersonalMeeting() {
    return this._deps.meetingOptions?.enablePersonalMeeting ?? false;
  }

  get enableReloadAfterSchedule() {
    return this._deps.meetingOptions?.enableReloadAfterSchedule ?? true;
  }

  get enableServiceWebSettings() {
    return this._deps.meetingOptions?.enableServiceWebSettings ?? false;
  }

  get enableInvitationApiFailedToast() {
    return this._deps.meetingOptions?.enableInvitationApiFailedToast ?? false;
  }

  // will follow dynamic brand config
  // @ts-expect-error
  get enableScheduleOnBehalf() {
    return (
      this._deps.brand.brandConfig?.enableRcmScheduleOnBehalf ??
      this._deps.meetingOptions?.enableScheduleOnBehalf
    );
  }

  get enableCustomTimezone() {
    return this._deps.meetingOptions?.enableCustomTimezone ?? false;
  }

  @action
  protected _updateDelegators(delegators: MeetingDelegator[]) {
    this.delegators = delegators;
  }

  @action
  protected _updateUserSettings(userSettings: UserSettings) {
    this.userSettings = userSettings;
  }

  @action
  protected _updateLockedSettings(lockedSettings: LockedSettings) {
    this.lockedSettings = lockedSettings;
  }

  @action
  protected _updatePersonalMeeting(personalMeeting: RcMMeetingModel) {
    this.personalMeeting = personalMeeting;
  }

  @action
  protected _updatePreferences(preferences: Preferences) {
    this.preferences = preferences;
  }

  @action
  protected _updateIsPreferencesChanged(isPreferencesChanged: boolean) {
    this.isPreferencesChanged = isPreferencesChanged;
  }

  @action
  protected _updateMeetingState(meeting: RcMMeetingModel) {
    this.meeting = meeting;
  }

  @action
  protected _updateUpdatingStatus(updatingStatus: UpdatingStatus) {
    this.updatingStatus = updatingStatus;
  }

  @action
  protected _updateLastMeetingSetting(lastMeetingSetting: LastMeetingSetting) {
    this.lastMeetingSetting = lastMeetingSetting;
  }

  @action
  protected _updateSavedDefaultMeetingSetting(
    savedDefaultMeetingSetting: SavedDefaultMeetingSetting,
  ) {
    this.savedDefaultMeetingSetting = savedDefaultMeetingSetting;
  }

  // @ts-expect-error
  @track((that: Meeting, isScheduling: boolean) => {
    if (!isScheduling) return;
    return (analytics: Analytics) => {
      const target = analytics.getTrackTarget();
      if (target) {
        return [
          trackEvents.clickMeetingSchedulePage,
          { router: target.router, 'Meeting Type': 'RCM' },
        ];
      }
    };
  })
  @action
  protected _updateIsScheduling(isScheduling: boolean) {
    this.isScheduling = isScheduling;
  }

  // @ts-expect-error
  protected async onInit() {
    await this._init();
  }

  override _shouldInit() {
    return super._shouldInit() && this._deps.videoConfiguration.isRCM;
  }

  override _shouldReset() {
    return (
      super._shouldReset() ||
      (this.ready && !this._deps.videoConfiguration.isRCM)
    );
  }

  async initScheduleFor(count = 0) {
    if (!this.enableScheduleOnBehalf) {
      return;
    }
    if (this._fetchDelegatorsTimeout) {
      clearTimeout(this._fetchDelegatorsTimeout);
    }
    try {
      const { records } = await this.getDelegators();
      if (!records || records.length === 0) {
        this.updateDelegators([]);
        return;
      }
      this.updateDelegators([this.loginUser, ...records]);
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.error('fetch delegators error:', e);
      if (count >= 5) {
        console.warn('retry after 10s');
        this._fetchDelegatorsTimeout = setTimeout(() => {
          this.initScheduleFor(count + 1);
        }, 10000);
        return;
      }
      this.updateDelegators([]);
    }
  }

  async _initMeetingSettings(extensionId?: string) {
    await Promise.all([
      this._initPersonalMeeting(extensionId),
      this._updateServiceWebSettings(extensionId),
    ]);

    await this._initMeeting(extensionId);
  }

  /**
   * Init basic meeting information
   * also load meeting setting from previous one.
   */
  @background
  async init() {
    await this._init();
  }

  @proxify
  async reload() {
    await this._init();
  }

  @proxify
  async _init() {
    await Promise.all([this._initMeetingSettings(), this.initScheduleFor()]);
  }

  @proxify
  protected async _initMeeting(extensionId?: string) {
    this.update({
      ...this.defaultMeetingSetting,
      host: {
        id: extensionId || this.loginUser.id,
      },
    });

    // @ts-expect-error
    this.updatePreferences(prunePreferencesObject(this.meeting));
  }

  @proxify
  async updatePreferences(preferences: Preferences) {
    this._updatePreferences(preferences);
  }

  @proxify
  async updateIsPreferencesChanged(isPreferencesChanged: boolean) {
    this._updateIsPreferencesChanged(isPreferencesChanged);
  }

  @proxify
  async update(_meeting: RcMMeetingModel) {
    let meeting = _meeting;
    if (this.enableServiceWebSettings) {
      meeting = this.combineWithSettings(_meeting);
    }
    const finalMeeting = {
      ...meeting,
      isMeetingPasswordValid: this.validatePasswordSettings(
        _meeting.password,
        _meeting._requireMeetingPassword,
      ),
    };
    this.updateMeetingState(finalMeeting);
    this._comparePreferences(finalMeeting);
  }

  private _comparePreferences(meeting: RcMMeetingModel) {
    this.updateIsPreferencesChanged(
      // @ts-expect-error
      comparePreferences(this.preferences, meeting),
    );
  }

  validatePasswordSettings(password: string, isSecret: boolean): boolean {
    if (!isSecret) {
      return true;
    }
    if (password && RCM_PASSWORD_REGEX.test(password)) {
      return true;
    }
    return false;
  }

  combineWithSettings(_meeting: RcMMeetingModel) {
    return this._combineWithSWSettings(_meeting);
  }

  _combineWithSWSettings(meeting: RcMMeetingModel): RcMMeetingModel {
    if (!meeting.usePersonalMeetingId) {
      return meeting;
    }

    const processedMeeting = { ...meeting };
    const { allowJoinBeforeHost } = processedMeeting;
    const { requirePasswordForPmiMeetings } = this.scheduleUserSettings;
    const {
      requirePasswordForPmiMeetings: lockedRequirePasswordForPmiMeetings,
    } = this.scheduleLockedSettings;

    if (
      lockedRequirePasswordForPmiMeetings &&
      requirePasswordForPmiMeetings === PMIRequirePassword.JBH_ONLY
    ) {
      if (allowJoinBeforeHost && !processedMeeting._requireMeetingPassword) {
        processedMeeting._requireMeetingPassword = true;
        processedMeeting.password =
          processedMeeting._pmiPassword || generateRandomPassword();
      }
      processedMeeting._lockRequireMeetingPassword = allowJoinBeforeHost;
    }
    return processedMeeting;
  }

  @proxify
  async _initPersonalMeeting(extensionId?: string, count = 0) {
    if (!this.enablePersonalMeeting) {
      return;
    }
    if (this._fetchPersonMeetingTimeout) {
      clearTimeout(this._fetchPersonMeetingTimeout);
    }
    try {
      const meetingInfoResponse = await this.fetchPersonalMeeting(extensionId);
      // @ts-expect-error
      const meeting = this.formatPersonalMeeting(meetingInfoResponse);
      this.updatePersonalMeeting(meeting);
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.error('fetch personal meeting error:', e);
      this.resetPersonalMeeting();
      if (count < 5) {
        console.warn('retry after 10s');
        this._fetchPersonMeetingTimeout = setTimeout(() => {
          this._initPersonalMeeting(extensionId, count + 1);
        }, 10000);
      }
    }
  }

  @proxify
  async _updateServiceWebSettings(extensionId?: string) {
    if (!this.enableServiceWebSettings) {
      return;
    }
    try {
      const [userSettings, lockedSettings] = await Promise.all([
        this.getUserSettings(extensionId),
        this.getLockedSettings(),
      ]);
      this.updateUserSettings(userSettings);
      // @ts-expect-error
      this.updateLockedSettings(lockedSettings);
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.error('error:', e);
    }
  }

  @proxify
  async switchUsePersonalMeetingId(usePersonalMeetingId: boolean) {
    this.update(
      usePersonalMeetingId
        ? this.pmiDefaultSettings
        : this.getGeneralDefaultSettings(),
    );
  }

  @proxify
  async saveAsDefaultSetting(meeting: RcMMeetingModel) {
    const formattedMeeting = this._format(meeting);
    this.updateSavedDefaultMeetingSetting({
      ...formattedMeeting,
      // @ts-expect-error
      _saved: meeting.notShowAgain,
      _requireMeetingPassword: meeting._requireMeetingPassword,
    });
  }

  @proxify
  async scheduleDirectly(
    meeting?: RcMMeetingModel,
    { isAlertSuccess = true }: { isAlertSuccess?: boolean } = {},
  ): Promise<ScheduleMeetingResponse> {
    try {
      // @ts-expect-error
      meeting = meeting || this.meeting;
      this.updateIsScheduling(true);
      // Validate meeting
      // @ts-expect-error
      this._validate(meeting);
      // @ts-expect-error
      const formattedMeeting = this._format(meeting);

      // @ts-expect-error
      if (this.showSaveAsDefault && meeting.saveAsDefault) {
        // @ts-expect-error
        this.saveAsDefaultSetting(meeting);
      }

      const [resp, serviceInfo] = await Promise.all([
        this.postMeeting(formattedMeeting),
        // @ts-expect-error
        this.getMeetingServiceInfo(meeting.host?.id),
      ]);

      const invitationInfo = await this.getMeetingInvitation(
        // @ts-expect-error
        resp.id,
        this.currentLocale,
      );
      this.updateLastMeetingSetting({
        ...formattedMeeting,
        // @ts-expect-error
        _saved: meeting._saved,
      });

      const result = await this._createDialingNumberTpl(
        serviceInfo,
        resp,
        invitationInfo,
      );

      // Reload meeting info
      if (this.enableReloadAfterSchedule) {
        this._initMeeting();
      }

      // Update personal meeting setting
      // @ts-expect-error
      if (this.enablePersonalMeeting && resp.usePersonalMeetingId) {
        this.updatePersonalMeeting(
          this.formatPersonalMeeting(
            // @ts-expect-error
            resp,
            // @ts-expect-error
            serviceInfo.externalUserInfo.personalMeetingId,
          ),
        );
        if (this.enableServiceWebSettings) {
          // @ts-expect-error
          this.update({
            ...this.meeting,
            _pmiPassword: resp.password,
          });
        }
      }

      // Notify user the meeting has been scheduled
      if (isAlertSuccess) {
        setTimeout(() => {
          this._deps.alert.success({
            message: meetingStatus.scheduledSuccess,
          });
        }, 50);
      }
      // @ts-expect-error
      return result;
    } catch (errors) {
      await this._errorHandle(errors);
      // @ts-expect-error
      return null;
    } finally {
      this.updateIsScheduling(false);
    }
  }

  @proxify
  async schedule(
    meeting?: RcMMeetingModel,
    { isAlertSuccess = true }: { isAlertSuccess?: boolean } = {},
  ): Promise<ScheduleMeetingResponse> {
    if (this.isScheduling) return this._createMeetingPromise;

    this._createMeetingPromise = this.scheduleDirectly(meeting, {
      isAlertSuccess,
    });

    const result = await this._createMeetingPromise;
    // @ts-expect-error
    this._createMeetingPromise = null;
    return result;
  }

  @proxify
  async updateMeeting(
    meetingId: string,
    meeting: RcMMeetingModel,
    { isAlertSuccess = false }: { isAlertSuccess?: boolean } = {},
  ) {
    if (this._isUpdating(meetingId)) {
      return (this.updateMeeting as any)._promise;
    }
    meeting = meeting || this.meeting;
    try {
      this.addUpdatingStatus(meetingId);
      // Validate meeting
      this._validate(meeting);
      const formattedMeeting = this._format(meeting);
      if (this.showSaveAsDefault && meeting.saveAsDefault) {
        this.saveAsDefaultSetting(meeting);
      }

      (this.updateMeeting as any)._promise = Promise.all([
        this.putMeeting(meetingId, formattedMeeting),
        // @ts-expect-error
        this.getMeetingServiceInfo(meeting.host?.id),
      ]);

      const [resp, serviceInfo] = await (this.updateMeeting as any)._promise;

      const invitationInfo = await this.getMeetingInvitation(
        meetingId,
        this.currentLocale,
      );

      const result = await this._createDialingNumberTpl(
        serviceInfo,
        resp,
        invitationInfo,
      );

      // Reload meeting info
      if (this.enableReloadAfterSchedule) {
        this._initMeeting();
      }

      // Update personal meeting setting
      if (this.enablePersonalMeeting && resp.usePersonalMeetingId) {
        this.updatePersonalMeeting(
          this.formatPersonalMeeting(
            resp,
            serviceInfo.externalUserInfo.personalMeetingId,
          ),
        );
        if (this.enableServiceWebSettings) {
          // @ts-expect-error
          this.update({
            ...this.meeting,
            _pmiPassword: resp.password,
          });
        }
      }

      // Notify user the meeting has been updated
      if (isAlertSuccess) {
        setTimeout(() => {
          this._deps.alert.success({
            message: meetingStatus.updatedSuccess,
          });
        }, 50);
      }
      return result;
    } catch (errors) {
      await this._errorHandle(errors);
      return null;
    } finally {
      delete (this.updateMeeting as any)._promise;
      this.removeUpdatingStatus(meetingId);
    }
  }

  @proxify
  async deleteMeeting(meetingId: string) {
    try {
      await this._deps.client.account().extension().meeting(meetingId).delete();
      return true;
    } catch (errors) {
      await this._errorHandle(errors);
      return false;
    }
  }

  @proxify
  async updateScheduleFor(
    userExtensionId: string | number = `${this.extensionId}`,
  ) {
    if (!this.delegators || this.delegators.length === 0) {
      return;
    }
    const hostId = `${userExtensionId}`;
    const user = find((item) => item.id === hostId, this.delegators);

    if (user) {
      await this._initMeetingSettings(hostId);
    }
  }

  @proxify
  async getExtensionInfo(extensionId: string = `${this.extensionId}`) {
    if (Number(extensionId) === this.extensionId) {
      return this._deps.extensionInfo.info;
    }
    return this._deps.client.account().extension(extensionId).get();
  }

  @proxify
  async updateDelegators(delegators: MeetingDelegator[]) {
    this._updateDelegators(delegators);
  }

  @proxify
  async updateUserSettings(userSettings: UserSettings) {
    this._updateUserSettings(userSettings);
  }

  @proxify
  async updateLockedSettings(lockedSettings: LockedSettings) {
    this._updateLockedSettings(lockedSettings);
  }

  @proxify
  async updatePersonalMeeting(meeting: RcMMeetingModel) {
    this._updatePersonalMeeting(meeting);
  }

  @proxify
  async resetPersonalMeeting() {
    // @ts-expect-error
    this._updatePersonalMeeting(null);
  }

  @proxify
  async updateMeetingState(meeting: RcMMeetingModel) {
    this._updateMeetingState(meeting);
  }

  @proxify
  async addUpdatingStatus(meetingId: string) {
    this._updateUpdatingStatus([...this.updatingStatus, { meetingId }]);
  }

  @proxify
  async removeUpdatingStatus(meetingId: string) {
    const finalStatus = filter(
      (obj) => obj.meetingId !== meetingId,
      this.updatingStatus,
    );
    this._updateUpdatingStatus(finalStatus);
  }

  @proxify
  async updateLastMeetingSetting(meeting: RcMMeetingModel) {
    const lastMeetingSetting = pick(LAST_MEETING_SETTINGS, meeting || {});
    this._updateLastMeetingSetting(lastMeetingSetting);
  }

  @proxify
  async updateSavedDefaultMeetingSetting(meeting: RcMMeetingModel) {
    const savedDefaulteSetting = pick(
      SAVED_DEFAULT_MEETING_SETTINGS,
      meeting || {},
    );
    this._updateSavedDefaultMeetingSetting(savedDefaulteSetting);
  }

  @proxify
  async updateIsScheduling(isScheduling: boolean) {
    this._updateIsScheduling(isScheduling);
  }

  @proxify
  private async fetchPersonalMeeting(extensionId?: string) {
    const serviceInfo = await this.getMeetingServiceInfo(extensionId);
    // @ts-expect-error
    const personalMeetingId = serviceInfo.externalUserInfo.personalMeetingId;
    const meetingInfoResponse = await this.getMeeting(personalMeetingId);
    if (!meetingInfoResponse) {
      throw new Error(
        `failed to get personal meeting ${personalMeetingId} info`,
      );
    }
    return meetingInfoResponse;
  }

  @proxify
  async getMeetingServiceInfo(extensionId?: string) {
    return this._deps.client
      .account()
      .extension(extensionId)
      .meeting()
      .serviceInfo()
      .get();
  }

  @proxify
  async postMeeting(formattedMeeting: RcMMeetingModel) {
    return (
      this._deps.client
        .account()
        .extension()
        .meeting()
        // @ts-expect-error
        .post(formattedMeeting)
    );
  }

  @proxify
  async putMeeting(meetingId: string, formattedMeeting: RcMMeetingModel) {
    return (
      this._deps.client
        .account()
        .extension()
        .meeting(meetingId)
        // @ts-expect-error
        .put(formattedMeeting)
    );
  }

  @proxify
  async getMeeting(meetingId: string, { isAlertError = true } = {}) {
    try {
      const settings = await this._deps.client
        .account()
        .extension()
        .meeting(meetingId)
        .get();
      return {
        ...settings,
        // TODO: can we remove this?
        _requireMeetingPassword: !!settings.password,
      };
    } catch (e: any /** TODO: confirm with instanceof */) {
      const { errorCode, message } = await e.response.clone().json();
      console.log(
        `failed to get meeting info: ${meetingId}, ${errorCode}, ${message}`,
      );
      const isMeetingDeleted =
        errorCode === 'CMN-102' &&
        message.indexOf('[meetingId] is not found') > -1;
      if (isAlertError && isMeetingDeleted) {
        setTimeout(() => {
          this._deps.alert.danger({
            message: meetingStatus.meetingIsDeleted,
          });
        }, 50);
      }
      throw e;
    }
  }

  @proxify
  async getDelegators(): Promise<MeetingDelegatorsResponse> {
    const res = await this._deps.client.service
      .platform()
      .get(
        '/restapi/v1.0/account/~/extension/~/meetings-configuration/assisted',
      );
    return res.json();
  }

  @proxify
  async getUserSettings(extensionId = '~'): Promise<UserSettings> {
    try {
      const platform = this._deps.client.service.platform();
      const apiResponse = await platform.send({
        method: 'GET',
        url: `/restapi/v1.0/account/~/extension/${extensionId}/meeting/user-settings`,
      });
      return apiResponse.json();
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.warn('failed to get user setting', e);
      // @ts-expect-error
      return null;
    }
  }

  @proxify
  async getLockedSettings() {
    try {
      const platform = this._deps.client.service.platform();
      const apiResponse = await platform.send({
        method: 'GET',
        url: '/restapi/v1.0/account/~/meeting/locked-settings',
      });
      const { recording = {}, scheduleMeeting = {} } = await apiResponse.json();
      const {
        startParticipantsVideo,
        startParticipantVideo,
        ...restScheduleOptions
      } = scheduleMeeting;
      const processedScheduleMeeting = {
        ...restScheduleOptions,
        // TODO: update this when api is stable
        startParticipantsVideo:
          startParticipantsVideo || startParticipantVideo || false,
      };
      return {
        recording,
        scheduleMeeting: processedScheduleMeeting,
      };
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.warn('failed to get lock settings', e);
      return null;
    }
  }

  @proxify
  async getMeetingInvitation(
    meetingId: string,
    locale = DEFAULT_LOCALE,
  ): Promise<RcmInvitationInfo> {
    try {
      const apiResponse = await this._deps.client.service
        .platform()
        .get(
          `/restapi/v1.0/account/~/extension/~/meeting/${meetingId}/invitation`,
          {
            language: this._deps.locale.normalizeLocale(locale),
          },
        );
      const { invitation } = await apiResponse.json();
      return {
        invitation,
      };
    } catch (ex) {
      console.warn('failed to get invitation', ex);
      if (this.enableInvitationApiFailedToast) {
        this._deps.alert.danger({
          message: meetingStatus.renderInviteError,
        });
      }
      // @ts-expect-error
      return null;
    }
  }

  protected formatPersonalMeeting(
    meetingInfo: MeetingInfoResponse,
    shortId?: string, // TODO: do we need this param `shortId`?
  ): RcMMeetingModel {
    const settings = {
      ...this.initialMeetingSetting,
      ...meetingInfo,
      shortId: shortId || meetingInfo.id,
      usePersonalMeetingId: true,
    };
    return {
      ...settings,
      _requireMeetingPassword: !!settings.password,
    };
  }

  /**
   * Validate meeting information format.
   * @param {Object} meeting
   * @throws
   */
  _validate(meeting: RcMMeetingModel) {
    if (!meeting) {
      throw new MeetingErrors(meetingStatus.invalidMeetingInfo);
    }
    const { topic, password, schedule, _requireMeetingPassword } = meeting;
    const errors = new MeetingErrors();
    if (topic.length <= 0) {
      errors.push(meetingStatus.emptyTopic);
    }
    if (_requireMeetingPassword && (!password || password.length <= 0)) {
      errors.push(meetingStatus.noPassword);
    }
    if (schedule) {
      // @ts-expect-error
      if (schedule.durationInMinutes < 0) {
        errors.push(meetingStatus.durationIncorrect);
      }
    }
    if (errors.length > 0) {
      throw errors;
    }
  }

  /**
   * Format meeting information.
   * @param {Object} meeting
   */
  _format(meeting: RcMMeetingModel): RcMMeetingModel {
    const {
      topic,
      meetingType,
      allowJoinBeforeHost,
      startHostVideo,
      startParticipantsVideo,
      audioOptions,
      password,
      schedule,
      recurrence,
      usePersonalMeetingId,
      _requireMeetingPassword,
      host,
    } = meeting;
    const formatted = {
      host,
      topic,
      meetingType,
      allowJoinBeforeHost,
      startHostVideo,
      startParticipantsVideo,
      audioOptions,
      password: _requireMeetingPassword ? password : '',
      recurrence,
      usePersonalMeetingId,
    } as RcMMeetingModel;
    // Recurring meetings do not have schedule info
    if (meetingType !== MeetingType.RECURRING) {
      const _schedule: MeetingScheduleResource = {
        // @ts-expect-error
        durationInMinutes: schedule.durationInMinutes,
        timeZone: {
          id: this.enableCustomTimezone
            ? // @ts-expect-error
              schedule.timeZone.id
            : UTC_TIMEZONE_ID,
        },
      };
      // @ts-expect-error
      if (schedule.startTime) {
        // Format selected startTime to utc standard time
        // Timezone information is not included here
        _schedule.startTime = this.enableCustomTimezone
          ? // @ts-expect-error
            schedule.startTime
          : // @ts-expect-error
            moment.utc(schedule.startTime).format();
      }
      formatted.schedule = _schedule;

      if (recurrence && recurrence.until) {
        // @ts-expect-error
        formatted.recurrence.until = moment.utc(recurrence.until).format();
      }
    }

    // For PMI
    formatted.meetingType =
      formatted.meetingType === MeetingType.PMI
        ? MeetingType.SCHEDULED
        : formatted.meetingType;
    return formatted;
  }

  async _createDialingNumberTpl(
    serviceInfo: MeetingServiceInfoResource,
    resp: any,
    invitationInfo: RcmInvitationInfo,
  ) {
    const extensionInfo = await this.getExtensionInfo(resp?.host?.id);
    const result = {
      meeting: resp,
      serviceInfo: {
        ...serviceInfo,
        mobileDialingNumberTpl: getMobileDialingNumberTpl(
          // @ts-expect-error
          serviceInfo.dialInNumbers,
          resp.id,
        ),
        phoneDialingNumberTpl: getPhoneDialingNumberTpl(
          // @ts-expect-error
          serviceInfo.dialInNumbers,
        ),
      },
      extensionInfo,
      invitationInfo,
    };
    return result;
  }

  async _errorHandle(errors: any) {
    if (errors instanceof MeetingErrors) {
      for (const error of errors.all) {
        this._deps.alert.warning(error);
      }
    } else if (errors && errors.response) {
      const { message, errorCode, permissionName } = await errors.response
        .clone()
        .json();
      if (errorCode === 'InsufficientPermissions' && permissionName) {
        this._deps.alert.danger({
          message: meetingStatus.insufficientPermissions,
          payload: {
            permissionName,
          },
        });
      } else if (
        errorCode === 'CMN-102' &&
        message.indexOf('[meetingId] is not found') > -1
      ) {
        this._deps.alert.danger({
          message: meetingStatus.meetingIsDeleted,
        });
      } else if (
        !this._deps.availabilityMonitor ||
        !(await this._deps.availabilityMonitor.checkIfHAError(errors))
      ) {
        this._deps.alert.danger({ message: meetingStatus.internalError });
      }
    } else {
      console.log('errors:', errors);
      this._deps.alert.danger({ message: meetingStatus.internalError });
    }
  }

  enforcePmiPassword(
    processedMeeting: RcMMeetingModel,
    requirePwdForPMI: RequirePwdTypeForPMI,
    requirePwdIsLockedForPMI: boolean,
  ) {
    const { allowJoinBeforeHost, password = '' } = processedMeeting;
    if (password !== '') {
      // save this for design
      processedMeeting._pmiPassword = password;
    }

    let pmiRequiresPwd;
    switch (requirePwdForPMI) {
      case PMIRequirePassword.NONE:
        pmiRequiresPwd = password !== '';
        break;
      case PMIRequirePassword.ALL:
        pmiRequiresPwd = true;
        break;
      case PMIRequirePassword.JBH_ONLY:
        pmiRequiresPwd = allowJoinBeforeHost || password !== '';
        break;
      default:
        pmiRequiresPwd = processedMeeting._requireMeetingPassword;
    }

    const pmiRequiresPwdLocked =
      requirePwdForPMI === PMIRequirePassword.JBH_ONLY
        ? requirePwdIsLockedForPMI && allowJoinBeforeHost
        : requirePwdIsLockedForPMI;

    processedMeeting._requireMeetingPassword = pmiRequiresPwd;
    processedMeeting._lockRequireMeetingPassword = pmiRequiresPwdLocked;
  }

  enforcePassword(
    meeting: RcMMeetingModel,
    { userSettings, personalMeetingSettings }: MeetingInitialExtraData,
    usePmi: boolean,
  ): RcMMeetingModel {
    if (!this.enableServiceWebSettings) {
      return meeting;
    }
    const {
      requirePasswordForSchedulingNewMeetings: requirePwdForNonPMI = false,
      requirePasswordForPmiMeetings: requirePwdForPMI,
    } = this.scheduleUserSettings;
    const {
      requirePasswordForSchedulingNewMeetings: requirePwdIsLockedForNonPMI,
      requirePasswordForPmiMeetings: requirePwdIsLockedForPMI,
    } = this.scheduleLockedSettings;

    const processedMeeting = {
      ...meeting,
      ...(usePmi ? personalMeetingSettings : userSettings),
      usePersonalMeetingId: usePmi,
      telephonyUserSettings: this.telephonyUserSettings,
    } as RcMMeetingModel;

    // For PMI meetings
    if (usePmi) {
      this.enforcePmiPassword(
        processedMeeting,
        // @ts-expect-error
        requirePwdForPMI,
        requirePwdIsLockedForPMI,
      );
    } else {
      // For non-PMI meetings
      if (requirePwdForNonPMI) {
        processedMeeting._requireMeetingPassword = true;
      }
      if (requirePwdIsLockedForNonPMI) {
        processedMeeting._lockRequireMeetingPassword = true;
      }
    }
    return {
      ...processedMeeting,
      password:
        processedMeeting._requireMeetingPassword && !processedMeeting.password
          ? generateRandomPassword()
          : processedMeeting.password,
    } as RcMMeetingModel;
  }

  // use to check meeting is in updating status or not
  _isUpdating(meetingId: string) {
    return (
      this.updatingStatus &&
      find((obj: any) => obj.meetingId === meetingId, this.updatingStatus)
    );
  }

  get extensionId(): number {
    // @ts-expect-error
    return this._deps.extensionInfo.info.id;
  }

  get enableDiscoveryApi() {
    return !!this._deps.client.service.platform().discovery();
  }

  // @ts-expect-error
  rcvBaseWebUri: string = null;

  async fetchDiscoveryConfig() {
    const data = await this._deps.client.service
      .platform()
      .discovery()
      ?.externalData();
    if (data) {
      this.rcvBaseWebUri = data.rcv.baseWebUri;
    } else {
      // handle discovery api  error in sdk
    }
  }

  override onReset() {
    // @ts-expect-error
    this.rcvBaseWebUri = null;
  }

  async getMeetingUriRegExp() {
    if (this.enableDiscoveryApi && !this.rcvBaseWebUri) {
      await this.fetchDiscoveryConfig();
    }
    return {
      rcvUriRegExp: this.rcvUriRegExp,
      rcmUriRegExp: this.rcmUriRegExp,
    };
  }

  @computed((that: Meeting) => [that._deps.brand.brandConfig.meetingUriReg.rcm])
  get rcmUriRegExp() {
    return getRcmUriRegExp(this._deps.brand.brandConfig.meetingUriReg.rcm);
  }

  @computed((that: Meeting) => [
    that._deps.brand.brandConfig.meetingUriReg.rcv,
    that.rcvBaseWebUri,
  ])
  get rcvUriRegExp() {
    const regExpText =
      this.enableDiscoveryApi && this.rcvBaseWebUri
        ? `(${this.rcvBaseWebUri
            ?.replace(/^https?:\/\//, '')
            .replace(/\./g, '\\.')}|${
            this._deps.brand.brandConfig.meetingUriReg.rcv
          })`
        : this._deps.brand.brandConfig.meetingUriReg.rcv;
    return getRcvUriRegExp(regExpText);
  }
}
