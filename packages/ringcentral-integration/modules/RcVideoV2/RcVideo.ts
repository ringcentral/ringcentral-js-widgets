import {
  state,
  action,
  computed,
  RcModuleV2,
  storage,
} from '@ringcentral-integration/core';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { find, omit } from 'ramda';
import { Module } from '../../lib/di';
import { Deps, RcvDelegator } from './RcVideo.interface';
import background from '../../lib/background';
import proxify from '../../lib/proxy/proxify';
import meetingStatus from '../Meeting/meetingStatus';
import { videoStatus } from './videoStatus';
import { MeetingErrors } from '../Meeting';
import { ASSISTED_USERS_MYSELF, RcvWaitingRoomModeProps } from './constants';
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
  RCV_WAITTING_ROOM_API_KEYS,
  patchWaitingRoomRelated,
  assignObject,
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
} from '../../interfaces/Rcv.model';
import { IMeeting } from '../../interfaces/Meeting.interface';

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
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'RcVideoOptions', optional: true },
  ],
})
export class RcVideo extends RcModuleV2<Deps> implements IMeeting {
  protected _showAdminLock: boolean;
  protected _showSaveAsDefault: boolean;
  protected _isInstantMeeting: boolean;
  protected _enableWaitingRoom: boolean;
  protected _enablePersonalMeeting: boolean;
  protected _enableScheduleOnBehalf: boolean;
  protected _enableReloadAfterSchedule: boolean;

  constructor(deps: Deps) {
    super({
      enableCache: true,
      storageKey: 'RcVideo',
      deps,
    });
    this._showAdminLock = this._deps.rcVideoOptions?.showAdminLock ?? false;
    this._showSaveAsDefault =
      this._deps.rcVideoOptions?.showSaveAsDefault ?? false;
    this._isInstantMeeting =
      this._deps.rcVideoOptions?.isInstantMeeting ?? false;
    this._enableWaitingRoom =
      this._deps.rcVideoOptions?.enableWaitingRoom ?? false;
    this._enablePersonalMeeting =
      this._deps.rcVideoOptions?.enablePersonalMeeting ?? false;
    this._enableScheduleOnBehalf =
      this._deps.rcVideoOptions?.enableScheduleOnBehalf ?? false;
    this._enableReloadAfterSchedule =
      this._deps.rcVideoOptions?.enableReloadAfterSchedule ?? true;
  }

  get enableScheduleOnBehalf() {
    return this._enableScheduleOnBehalf;
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
  meeting: Partial<RcVMeetingModel> = {};

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

    this._initMeeting(Number(delegator.extensionId));
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
        processedDelegators.push(this.loginUser);
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
    };
    if (notShowAgain) {
      updateInfo._saved = notShowAgain;
    }

