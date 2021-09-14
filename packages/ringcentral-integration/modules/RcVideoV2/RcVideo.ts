import {
  state,
  action,
  computed,
  RcModuleV2,
  storage,
  track,
} from '@ringcentral-integration/core';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { filter, find } from 'ramda';
import { DEFAULT_LOCALE } from '@ringcentral-integration/i18n';
import { Module } from '../../lib/di';
import { Deps, RcvDelegator, RcVideoResponse } from './RcVideo.interface';
import background from '../../lib/background';
import { proxify } from '../../lib/proxy/proxify';
import meetingStatus from '../Meeting/meetingStatus';
import { videoStatus } from './videoStatus';
import { MeetingErrors } from '../Meeting';
import {
  ASSISTED_USERS_MYSELF,
  RcvWaitingRoomModeProps,
  RCV_WAITING_ROOM_API_KEYS,
  RCV_E2EE_API_KEYS,
} from './constants';
import { getInitializedStartTime } from '../../helpers/meetingHelper';
import {
  getDefaultVideoSettings,
  validatePasswordSettings,
  generateRandomPassword,
  getTopic,
  pruneMeetingObject,
  RcVideoTypes,
  transformPreferences,
  reversePreferences,
  comparePreferences,
  transformSettingLocks,
  getLockedPreferences,
  RCV_PREFERENCES_IDS,
  patchWaitingRoomRelated,
  assignObject,
  formatPremiumNumbers,
  formatMainPhoneNumber,
} from './videoHelper';
import {
  RcVideoAPI,
  RcVMeetingModel,
  RcVSettingLocks,
  RcVPreferencesGET,
  RcVSettingLocksGET,
  RcVPreferences,
  RcVDialInNumberGET,
  RcVPreferencesAPIResult,
  RcVPreferenceDataItem,
  RcVDialInNumberObj,
  RcvInvitationInfo,
  RcvInvitationRequest,
} from '../../interfaces/Rcv.model';
import { IMeeting } from '../../interfaces/Meeting.interface';
import { trackEvents } from '../Analytics';

@Module({
  name: 'RcVideo',
  deps: [
    'Alert',
    'Client',
    'Brand',
    'Storage',
    'AccountInfo',
    'ExtensionInfo',
    'VideoConfiguration',
    'Locale',
    { dep: 'DynamicConfig', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'RcVideoOptions', optional: true },
  ],
})
export class RcVideo extends RcModuleV2<Deps> implements IMeeting {
  protected _showSaveAsDefault: boolean;
  protected _isInstantMeeting: boolean;
  protected _enableE2EE: boolean;
  protected _enableWaitingRoom: boolean;
  protected _enablePersonalMeeting: boolean;
  protected _enableScheduleOnBehalf: boolean;
  protected _enableHostCountryDialinNumbers: boolean;
  protected _enableReloadAfterSchedule: boolean;
  protected _enableInvitationApi: boolean;
  protected _currentLocale: string;
  private _createMeetingPromise: any = null;

  constructor(deps: Deps) {
    super({
      enableCache: true,
      storageKey: 'RcVideo',
      deps,
    });

    this._enableInvitationApi =
      this._deps.rcVideoOptions?.enableInvitationApi ?? false;
    this._showSaveAsDefault =
      this._deps.rcVideoOptions?.showSaveAsDefault ?? false;
    this._isInstantMeeting =
      this._deps.rcVideoOptions?.isInstantMeeting ?? false;
    this._enableE2EE = this._deps.rcVideoOptions?.enableE2EE ?? false;
    this._enableWaitingRoom =
      this._deps.rcVideoOptions?.enableWaitingRoom ?? false;
    this._enablePersonalMeeting =
      this._deps.rcVideoOptions?.enablePersonalMeeting ?? false;
    this._enableScheduleOnBehalf =
      this._deps.rcVideoOptions?.enableScheduleOnBehalf ?? false;
    this._enableHostCountryDialinNumbers =
      this._deps.rcVideoOptions?.enableHostCountryDialinNumbers ?? false;
    this._enableReloadAfterSchedule =
      this._deps.rcVideoOptions?.enableReloadAfterSchedule ?? true;
    this._currentLocale = this._deps.locale?.currentLocale ?? DEFAULT_LOCALE;
  }

  @storage
  @state
  personalVideo: Partial<RcVideoAPI> = null;

