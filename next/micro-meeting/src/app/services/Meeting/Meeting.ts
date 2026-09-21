import type MeetingServiceInfoResource from '@rc-ex/core/lib/definitions/MeetingServiceInfoResource';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
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
} from '@ringcentral-integration/commons/helpers/meetingHelper';
import { renameTurkey } from '@ringcentral-integration/commons/helpers/renameTurkey';
import type { IMeeting } from '@ringcentral-integration/commons/interfaces/Meeting.interface';
import { DEFAULT_LOCALE } from '@ringcentral-integration/i18n';
import {
  Analytics,
  AvailabilityMonitor,
  Client,
  ExtensionInfo,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Brand,
  Locale,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  computed,
  delegate,
  injectable,
  optional,
  RcModule,
  state,
  storage,
  StoragePlugin,
} from '@ringcentral-integration/next-core';
import type { ApiError } from '@ringcentral/sdk';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { filter, find, isEmpty, pick } from 'ramda';

import { VideoConfiguration } from '../VideoConfiguration';

import type {
  CommonPersonalMeetingSettings,
  DefaultScheduleLockedSettings,
  EffectiveScheduleUserSettings,
  LastMeetingSetting,
  LockedSettings,
  MeetingDelegator,
  MeetingDelegatorsResponse,
  MeetingInfoResponse,
  MeetingInitialExtraData,
  MeetingOptions,
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
import { t } from './i18n';
import { MeetingErrors } from './meetingErrors';
import {
  createMeetingOperationError,
  getMeetingOperationLocale,
  meetingOperationErrorHandling,
  meetingOperationMessageKey,
  meetingOperationMessageSource,
  meetingOperationErrorReason,
  resolveMeetingOperationNotification,
} from './meetingOperationResult';
import type {
  MeetingDeleteOptions,
  MeetingDeleteReturn,
  MeetingLookupOptions,
  MeetingLookupReturn,
  MeetingOperationErrorResult,
  MeetingOperationOptions,
  MeetingOperationReturn,
} from './meetingOperationResult';

dayjs.extend(utc);

@injectable({
  name: 'Meeting',
})
export class Meeting extends RcModule implements IMeeting {
  protected _fetchDelegatorsTimeout: NodeJS.Timeout | null = null;
  private _fetchPersonMeetingTimeout: NodeJS.Timeout | null = null;
  private _createMeetingPromise?: Promise<
    ScheduleMeetingResponse | MeetingOperationErrorResult | null
  > | null;

  constructor(
    protected _brand: Brand,
    protected _toast: Toast,
    protected _client: Client,
    protected _extensionInfo: ExtensionInfo,
    protected _storage: StoragePlugin,
    protected _videoConfiguration: VideoConfiguration,
    protected _locale: Locale,
    @optional()
    protected _availabilityMonitor?: AvailabilityMonitor,
    @optional() protected _analytics?: Analytics,
    @optional('MeetingOptions') protected _meetingOptions?: MeetingOptions,
  ) {
    super();
    this._storage.enable(this);
  }

  @state
  meeting: RcMMeetingModel | null = null;

  @state
  isScheduling = false;

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
  isPreferencesChanged = false;

  get extensionName() {
    return this._extensionInfo.info?.name;
  }

  @computed(({ extensionName, currentLocale }: Meeting) => [
    extensionName,
    currentLocale,
  ])
  get defaultTopic(): string {
    return getDefaultTopic(this.extensionName!, this.currentLocale);
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
  get usePmiDefaultFromSW() {
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

  @computed((that: Meeting) => [that._locale.currentLocale])
  get currentLocale() {
    return this._locale.currentLocale || DEFAULT_LOCALE;
  }

  get pmiDefaultSettings(): RcMMeetingModel {
    if (!this.enableServiceWebSettings) {
      return this.personalMeeting!;
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
      enableScheduleOnBehalf: this.enableScheduleOnBehalf!,
      meeting: this.meeting!,
      delegators: this.delegators,
    });
    const startTime = getInitializedStartTime();
    const hostId = getHostId({
      enableScheduleOnBehalf: this.enableScheduleOnBehalf!,
      meeting: this.meeting!,
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

  get initialMeetingSetting() {
    return this.getInitialMeetingSetting() as RcMMeetingModel;
  }

  get extensionInfo() {
    return this._extensionInfo;
  }

  get showSaveAsDefault() {
    return this._meetingOptions?.showSaveAsDefault ?? false;
  }

  get enablePersonalMeeting() {
    return this._meetingOptions?.enablePersonalMeeting ?? false;
  }

  get enableReloadAfterSchedule() {
    return this._meetingOptions?.enableReloadAfterSchedule ?? true;
  }

  get enableServiceWebSettings() {
    return this._meetingOptions?.enableServiceWebSettings ?? false;
  }

  get enableInvitationApiFailedToast() {
    return this._meetingOptions?.enableInvitationApiFailedToast ?? false;
  }

  // will follow dynamic brand config
  get enableScheduleOnBehalf() {
    return (this._brand.brandConfig?.enableRcmScheduleOnBehalf ??
      this._meetingOptions?.enableScheduleOnBehalf)!;
  }

  get enableCustomTimezone() {
    return this._meetingOptions?.enableCustomTimezone ?? false;
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
  protected _updatePersonalMeeting(personalMeeting: RcMMeetingModel | null) {
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

  @track((that: Meeting, isScheduling: boolean) => {
    if (!isScheduling) return;
    const target = that._analytics?.getTrackTarget();
    if (target) {
      return [
        trackEvents.clickMeetingSchedulePage,
        { router: target.router, 'Meeting Type': 'RCM' },
      ];
    }
  })
  @action
  protected _updateIsScheduling(isScheduling: boolean) {
    this.isScheduling = isScheduling;
  }

  protected override async onInit() {
    await this._init();
  }

  override _shouldInit() {
    return super._shouldInit() && this._videoConfiguration.isRCM;
  }

  override _shouldReset() {
    return (
      super._shouldReset() || (this.ready && !this._videoConfiguration.isRCM)
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
    } catch (e) {
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
  // @background
  async init() {
    await this._init();
  }

  @delegate('server')
  async reload() {
    await this._init();
  }

  @delegate('server')
  async _init() {
    await Promise.all([this._initMeetingSettings(), this.initScheduleFor()]);
  }

  @delegate('server')
  protected async _initMeeting(extensionId?: string) {
    this.update({
      ...this.defaultMeetingSetting,
      host: {
        id: extensionId || this.loginUser.id,
      },
    });

    this.updatePreferences(prunePreferencesObject(this.meeting!));
  }

  @delegate('server')
  async updatePreferences(preferences: Preferences) {
    this._updatePreferences(preferences);
  }

  @delegate('server')
  async updateIsPreferencesChanged(isPreferencesChanged: boolean) {
    this._updateIsPreferencesChanged(isPreferencesChanged);
  }

  @delegate('server')
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
      comparePreferences(this.preferences as RcMMeetingModel, meeting),
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

  @delegate('server')
  async _initPersonalMeeting(extensionId?: string, count = 0) {
    if (!this.enablePersonalMeeting) {
      return;
    }
    if (this._fetchPersonMeetingTimeout) {
      clearTimeout(this._fetchPersonMeetingTimeout);
    }
    try {
      const meetingInfoResponse = await this.fetchPersonalMeeting(extensionId);
      const meeting = this.formatPersonalMeeting(
        // TODO: fix type
        meetingInfoResponse as any as MeetingInfoResponse,
      );
      this.updatePersonalMeeting(meeting);
    } catch (e) {
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

  @delegate('server')
  async _updateServiceWebSettings(extensionId?: string) {
    if (!this.enableServiceWebSettings) {
      return;
    }
    try {
      const [userSettings, lockedSettings] = await Promise.all([
        this.getUserSettings(extensionId),
        this.getLockedSettings(),
      ]);
      this.updateUserSettings(userSettings!);
      this.updateLockedSettings(lockedSettings as LockedSettings);
    } catch (e) {
      console.error('error:', e);
    }
  }

  @delegate('server')
  async switchUsePersonalMeetingId(usePersonalMeetingId: boolean) {
    this.update(
      usePersonalMeetingId
        ? this.pmiDefaultSettings
        : this.getGeneralDefaultSettings(),
    );
  }

  @delegate('server')
  async saveAsDefaultSetting(meeting: RcMMeetingModel) {
    const formattedMeeting = this._format(meeting);
    this.updateSavedDefaultMeetingSetting({
      ...formattedMeeting,
      // TODO: fix type
      // @ts-ignore
      _saved: meeting.notShowAgain,
      _requireMeetingPassword: meeting._requireMeetingPassword,
    });
  }

  @delegate('server')
  async scheduleDirectly<
    TOptions extends MeetingOperationOptions = MeetingOperationOptions,
  >(
    meeting?: RcMMeetingModel,
    options?: TOptions,
  ): Promise<MeetingOperationReturn<TOptions, ScheduleMeetingResponse>> {
    const {
      errorHandling = meetingOperationErrorHandling.toast,
      isAlertSuccess = true,
    } = options ?? {};
    const operationLocale = getMeetingOperationLocale(
      options,
      this.currentLocale,
    );

    try {
      meeting = meeting || this.meeting!;
      const result = await this._scheduleDirectly(meeting, operationLocale);

      // Notify user the meeting has been scheduled
      if (isAlertSuccess) {
        setTimeout(() => {
          this._toast.success({
            message: t('scheduledSuccess'),
          });
        }, 50);
      }
      return result as MeetingOperationReturn<
        TOptions,
        ScheduleMeetingResponse
      >;
    } catch (errors) {
      const operationError = await this._createOperationError(errors);
      if (errorHandling === meetingOperationErrorHandling.result) {
        return operationError as MeetingOperationReturn<
          TOptions,
          ScheduleMeetingResponse
        >;
      }

      this._showOperationError(operationError);
      return null as MeetingOperationReturn<TOptions, ScheduleMeetingResponse>;
    } finally {
      this.updateIsScheduling(false);
    }
  }

  private async _scheduleDirectly(
    meeting: RcMMeetingModel,
    invitationLocale = this.currentLocale,
  ) {
    this.updateIsScheduling(true);
    // Validate meeting
    this._validate(meeting);
    const formattedMeeting = this._format(meeting);

    if (this.showSaveAsDefault && meeting.saveAsDefault) {
      this.saveAsDefaultSetting(meeting);
    }

    const [resp, serviceInfo] = await Promise.all([
      this.postMeeting(formattedMeeting),
      this.getMeetingServiceInfo(meeting.host?.id),
    ]);

    const invitationInfo = await this.getMeetingInvitation(
      resp.id!,
      invitationLocale,
    );
    this.updateLastMeetingSetting({
      ...formattedMeeting,
      _saved: meeting._saved,
    });

    const result = await this._createDialingNumberTpl(
      serviceInfo,
      resp,
      invitationInfo!,
    );

    // Reload meeting info
    if (this.enableReloadAfterSchedule) {
      this._initMeeting();
    }

    // Update personal meeting setting
    // TODO: fix type
    // @ts-ignore
    if (this.enablePersonalMeeting && resp.usePersonalMeetingId) {
      this.updatePersonalMeeting(
        this.formatPersonalMeeting(
          // TODO: fix type
          // @ts-ignore
          resp,
          // TODO: fix type
          // @ts-ignore
          serviceInfo.externalUserInfo!.personalMeetingId,
        ),
      );
      if (this.enableServiceWebSettings) {
        // TODO: fix type
        // @ts-ignore
        this.update({
          ...this.meeting,
          _pmiPassword: resp.password,
        });
      }
    }
    return result;
  }

  @delegate('server')
  async schedule<
    TOptions extends MeetingOperationOptions = MeetingOperationOptions,
  >(
    meeting?: RcMMeetingModel,
    options?: TOptions,
  ): Promise<
    MeetingOperationReturn<TOptions, ScheduleMeetingResponse> | undefined
  > {
    if (this.isScheduling) {
      return this._createMeetingPromise as Promise<
        MeetingOperationReturn<TOptions, ScheduleMeetingResponse>
      >;
    }

    this._createMeetingPromise = this.scheduleDirectly(meeting, options);

    const result = await this._createMeetingPromise;
    this._createMeetingPromise = null;
    return result as MeetingOperationReturn<TOptions, ScheduleMeetingResponse>;
  }

  @delegate('server')
  async updateMeeting<
    TOptions extends MeetingOperationOptions = MeetingOperationOptions,
  >(
    meetingId: string,
    meeting: RcMMeetingModel,
    options?: TOptions,
  ): Promise<MeetingOperationReturn<TOptions, ScheduleMeetingResponse>> {
    const {
      errorHandling = meetingOperationErrorHandling.toast,
      isAlertSuccess = false,
    } = options ?? {};
    const operationLocale = getMeetingOperationLocale(
      options,
      this.currentLocale,
    );

    try {
      if (this._isUpdating(meetingId)) {
        return (this.updateMeeting as any)._promise as MeetingOperationReturn<
          TOptions,
          ScheduleMeetingResponse
        >;
      }
      meeting = meeting || this.meeting;

      const result = await this._updateMeeting(
        meetingId,
        meeting,
        operationLocale,
      );

      // Notify user the meeting has been updated
      if (isAlertSuccess) {
        setTimeout(() => {
          this._toast.success({
            message: t('updatedSuccess'),
          });
        }, 50);
      }
      return result as MeetingOperationReturn<
        TOptions,
        ScheduleMeetingResponse
      >;
    } catch (errors) {
      const operationError = await this._createOperationError(errors);
      if (errorHandling === meetingOperationErrorHandling.result) {
        return operationError as MeetingOperationReturn<
          TOptions,
          ScheduleMeetingResponse
        >;
      }

      this._showOperationError(operationError);
      return null as MeetingOperationReturn<TOptions, ScheduleMeetingResponse>;
    } finally {
      delete (this.updateMeeting as any)._promise;
      this.removeUpdatingStatus(meetingId);
    }
  }

  private async _updateMeeting(
    meetingId: string,
    meeting: RcMMeetingModel,
    invitationLocale = this.currentLocale,
  ) {
    this.addUpdatingStatus(meetingId);
    // Validate meeting
    this._validate(meeting);
    const formattedMeeting = this._format(meeting);
    if (this.showSaveAsDefault && meeting.saveAsDefault) {
      this.saveAsDefaultSetting(meeting);
    }

    (this.updateMeeting as any)._promise = Promise.all([
      this.putMeeting(meetingId, formattedMeeting),
      this.getMeetingServiceInfo(meeting.host?.id),
    ]);

    const [resp, serviceInfo] = await (this.updateMeeting as any)._promise;

    const invitationInfo = await this.getMeetingInvitation(
      meetingId,
      invitationLocale,
    );

    const result = await this._createDialingNumberTpl(
      serviceInfo,
      resp,
      invitationInfo!,
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
        // TODO: fix type
        // @ts-ignore
        this.update({
          ...this.meeting,
          _pmiPassword: resp.password,
        });
      }
    }
    return result;
  }

  @delegate('server')
  async deleteMeeting<
    TOptions extends MeetingDeleteOptions = MeetingDeleteOptions,
  >(
    meetingId: string,
    options?: TOptions,
  ): Promise<MeetingDeleteReturn<TOptions>> {
    const { errorHandling = meetingOperationErrorHandling.toast } =
      options ?? {};

    try {
      await this._client.account().extension().meeting(meetingId).delete();
      return true as MeetingDeleteReturn<TOptions>;
    } catch (errors) {
      const operationError = await this._createOperationError(errors);
      if (errorHandling === meetingOperationErrorHandling.result) {
        return operationError as MeetingDeleteReturn<TOptions>;
      }

      this._showOperationError(operationError);
      return false as MeetingDeleteReturn<TOptions>;
    }
  }

  @delegate('server')
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

  @delegate('server')
  async getExtensionInfo(extensionId = `${this.extensionId}`) {
    if (Number(extensionId) === this.extensionId) {
      return this._extensionInfo.info;
    }
    return this._client.account().extension(extensionId).get();
  }

  @delegate('server')
  async updateDelegators(delegators: MeetingDelegator[]) {
    this._updateDelegators(delegators);
  }

  @delegate('server')
  async updateUserSettings(userSettings: UserSettings) {
    this._updateUserSettings(userSettings);
  }

  @delegate('server')
  async updateLockedSettings(lockedSettings: LockedSettings) {
    this._updateLockedSettings(lockedSettings);
  }

  @delegate('server')
  async updatePersonalMeeting(meeting: RcMMeetingModel) {
    this._updatePersonalMeeting(meeting);
  }

  @delegate('server')
  async resetPersonalMeeting() {
    this._updatePersonalMeeting(null);
  }

  @delegate('server')
  async updateMeetingState(meeting: RcMMeetingModel) {
    this._updateMeetingState(meeting);
  }

  @delegate('server')
  async addUpdatingStatus(meetingId: string) {
    this._updateUpdatingStatus([...this.updatingStatus, { meetingId }]);
  }

  @delegate('server')
  async removeUpdatingStatus(meetingId: string) {
    const finalStatus = filter(
      (obj) => obj.meetingId !== meetingId,
      this.updatingStatus,
    );
    this._updateUpdatingStatus(finalStatus);
  }

  @delegate('server')
  async updateLastMeetingSetting(meeting: RcMMeetingModel) {
    const lastMeetingSetting = pick(LAST_MEETING_SETTINGS, meeting || {});
    this._updateLastMeetingSetting(lastMeetingSetting);
  }

  @delegate('server')
  async updateSavedDefaultMeetingSetting(meeting: RcMMeetingModel) {
    const savedDefaulteSetting = pick(
      SAVED_DEFAULT_MEETING_SETTINGS,
      meeting || {},
    );
    this._updateSavedDefaultMeetingSetting(savedDefaulteSetting);
  }

  @delegate('server')
  async updateIsScheduling(isScheduling: boolean) {
    this._updateIsScheduling(isScheduling);
  }

  @delegate('server')
  private async fetchPersonalMeeting(extensionId?: string) {
    const serviceInfo = await this.getMeetingServiceInfo(extensionId);
    // TODO: fix type
    // @ts-ignore
    const personalMeetingId = serviceInfo.externalUserInfo!.personalMeetingId;
    const meetingInfoResponse = await this.getMeeting(personalMeetingId);
    if (!meetingInfoResponse) {
      throw new Error(
        `failed to get personal meeting ${personalMeetingId} info`,
      );
    }
    return meetingInfoResponse;
  }

  @delegate('server')
  async getMeetingServiceInfo(extensionId?: string) {
    return this._client
      .account()
      .extension(extensionId)
      .meeting()
      .serviceInfo()
      .get();
  }

  @delegate('server')
  async postMeeting(formattedMeeting: RcMMeetingModel) {
    // TODO: fix type
    return this._client
      .account()
      .extension()
      .meeting()
      .post(formattedMeeting as any);
  }

  @delegate('server')
  async putMeeting(meetingId: string, formattedMeeting: RcMMeetingModel) {
    // TODO: fix type
    return this._client
      .account()
      .extension()
      .meeting(meetingId)
      .put(formattedMeeting as any);
  }

  @delegate('server')
  async getMeeting<
    TOptions extends MeetingLookupOptions = MeetingLookupOptions,
  >(
    meetingId: string,
    options?: TOptions,
  ): Promise<MeetingLookupReturn<TOptions, MeetingInfoResponse>> {
    const {
      errorHandling = meetingOperationErrorHandling.toast,
      isAlertError = true,
    } = options ?? {};

    try {
      const settings = await this._client
        .account()
        .extension()
        .meeting(meetingId)
        .get();
      return {
        ...settings,
        // TODO: can we remove this?
        _requireMeetingPassword: !!settings.password,
      } as unknown as MeetingLookupReturn<TOptions, MeetingInfoResponse>;
    } catch (e: any) {
      const responseBody = await this._getErrorResponse(e as ApiError);
      const { errorCode, message = '' } = responseBody;
      console.log(
        `failed to get meeting info: ${meetingId}, ${errorCode}, ${message}`,
      );
      const isMeetingDeleted =
        errorCode === 'CMN-102' &&
        message.indexOf('[meetingId] is not found') > -1;

      if (errorHandling === meetingOperationErrorHandling.result) {
        return (await this._createOperationError(
          e,
          responseBody,
        )) as MeetingLookupReturn<TOptions, MeetingInfoResponse>;
      }

      if (isAlertError && isMeetingDeleted) {
        setTimeout(() => {
          this._toast.danger({
            message: t('meetingIsDeleted'),
          });
        }, 50);
      }
      throw e;
    }
  }

  @delegate('server')
  async getDelegators(): Promise<MeetingDelegatorsResponse> {
    const res = await this._client.service
      .platform()
      .get(
        '/restapi/v1.0/account/~/extension/~/meetings-configuration/assisted',
      );
    return res.json();
  }

  @delegate('server')
  async getUserSettings(extensionId = '~'): Promise<UserSettings | null> {
    try {
      const platform = this._client.service.platform();
      const apiResponse = await platform.send({
        method: 'GET',
        url: `/restapi/v1.0/account/~/extension/${extensionId}/meeting/user-settings`,
      });
      return apiResponse.json();
    } catch (e) {
      console.warn('failed to get user setting', e);
      return null;
    }
  }

  @delegate('server')
  async getLockedSettings() {
    try {
      const platform = this._client.service.platform();
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
    } catch (e) {
      console.warn('failed to get lock settings', e);
      return null;
    }
  }

  @delegate('server')
  async getMeetingInvitation(
    meetingId: string,
    locale = DEFAULT_LOCALE,
  ): Promise<RcmInvitationInfo | null> {
    try {
      const apiResponse = await this._client.service
        .platform()
        .get(
          `/restapi/v1.0/account/~/extension/~/meeting/${meetingId}/invitation`,
          {
            language: this._locale.normalizeLocale(locale),
          },
        );
      const { invitation } = await apiResponse.json();
      return {
        invitation: renameTurkey(invitation),
      };
    } catch (ex) {
      console.warn('failed to get invitation', ex);
      if (this.enableInvitationApiFailedToast) {
        this._toast.danger({
          message: t('renderInviteError'),
        });
      }
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
      const errors = new MeetingErrors();
      errors.pushLocalized(meetingOperationMessageKey.invalidMeetingInfo);
      throw errors;
    }
    const { topic, password, schedule, _requireMeetingPassword } = meeting;
    const errors = new MeetingErrors();
    if (topic.length <= 0) {
      errors.pushLocalized(meetingOperationMessageKey.emptyTopic);
    }
    if (_requireMeetingPassword && (!password || password.length <= 0)) {
      errors.pushLocalized(meetingOperationMessageKey.noPassword);
    }
    if (schedule) {
      if (schedule.durationInMinutes! < 0) {
        errors.pushLocalized(meetingOperationMessageKey.durationIncorrect);
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
        durationInMinutes: schedule!.durationInMinutes,
        timeZone: {
          id: this.enableCustomTimezone
            ? schedule!.timeZone!.id
            : UTC_TIMEZONE_ID,
        },
      };
      if (schedule!.startTime) {
        // Format selected startTime to utc standard time
        // Timezone information is not included here
        _schedule.startTime = this.enableCustomTimezone
          ? schedule!.startTime
          : dayjs.utc(schedule!.startTime).format();
      }
      formatted.schedule = _schedule;

      if (recurrence && recurrence.until) {
        formatted.recurrence!.until = dayjs.utc(recurrence.until).format();
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
    const extensionInfo = (await this.getExtensionInfo(resp?.host?.id)) as any;
    const result: ScheduleMeetingResponse = {
      meeting: resp,
      serviceInfo: {
        ...serviceInfo,
        mobileDialingNumberTpl: getMobileDialingNumberTpl(
          serviceInfo.dialInNumbers!,
          resp.id,
        ),
        phoneDialingNumberTpl: getPhoneDialingNumberTpl(
          serviceInfo.dialInNumbers!,
        ),
      } as any,
      extensionInfo,
      invitationInfo,
    };
    return result;
  }

  async _errorHandle(errors: any) {
    const operationError = await this._createOperationError(errors);
    this._showOperationError(operationError);
  }

  private async _createOperationError(
    errors: any,
    responseBody?: Record<string, any>,
  ): Promise<MeetingOperationErrorResult> {
    if (errors instanceof MeetingErrors) {
      return createMeetingOperationError(
        meetingOperationErrorReason.validation,
        errors.all.map((message) => ({
          level: 'warning',
          ...message,
        })),
      );
    }

    if (errors?.response) {
      const {
        errorCode,
        message = '',
        permissionName,
      } = responseBody ?? (await this._getErrorResponse(errors));

      if (errorCode === 'InsufficientPermissions' && permissionName) {
        return createMeetingOperationError(
          meetingOperationErrorReason.insufficientPermissions,
          [
            {
              level: 'danger',
              messageKey: meetingOperationMessageKey.insufficientPermissions,
              messageParams: {
                application: this._brand.appName as string,
                permissionName,
              },
              messageSource: meetingOperationMessageSource.meeting,
            },
          ],
        );
      }

      if (
        errorCode === 'CMN-102' &&
        message.indexOf('[meetingId] is not found') > -1
      ) {
        return createMeetingOperationError(
          meetingOperationErrorReason.deleted,
          [
            {
              level: 'danger',
              messageKey: meetingOperationMessageKey.meetingIsDeleted,
              messageSource: meetingOperationMessageSource.meeting,
            },
          ],
        );
      }

      if (
        this._availabilityMonitor &&
        (await this._availabilityMonitor.checkIfHAError(errors))
      ) {
        return createMeetingOperationError(
          meetingOperationErrorReason.availability,
          [],
        );
      }

      return createMeetingOperationError(meetingOperationErrorReason.internal, [
        {
          level: 'danger',
          messageKey: meetingOperationMessageKey.internalError,
          messageSource: meetingOperationMessageSource.meeting,
        },
      ]);
    }

    console.log('errors:', errors);
    return createMeetingOperationError(meetingOperationErrorReason.internal, [
      {
        level: 'danger',
        messageKey: meetingOperationMessageKey.internalError,
        messageSource: meetingOperationMessageSource.meeting,
      },
    ]);
  }

  private async _getErrorResponse(error: ApiError) {
    try {
      return (await error.response?.clone().json()) as Record<string, any>;
    } catch (responseError) {
      console.log('failed to read meeting error response:', responseError);
      return {};
    }
  }

  private _showOperationError(error: MeetingOperationErrorResult) {
    error.notifications.forEach((notification) => {
      const message = resolveMeetingOperationNotification(
        notification,
        (messageKey, messageParams) =>
          messageParams
            ? t(messageKey as never, messageParams as never)
            : t(messageKey as never),
      );
      const { level } = notification;
      this._toast[level]({ message });
    });
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
        requirePwdForPMI!,
        requirePwdIsLockedForPMI!,
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
    return this._extensionInfo.info.id!;
  }

  get enableDiscoveryApi() {
    return !!this._client.service.platform().discovery();
  }

  rcvBaseWebUri: string | null = null;

  async fetchDiscoveryConfig() {
    const data = await this._client.service
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

  @computed((that: Meeting) => [that._brand.brandConfig.meetingUriReg.rcm])
  get rcmUriRegExp() {
    return getRcmUriRegExp(this._brand.brandConfig.meetingUriReg.rcm);
  }

  @computed((that: Meeting) => [
    that._brand.brandConfig.meetingUriReg.rcv,
    that.rcvBaseWebUri,
  ])
  get rcvUriRegExp() {
    const regExpText =
      this.enableDiscoveryApi && this.rcvBaseWebUri
        ? `(${this.rcvBaseWebUri
            ?.replace(/^https?:\/\//, '')
            .replace(/\./g, '\\.')}|${
            this._brand.brandConfig.meetingUriReg.rcv
          })`
        : this._brand.brandConfig.meetingUriReg.rcv;
    return getRcvUriRegExp(regExpText);
  }
}