    this._saveDefaultVideoSetting(updateInfo);
  }

  validatePasswordSettings(password: string, isSecret: boolean): boolean {
    return validatePasswordSettings(password, isSecret);
  }

  protected _createMeetingPromise: any = null;

  @proxify
  async createMeeting(
    meeting: RcVMeetingModel,
    { isAlertSuccess = true }: { isAlertSuccess?: boolean } = {},
  ) {
    if (this.isScheduling) return this._createMeetingPromise;
    try {
      this._updateVideoStatus(videoStatus.creating);

      let meetingDetail: RcVideoAPI = pruneMeetingObject(meeting);

      if (this._showSaveAsDefault && meeting.saveAsDefault) {
        this.saveAsDefaultSetting(meeting);
      }

      if (!this.enableWaitingRoom) {
        meetingDetail = omit([RCV_WAITTING_ROOM_API_KEYS], meetingDetail);
      }

      this._createMeetingPromise = this._deps.client.service
        .platform()
        .post('/rcvideo/v1/bridges', meetingDetail);

      const result = await this._createMeetingPromise;
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

      const meetingResponse = {
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
    } finally {
      this._createMeetingPromise = null;
    }
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

  protected async _getDialinNumbers(): Promise<string> {
    const result = await this._deps.client.service
      .platform()
      .get('/rcvideo/v1/dial-in-numbers');
    const { phoneNumbers } = (await result.json()) as RcVDialInNumberGET;
    if (Array.isArray(phoneNumbers)) {
      const defaultPhoneNumber = phoneNumbers.find((obj) => obj.default);
      if (defaultPhoneNumber) {
        return defaultPhoneNumber.phoneNumber;
      }
    }
    return null;
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

      let meetingDetail: RcVideoAPI = pruneMeetingObject(meeting);

      if (this._showSaveAsDefault && meeting.saveAsDefault) {
        this.saveAsDefaultSetting(meeting);
      }

      if (!this.enableWaitingRoom) {
        meetingDetail = omit([RCV_WAITTING_ROOM_API_KEYS], meetingDetail);
      }
      if (this._showSaveAsDefault && meeting.saveAsDefault) {
        this.saveAsDefaultSetting(meeting);
      }
      const meetingResult = await this._deps.client.service.platform().send({
        method: 'PATCH',
        url: `/rcvideo/v1/bridges/${meeting.id}`,
        body: meetingDetail,
      });

      // After Update
      const dialInNumber = await this._getDialinNumbers();
      const extensionInfo = await this.getExtensionInfo(
        this.currentUser.extensionId,
      );
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

      const newMeeting = await meetingResult.json();
      this._updateVideoStatus(videoStatus.updated);

      const meetingResponse = {
        extensionInfo,
        dialInNumber,
        meeting: { ...meeting, ...newMeeting },
      };
      if (this.personalMeeting && newMeeting.id === this.personalMeeting.id) {
        this._savePersonalMeeting(newMeeting);
      }
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
        ...meeting,
        ...patchWaitingRoomRelated(
          {
            ...(this.meeting as RcVMeetingModel),
            ...meeting,
          },
          this.transformedPreferences,
          true,
        ),
      };
    }
    this._updateMeetingSettings(processedMeeting, patch);
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
    }
  }

  get personalMeeting(): Partial<RcVideoAPI> {
    return this._enablePersonalMeeting ? this.personalVideo : null;
  }

  get savedDefaultVideoSetting(): Partial<RcVMeetingModel> {
    return this._showSaveAsDefault ? this.savedDefaultSetting : null;
  }

  get extensionName(): string {
    return this._deps.extensionInfo.info && this._deps.extensionInfo.info.name;
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

  get showAdminLock(): boolean {
    return this._showAdminLock;
  }

  get enablePersonalMeeting(): boolean {
    return this._enablePersonalMeeting;
  }

  get enableWaitingRoom(): boolean {
    return this._enableWaitingRoom;
  }

  get isInstantMeeting(): boolean {
    return this._isInstantMeeting;
  }

  @computed<RcVideo>(({ preferences, isInstantMeeting }) => [
    preferences,
    isInstantMeeting,
  ])
  get transformedPreferences(): RcVPreferences {
    return transformPreferences(this.preferences, this.isInstantMeeting);
  }

  @computed<RcVideo>(({ settingLocks, isInstantMeeting }) => [
    settingLocks,
    isInstantMeeting,
  ])
  get transformedSettingLocks(): RcVSettingLocks {
    return transformSettingLocks(this.settingLocks, this.isInstantMeeting);
  }

  @computed<RcVideo>(
    ({
      personalMeeting,
      initialVideoSetting,
      transformedPreferences,
      transformedSettingLocks,
    }) => [
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

  @computed<RcVideo>(
    ({
      initialVideoSetting,
      transformedPreferences,
      transformedSettingLocks,
    }) => [
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
      isMeetingPasswordValid: true, // generated random password is valid
      id: null,
      usePersonalMeetingId: false,
      settingLock: {
        ...this.transformedSettingLocks,
      },
    };
  }

  @computed<RcVideo>(({ currentUser, extensionName, brandName }) => [
    currentUser,
    extensionName,
    brandName,
  ])
  get initialVideoSetting(): RcVMeetingModel {
    const startTime = getInitializedStartTime();
    let extensionName = this.extensionName;
    if (this.currentUser?.extensionId !== `${this.extensionId}`) {
      extensionName = this.currentUser?.name;
    }
    const topic = getTopic(extensionName, this.brandName);
    return getDefaultVideoSettings({
      topic,
      startTime: new Date(startTime),
      accountId: this.currentUser.accountId,
      extensionId: this.currentUser.extensionId,
    });
  }

  @computed<RcVideo>(({ extensionId, accountId }) => [extensionId, accountId])
  get loginUser(): RcvDelegator {
    return {
      name: ASSISTED_USERS_MYSELF,
      id: `${this.extensionId}`,
      extensionId: `${this.extensionId}`,
      accountId: `${this.accountId}`,
      isLoginUser: true,
    };
  }

  @computed<RcVideo>(({ delegator, loginUser }) => [delegator, loginUser])
  get currentUser(): RcvDelegator {
    return this.delegator || this.loginUser;
  }
}