  // when migrate to rcv v2, computed defaultVideoSetting has conflict with storage key 'defaultVideoSetting'
  // rcv save as default toggle has not opened yet, so change the key into 'savedDefaultSetting'
  @storage
  @state
  savedDefaultSetting: Partial<RcVMeetingModel> = {};

  @state
  meeting: Partial<RcVMeetingModel> = null;

  @state
  videoStatus: ObjectMapValue<typeof videoStatus> = videoStatus.idle;

  @state
  preferences: RcVPreferencesGET = {};

  @state
  isPreferencesChanged: boolean = false;

  @state
  settingLocks: RcVSettingLocksGET = {};

  @state
  delegator: RcvDelegator = null;

  @state
  delegators: RcvDelegator[] = [];

  @state
  hasSettingsChanged: boolean = false;

  @action
  protected _savePersonalMeeting(settings: Partial<RcVideoAPI>) {
    this.personalVideo = {
      ...this.personalVideo,
      ...settings,
    };
  }

  @action
  protected _resetPersonalMeeting() {
    this.personalVideo = {};
  }

  @action
  protected _saveDefaultVideoSetting(settings: Partial<RcVMeetingModel>) {
    this.savedDefaultSetting = {
      ...this.savedDefaultSetting,
      ...settings,
    };
  }

  @action
  protected _updateMeetingSettings(
    info: Partial<RcVMeetingModel>,
    patch: boolean = true,
  ) {
    this.meeting = patch
      ? {
          ...this.meeting,
          ...info,
        }
      : (info as RcVMeetingModel);
  }

  _shouldInit() {
    return super._shouldInit() && this._deps.videoConfiguration.isRCV;
  }

  _shouldReset() {
    return (
      super._shouldReset() ||
      (this.ready && !this._deps.videoConfiguration.isRCV)
    );
  }

  @track((that: RcVideo, status: string) => {
    if (status !== videoStatus.creating) return;
    return (analytics) => {
      const target = analytics.getTrackTarget();
      if (target) {
        return [
          trackEvents.clickMeetingSchedulePage,
          { router: target.router, 'Meeting Type': 'RCV' },
        ];
      }
    };
  })
  @action
  protected _updateVideoStatus(status: ObjectMapValue<typeof videoStatus>) {
    this.videoStatus = status;
  }

  @action
  protected _updateMeetingPreferences(preferences: RcVPreferencesGET) {
    this.preferences = preferences;
  }

  @action
  protected _updateIsPreferencesChanged(isPreferencesChanged: boolean) {
    this.isPreferencesChanged = isPreferencesChanged;
  }

  @action
  protected _updateMeetingSettingLocks(settingLocks: RcVSettingLocksGET) {
    this.settingLocks = settingLocks;
  }

  @action
  protected _updateDelegator(delegator: RcvDelegator) {
    this.delegator = delegator;
  }

  @action
  protected _updateDelegatorList(delegatorList: RcvDelegator[]) {
    this.delegators = delegatorList;
  }

  @action
  protected _updateHasSettingsChanged(isChanged: boolean) {
    this.hasSettingsChanged = isChanged;
  }

  @proxify
  async onInit() {
    await this._initMeeting();
    if (this._enableScheduleOnBehalf) {
      await this._initDelegators();
      this.updateDelegator(this.loginUser);
    }
  }

  /**
   * Init basic meeting information
   * also load meeting setting from previous one.
   */
  @background
  async init() {
    await this.onInit();
  }

  @proxify
  async reload() {
    await this.onInit();
  }

  @proxify
  async switchUsePersonalMeetingId(usePersonalMeetingId: boolean) {
    this._initMeetingSettings(usePersonalMeetingId);
  }

  @proxify
  async updateDelegator(delegator: RcvDelegator) {
    this._updateDelegator(delegator);
  }

  @proxify
  async updateScheduleFor(userExtensionId: string) {
    if (!userExtensionId || !this.delegators || this.delegators.length === 0) {
      return;
    }

    const delegator: RcvDelegator = find(
      (user: RcvDelegator) => user.extensionId === userExtensionId,
      this.delegators,
    );

    if (!delegator) {
      return;
    }

    this.updateDelegator(delegator);

    await this._initMeeting(Number(delegator.extensionId));
  }

  protected async _initMeeting(extensionId = this.extensionId) {
    this._updateVideoStatus(videoStatus.initializing);

    if (this._enablePersonalMeeting) {
      await this._initPersonalMeeting(this.accountId, extensionId);
    }
    await this._initPreferences(this.accountId, extensionId);

    this._initMeetingSettings(false);

    this._updateVideoStatus(videoStatus.initialized);
  }

  async _initPreferences(
    accountId: number = this.accountId,
    extensionId: number = this.extensionId,
  ) {
    try {
      const { preferences, settingLocks } = await this._getPreferences(
        accountId,
        extensionId,
      );
      // TODO Remove the next line after rcv implement ui to manage password_instant
      preferences.password_instant = false;

      this._updatePreference(preferences);
      this._updateMeetingSettingLocks(settingLocks);
    } catch (errors) {
      console.log('preference error:', errors);
      // this._errorHandle(errors);
    }
  }

  async _initPersonalMeeting(
    accountId: number = this.accountId,
    extensionId: number = this.extensionId,
  ) {
    try {
      const meetingResult = await this._deps.client.service
        .platform()
        .get('/rcvideo/v1/bridges', {
          default: true,
          accountId,
          extensionId,
        });
      const meeting = (await meetingResult.json()) as RcVideoAPI;
      this._savePersonalMeeting(meeting);
    } catch (errors) {
      console.error('fetch personal meeting error:', errors);
      this._resetPersonalMeeting();
      this._errorHandle(errors);
    }
  }

  protected async _initDelegators() {
    try {
      const result = await this._deps.client.service
        .platform()
        .get('/rcvideo/v1/accounts/~/extensions/~/delegators');
      const delegators = (await result.json()) as RcvDelegator[];
      // to make sure it will equal to v1
      const processedDelegators = delegators;
      if (processedDelegators.length) {
        processedDelegators.unshift(this.loginUser);
      }
      this._updateDelegatorList(processedDelegators);
    } catch (errors) {
      this._errorHandle(errors);
    }
  }

  saveAsDefaultSetting(meeting: RcVMeetingModel) {
    const {
      allowJoinBeforeHost,
      isOnlyAuthUserJoin,
      isOnlyCoworkersJoin,
      allowScreenSharing,
      muteAudio,
      muteVideo,
      e2ee,
      isMeetingSecret,
      notShowAgain,
      waitingRoomMode,
    } = meeting;
    const updateInfo: {
      allowJoinBeforeHost: boolean;
      isOnlyAuthUserJoin: boolean;
      isOnlyCoworkersJoin: boolean;
      allowScreenSharing: boolean;
      muteAudio: boolean;
      muteVideo: boolean;
      e2ee: boolean;
      isMeetingSecret: boolean;
      waitingRoomMode: RcvWaitingRoomModeProps;
      _saved?: boolean;
    } = {
      allowJoinBeforeHost,
      isOnlyAuthUserJoin,
      isOnlyCoworkersJoin,
      allowScreenSharing,
      muteAudio,
      muteVideo,
      isMeetingSecret,
      waitingRoomMode,
      e2ee,
    };
    if (notShowAgain) {
      updateInfo._saved = notShowAgain;
    }

    this._saveDefaultVideoSetting(updateInfo);
  }

  validatePasswordSettings(password: string, isSecret: boolean): boolean {
    return validatePasswordSettings(password, isSecret);
  }

  @proxify
  async createMeetingDirectly(
    meeting: RcVMeetingModel,
    { isAlertSuccess = true }: { isAlertSuccess?: boolean } = {},
  ) {
    try {
      this._updateVideoStatus(videoStatus.creating);

      if (this._showSaveAsDefault && meeting.saveAsDefault) {
        this.saveAsDefaultSetting(meeting);
      }

      const meetingDetail = pruneMeetingObject(meeting, [
        {
          condition: this.enableWaitingRoom,
          key: RCV_WAITING_ROOM_API_KEYS,
        },
        {
          condition: this.enableE2EE && !meeting.usePersonalMeetingId,
          key: RCV_E2EE_API_KEYS,
        },
      ]);

      const result = await this._deps.client.service
        .platform()
        .post('/rcvideo/v1/bridges', meetingDetail);

      const newMeeting = await result.json();

      this.updateMeetingSettings({
        ...meeting,
        saveAsDefault: false,
      });

      // After Create
      const dialInNumber = await this._getDialinNumbers();
      const extensionInfo = await this.getExtensionInfo(
        this.currentUser.extensionId,
      );

      const invitationInfo = await this.getMeetingInvitation({
        hostName: extensionInfo.name,
        meetingName: newMeeting.name,
        meetingId: newMeeting.id,
        meetingUrl: newMeeting.joinUri,
        participantCode: newMeeting.participantCode,
        mainPhoneNumber: formatMainPhoneNumber(dialInNumber),
        password: newMeeting.meetingPassword,
        dialInPassword: newMeeting.meetingPasswordPSTN,
        premiumNumbers: formatPremiumNumbers(dialInNumber),
      });

      // sync preferences changes to rcv backend
      if (meeting.saveAsDefault) {
        await this.savePreferencesChanges(meeting);
      }
      // this will also fetch preference from rcv backend
      if (this._enableReloadAfterSchedule) {
        await this._initMeeting(Number(this.currentUser.extensionId));
      }

      if (isAlertSuccess) {
        setTimeout(() => {
          this._deps.alert.success({
            message: meetingStatus.scheduledSuccess,
          });
        }, 50);
      }

      this._updateVideoStatus(videoStatus.created);
      this._updateHasSettingsChanged(false);

      const meetingResponse = {
        invitationInfo,
        extensionInfo,
        dialInNumber,
        meeting: { ...meeting, ...newMeeting },
      };

      return {
        ...meetingResponse,
        ...meeting,
      };
    } catch (errors) {
      console.log('failed to create rcv:', errors);
      this._updateVideoStatus(videoStatus.idle);
      this._errorHandle(errors);
      return null;
    }
  }

  @proxify
  async createMeeting(
    meeting: RcVMeetingModel,
    { isAlertSuccess = true }: { isAlertSuccess?: boolean } = {},
  ) {
    if (this.isScheduling) return this._createMeetingPromise;

    this._createMeetingPromise = this.createMeetingDirectly(meeting, {
      isAlertSuccess,
    });
    const result = await this._createMeetingPromise;
    this._createMeetingPromise = null;
    return result;
  }

  async startMeeting(
    meeting: RcVMeetingModel,
    isAlertSuccess: boolean = true,
  ): Promise<any> {
    // When user click on button "start", client create bridge type=0, but doesn't send time-to-life for this bridge. Backend has default ttl = 24 hours.
    return this.createMeeting(
      {
        ...meeting,
        expiresIn: null,
        type: RcVideoTypes.meeting,
      },
      { isAlertSuccess },
    );
  }

  @proxify
  async getMeetingInvitation(
    invitationRequest: RcvInvitationRequest,
  ): Promise<RcvInvitationInfo> {
    if (!this._enableInvitationApi) {
      return null;
    }

    try {
      const apiResponse = await this._deps.client.service
        .platform()
        .post('/rcvideo/v1/invitations/render', invitationRequest);
      return await apiResponse.json();
    } catch (ex) {
      console.warn('failed to get invitation', ex);
      return null;
    }
  }

  @proxify
  protected async _getDialinNumbers(): Promise<string | RcVDialInNumberObj[]> {
    const result = await this._deps.client.service
      .platform()
      .get('/rcvideo/v1/dial-in-numbers');
    const { phoneNumbers } = (await result.json()) as RcVDialInNumberGET;
    if (Array.isArray(phoneNumbers)) {
      if (this._enableHostCountryDialinNumbers) {
        const countryDialinNumbers = filter(
          (obj) => obj?.country?.isoCode === this.country.isoCode,
          phoneNumbers,
        );
        if (countryDialinNumbers.length > 0) {
          return countryDialinNumbers;
        }
      }

      const defaultPhoneNumber = find((obj) => obj.default, phoneNumbers);
      if (defaultPhoneNumber) {
        return defaultPhoneNumber.phoneNumber;
      }
    }
    return [];
  }

  protected async _getPreferences(
    accountId: number = this.accountId,
    extensionId: number = this.extensionId,
  ): Promise<RcVPreferencesAPIResult> {
    const res = await this._deps.client.service
      .platform()
      .get(
        `/rcvideo/v1/account/${accountId}/extension/${extensionId}/preferences`,
        {
          id: RCV_PREFERENCES_IDS,
        },
      );
    const list: Array<RcVPreferenceDataItem> = await res.json();
    const preferences: RcVPreferencesGET = {};
    const settingLocks: RcVSettingLocksGET = {};

    list.forEach(({ id, value, readOnly }) => {
      assignObject(preferences, value, id);
      assignObject(settingLocks, readOnly, id);
    });
    return { preferences, settingLocks };
  }

  @proxify
  async getExtensionInfo(extensionId: string) {
    if (Number(extensionId) === this.extensionId) {
      return this._deps.extensionInfo.info;
    }
    return this._deps.client.account().extension(extensionId).get();
  }

  protected _updatePreference(preferences: Partial<RcVPreferencesGET>) {
    this._updateMeetingPreferences(preferences);
  }

  protected async _saveSinglePreference(
    preferenceId: keyof RcVPreferencesGET,
    value: boolean,
  ): Promise<void> {
    return this._deps.client.service.platform().send({
      method: 'PATCH',
      url: `/rcvideo/v1/account/~/extension/~/preferences/${preferenceId}`,
      body: { value },
    });
  }

  /**
   * Determined the different between client and server, then save them to the server.
   * @param preferences preference fileds in meeting object
   * @param isOverwrite if true, dispatch updateMeetingPreferences on success
   */
  async savePreferencesChanges(
    preferences: RcVPreferences,
    isOverwrite = false,
  ): Promise<void> {
    const preferencesPayload = reversePreferences(
      preferences,
      this._isInstantMeeting,
    );
    type PreferenceEntries = [keyof RcVPreferencesGET, boolean];
    const dirtyPreferences = Object.entries(preferencesPayload).filter(
      (kvPairs): kvPairs is PreferenceEntries => {
        const [preferenceId, newValue] = kvPairs as PreferenceEntries;
        const oldValue = this.preferences[preferenceId];
        const isLocked = this.settingLocks[preferenceId];
        // hack for watingRoom, it will change locked option
        return newValue !== oldValue && !isLocked;
      },
    );
    try {
      await Promise.all(
        dirtyPreferences.map(([preferenceId, newValue]: PreferenceEntries) => {
          return this._saveSinglePreference(preferenceId, newValue);
        }),
      );
      if (isOverwrite) {
        this._updatePreference(preferencesPayload);
      }
    } catch (e) {
      console.error(e);
    }
  }

  @proxify
  async getMeeting(
    meetingId: string,
    accountId: number = this.accountId,
    extensionId: number = this.extensionId,
  ): Promise<RcVideoAPI> {
    const result = await this._deps.client.service
      .platform()
      .get('/rcvideo/v1/bridges', {
        shortId: meetingId,
        accountId,
        extensionId,
      });
    const meeting = (await result.json()) as RcVideoAPI;
    return meeting;
  }

  @proxify
  async updateMeeting(
    meetingId: string,
    meeting: RcVMeetingModel,
    { isAlertSuccess = false }: { isAlertSuccess?: boolean } = {},
  ) {
    try {
      this._updateVideoStatus(videoStatus.updating);

      if (this._showSaveAsDefault && meeting.saveAsDefault) {
        this.saveAsDefaultSetting(meeting);
      }

      const meetingDetail = pruneMeetingObject(meeting, [
        {
          condition: this.enableWaitingRoom,
          key: RCV_WAITING_ROOM_API_KEYS,
        },
        {
          condition: this.enableE2EE && !meeting.usePersonalMeetingId,
          key: RCV_E2EE_API_KEYS,
        },
      ]);

      const meetingResult = await this._deps.client.service.platform().send({
        method: 'PATCH',
        url: `/rcvideo/v1/bridges/${meeting.id}`,
        body: meetingDetail,
      });
      const newMeeting = await meetingResult.json();

      // After Update
      const dialInNumber = await this._getDialinNumbers();
      const extensionInfo = await this.getExtensionInfo(
        this.currentUser.extensionId,
      );

      const invitationInfo = await this.getMeetingInvitation({
        hostName: extensionInfo.name,
        meetingName: newMeeting.name,
        meetingId: newMeeting.id,
        meetingUrl: newMeeting.joinUri,
        participantCode: newMeeting.participantCode,
        mainPhoneNumber: formatMainPhoneNumber(dialInNumber),
        password: newMeeting.meetingPassword,
        dialInPassword: newMeeting.meetingPasswordPSTN,
        premiumNumbers: formatPremiumNumbers(dialInNumber),
      });

      if (meeting.saveAsDefault) {
        await this.savePreferencesChanges(meeting, true);
      }

      if (isAlertSuccess) {
        setTimeout(() => {
          this._deps.alert.success({
            message: meetingStatus.updatedSuccess,
          });
        }, 50);
      }

      this._updateVideoStatus(videoStatus.updated);
      this._updateHasSettingsChanged(false);

      if (this.personalMeeting && newMeeting.id === this.personalMeeting.id) {
        this._savePersonalMeeting(newMeeting);
      }

      const meetingResponse = {
        invitationInfo,
        extensionInfo,
        dialInNumber,
        meeting: { ...meeting, ...newMeeting },
      } as RcVideoResponse;

      return meetingResponse;
    } catch (errors) {
      this._updateVideoStatus(videoStatus.idle);
      this._errorHandle(errors);
      return null;
    }
  }

  protected _initMeetingSettings(usePersonalMeetingId: boolean) {
    if (usePersonalMeetingId) {
      this.updateMeetingSettings({
        ...this.personalVideoSetting,
      });
    } else {
      this.updateMeetingSettings({
        ...this.defaultVideoSetting,
      });
    }
  }

  @proxify
  async updateMeetingSettings(
    meeting: Partial<RcVMeetingModel>,
    patch: boolean = true,
  ) {
    let processedMeeting = meeting;
    if (this.enableWaitingRoom) {
      processedMeeting = {
        ...processedMeeting,
        ...patchWaitingRoomRelated(
          {
            ...this.meeting,
            ...processedMeeting,
          } as RcVMeetingModel,
          this.transformedPreferences,
          true,
        ),
      };
    }
    this._updateMeetingSettings(
      {
        ...processedMeeting,
        isMeetingPasswordValid: this.validatePasswordSettings(
          processedMeeting.meetingPassword ?? this.meeting?.meetingPassword,
          processedMeeting.isMeetingSecret ?? this.meeting?.isMeetingSecret,
        ),
      },
      patch,
    );
    this._comparePreferences();
  }

  protected _comparePreferences() {
    this._updateIsPreferencesChanged(
      comparePreferences(
        this.transformedPreferences,
        this.meeting as RcVMeetingModel,
      ),
    );
  }

  updateHasSettingsChanged(isChanged: boolean) {
    this._updateHasSettingsChanged(isChanged);
  }

  protected async _errorHandle(errors: any) {
    if (errors instanceof MeetingErrors) {
      for (const error of errors.all) {
        this._deps.alert.warning(error);
      }
    } else if (errors && errors.response) {
      const {
        errorCode,
        permissionName,
      } = await errors.response.clone().json();
      if (errorCode === 'InsufficientPermissions' && permissionName) {
        this._deps.alert.danger({
          message: meetingStatus.insufficientPermissions,
          payload: {
            permissionName,
          },
        });
      } else if (
        !this._deps.availabilityMonitor ||
        !(await this._deps.availabilityMonitor.checkIfHAError(errors))
      ) {
        this._deps.alert.danger({
          message: meetingStatus.internalError,
        });
      }
    } else {
      console.log('errors:', errors);
      this._deps.alert.danger({ message: meetingStatus.internalError });
    }
  }

  get personalMeeting(): Partial<RcVideoAPI> {
    return this._enablePersonalMeeting ? this.personalVideo : null;
  }

  get savedDefaultVideoSetting(): Partial<RcVMeetingModel> {
    return this._showSaveAsDefault ? this.savedDefaultSetting : null;
  }

  get country() {
    return this._deps.extensionInfo.country;
  }

  get extensionName(): string {
    return this._deps.extensionInfo.info?.name;
  }

  get extensionId(): number {
    return this._deps.extensionInfo.info.id;
  }

  get accountId(): number {
    return this._deps.accountInfo.id;
  }

  get brandName(): string {
    return this._deps.brand.name;
  }

  get isInitializing(): boolean {
    return this.videoStatus === videoStatus.initializing;
  }

  get isScheduling(): boolean {
    return this.videoStatus === videoStatus.creating;
  }

  get showSaveAsDefault(): boolean {
    return this._showSaveAsDefault;
  }

  get enablePersonalMeeting(): boolean {
    return this._enablePersonalMeeting;
  }

  get enableWaitingRoom(): boolean {
    return this._enableWaitingRoom;
  }

  get enableE2EE(): boolean {
    return this._enableE2EE;
  }

  get enableScheduleOnBehalf() {
    return this._enableScheduleOnBehalf;
  }

  get isInstantMeeting(): boolean {
    return this._isInstantMeeting;
  }

  @computed((that: RcVideo) => [that._deps.locale.currentLocale])
  get currentLocale() {
    return this._deps.locale.currentLocale || DEFAULT_LOCALE;
  }

  @computed(({ preferences, isInstantMeeting }: RcVideo) => [
    preferences,
    isInstantMeeting,
  ])
  get transformedPreferences(): RcVPreferences {
    return transformPreferences(this.preferences, this.isInstantMeeting);
  }

  @computed(({ settingLocks, isInstantMeeting }: RcVideo) => [
    settingLocks,
    isInstantMeeting,
  ])
  get transformedSettingLocks(): RcVSettingLocks {
    return transformSettingLocks(this.settingLocks, this.isInstantMeeting);
  }

  @computed(
    ({
      personalMeeting,
      initialVideoSetting,
      transformedPreferences,
      transformedSettingLocks,
    }: RcVideo) => [
      personalMeeting,
      initialVideoSetting,
      transformedPreferences,
      transformedSettingLocks,
    ],
  )
  get personalVideoSetting() {
    if (!this.personalMeeting) {
      return null;
    }
    const processedSettings = {
      ...this.initialVideoSetting,
      ...this.personalMeeting,
      ...getLockedPreferences(
        this.transformedSettingLocks,
        this.transformedPreferences,
      ),
      meetingPassword:
        this.personalMeeting.meetingPassword || generateRandomPassword(10),
      startTime: new Date(getInitializedStartTime()),
      isMeetingPasswordValid: true, // assume personal meeting password is valid
      id: this.personalMeeting.id,
      usePersonalMeetingId: true,
      settingLock: {
        ...this.transformedSettingLocks,
      },
    } as RcVMeetingModel;
    if (this.enableWaitingRoom) {
      return {
        ...processedSettings,
        ...patchWaitingRoomRelated(
          processedSettings,
          this.transformedPreferences,
        ),
      };
    }
    return processedSettings;
  }

  @computed(
    ({
      initialVideoSetting,
      transformedPreferences,
      transformedSettingLocks,
    }: RcVideo) => [
      initialVideoSetting,
      transformedPreferences,
      transformedSettingLocks,
    ],
  )
  get defaultVideoSetting(): RcVMeetingModel {
    const savedSetting = this._showSaveAsDefault
      ? this.savedDefaultVideoSetting
      : null;
    return {
      ...this.initialVideoSetting,
      ...savedSetting,
      ...this.transformedPreferences,
      meetingPassword: generateRandomPassword(10),
      startTime: new Date(getInitializedStartTime()),
      isMeetingPasswordValid: true, // generated random password is valid
      id: null,
      usePersonalMeetingId: false,
      settingLock: {
        ...this.transformedSettingLocks,
      },
    };
  }

  @computed(({ currentUser, defaultTopic }: RcVideo) => [
    currentUser,
    defaultTopic,
  ])
  get initialVideoSetting(): RcVMeetingModel {
    return getDefaultVideoSettings({
      topic: this.defaultTopic,
      accountId: this.currentUser.accountId,
      extensionId: this.currentUser.extensionId,
    });
  }

  @computed(
    ({ currentUser, extensionName, brandName, currentLocale }: RcVideo) => [
      currentUser,
      extensionName,
      brandName,
      currentLocale,
    ],
  )
  get defaultTopic(): string {
    let extensionName = this.extensionName;
    if (this.currentUser?.extensionId !== `${this.extensionId}`) {
      extensionName = this.currentUser?.name;
    }
    return getTopic({
      extensionName,
      brandName: this.brandName,
      shortName: this._deps.brand.shortName,
      fullName: this._deps.brand.fullName,
      brandCode: this._deps.brand.code,
      currentLocale: this.currentLocale,
    });
  }

  @computed(({ extensionId, accountId }: RcVideo) => [extensionId, accountId])
  get loginUser(): RcvDelegator {
    return {
      name: ASSISTED_USERS_MYSELF,
      id: `${this.extensionId}`,
      extensionId: `${this.extensionId}`,
      accountId: `${this.accountId}`,
      isLoginUser: true,
    };
  }

  @computed(({ delegator, loginUser }: RcVideo) => [delegator, loginUser])
  get currentUser(): RcvDelegator {
    return this.delegator || this.loginUser;
  }

  get uriRegExp() {
    return this._deps.dynamicConfig?.rcvUriRegExp;
  }
}
