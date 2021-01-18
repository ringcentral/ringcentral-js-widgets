import { computed } from '@ringcentral-integration/core';
import Client from 'ringcentral-client';
import { filter, find, omit } from 'ramda';
import { DEFAULT_LOCALE } from '@ringcentral-integration/i18n';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import background from '../../lib/background';
import proxify from '../../lib/proxy/proxify';
import { selector } from '../../lib/selector';
import meetingStatus from '../Meeting/meetingStatus';
import { MeetingErrors } from '../Meeting';
import { getInitializedStartTime } from '../../helpers/meetingHelper';

import { ASSISTED_USERS_MYSELF, RcvWaitingRoomModeProps } from './constants';
import actionTypes, { RcVideoActionTypes } from './actionTypes';
import { videoStatus } from './videoStatus';
import getRcVReducer, {
  getDefaultVideoSettingReducer,
  getPersonalMeetingReducer,
} from './getRcVReducer';

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
} from '../../interfaces/Rcv.model';
import { RcvDelegator } from './interface';

@Module({
  deps: [
    'Alert',
    'Client',
    'Brand',
    'Storage',
    'AccountInfo',
    'ExtensionInfo',
    'MeetingProvider',
    'Locale',
    { dep: 'RcVideoOptions', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
  ],
})
export class RcVideo extends RcModule<Record<string, any>, RcVideoActionTypes> {
  // TODO: add state interface
  private _alert: any;
  private _client: Client;
  private _defaultVideoSettingKey: string;
  private _personalVideoKey: string;
  private _extensionInfo: any;
  private _brand: any;
  private _storage: any;
  private _availabilityMonitor: any;
  private _showSaveAsDefault: boolean;
  private _isInstantMeeting: boolean;
  private _enablePersonalMeeting: boolean;
  private _enableReloadAfterSchedule: boolean;
  private _showAdminLock: boolean;
  private _enableWaitingRoom: boolean;

  private _meetingProvider: any;
  _reducer: any;
  private _enableScheduleOnBehalf: boolean;
  private _enableHostCountryDialinNumbers: boolean;
  private _accountInfo: any;
  private _locale: any;
  private _createMeetingPromise: any = null;

  constructor({
    alert,
    client,
    extensionInfo,
    brand,
    storage,
    reducers,
    availabilityMonitor,
    meetingProvider,
    accountInfo,
    locale,
    showSaveAsDefault = false,
    isInstantMeeting = false,
    enablePersonalMeeting = false,
    enableReloadAfterSchedule = true,
    enableScheduleOnBehalf = false,
    showAdminLock = false,
    enableWaitingRoom = false,
    enableHostCountryDialinNumbers = false,
    ...options
  }) {
    super({
      ...options,
      actionTypes: options.actionTypes || actionTypes,
    });
    this._alert = alert;
    this._client = client;
    this._extensionInfo = extensionInfo;
    this._meetingProvider = meetingProvider;
    this._brand = brand;
    this._storage = storage;
    this._accountInfo = accountInfo;
    this._locale = locale;
    this._reducer = getRcVReducer(this.actionTypes, reducers);
    this._showSaveAsDefault = showSaveAsDefault;
    this._isInstantMeeting = isInstantMeeting;
    this._availabilityMonitor = availabilityMonitor;
    this._defaultVideoSettingKey = 'savedDefaultSetting';
    this._personalVideoKey = 'personalVideo';
    this._enablePersonalMeeting = enablePersonalMeeting;
    this._enableScheduleOnBehalf = enableScheduleOnBehalf;
    this._enableHostCountryDialinNumbers = enableHostCountryDialinNumbers;
    this._enableReloadAfterSchedule = enableReloadAfterSchedule;
    this._showAdminLock = showAdminLock;
    this._enableWaitingRoom = enableWaitingRoom;
    if (this._showSaveAsDefault) {
      this._storage.registerReducer({
        key: this._defaultVideoSettingKey,
        reducer: getDefaultVideoSettingReducer(this.actionTypes),
      });
    }
    if (this._enablePersonalMeeting) {
      this._storage.registerReducer({
        key: this._personalVideoKey,
        reducer: getPersonalMeetingReducer(this.actionTypes),
      });
    }
  }

  get enableScheduleOnBehalf() {
    return this._enableScheduleOnBehalf;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      await this._init();
    } else if (this._shouldReset()) {
      this._reset();
    }
  }

  _shouldInit() {
    return (
      this.pending &&
      this._accountInfo.ready &&
      this._extensionInfo.ready &&
      this._storage.ready &&
      this._meetingProvider.ready &&
      this._meetingProvider.isRCV &&
      (!this._availabilityMonitor || this._availabilityMonitor.ready)
    );
  }

  _shouldReset() {
    return (
      this.ready &&
      (!this._accountInfo.ready ||
        !this._extensionInfo.ready ||
        !this._storage.ready ||
        !this._meetingProvider.ready ||
        !this._meetingProvider.isRCV ||
        (this._availabilityMonitor && !this._availabilityMonitor.ready))
    );
  }

  _reset() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  @proxify
  async _init() {
    this.store.dispatch({
      type: this.actionTypes.init,
    });

    await this._onInit();

    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
  }

  @proxify
  async _onInit() {
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
    await this._onInit();
  }

  @proxify
  async reload() {
    await this._onInit();
  }

  @proxify
  async switchUsePersonalMeetingId(usePersonalMeetingId: boolean) {
    this._initMeetingSettings(usePersonalMeetingId);
  }

  @proxify
  updateDelegator(delegator: RcvDelegator) {
    this.store.dispatch({
      type: this.actionTypes.updateDelegator,
      delegator,
    });
  }

  @proxify
  async updateScheduleFor(userExtensionId: string) {
    if (!userExtensionId || !this.delegators || this.delegators.length === 0) {
      return;
    }

    const delegator = find(
      (user: RcvDelegator) => user.extensionId === userExtensionId,
      this.delegators,
    );

    if (!delegator) {
      return;
    }

    this.updateDelegator(delegator);

    await this._initMeeting(Number(delegator.extensionId));
  }

  private async _initMeeting(extensionId = this.extensionId) {
    this.store.dispatch({
      type: this.actionTypes.initSettingsStart,
    });
    if (this._enablePersonalMeeting) {
      await this._initPersonalMeeting(this.accountId, extensionId);
    }
    await this._initPreferences(this.accountId, extensionId);

    this._initMeetingSettings(false);
    this.store.dispatch({
      type: this.actionTypes.initSettingsEnd,
    });
  }

  private async _initPreferences(
    accountId = this.accountId,
    extensionId = this.extensionId,
  ) {
    try {
      const { preferences, settingLocks } = await this._getPreferences(
        accountId,
        extensionId,
      );
      // TODO Remove the next line after rcv implement ui to manage password_instant
      preferences.password_instant = false;
      this.store.dispatch({
        type: this.actionTypes.updateMeetingPreferences,
        preferences,
      });
      this.store.dispatch({
        type: this.actionTypes.updateMeetingSettingLocks,
        settingLocks,
      });
    } catch (errors) {
      console.log('preference error:', errors);
      // this._errorHandle(errors);
    }
  }

  private async _initPersonalMeeting(
    accountId = this.accountId,
    extensionId = this.extensionId,
  ) {
    try {
      const meetingResult = await this._client.service
        .platform()
        .get('/rcvideo/v1/bridges', {
          default: true,
          accountId,
          extensionId,
        });
      const meeting = await meetingResult.json();
      this._savePersonalMeeting(meeting);
    } catch (errors) {
      console.error('fetch personal meeting error:', errors);
      this.store.dispatch({
        type: this.actionTypes.resetPersonalMeeting,
      });
      this._errorHandle(errors);
    }
  }

  private async _initDelegators() {
    try {
      const result = await this._client.service
        .platform()
        .get('/rcvideo/v1/accounts/~/extensions/~/delegators');
      const delegators = await result.json();
      this.store.dispatch({
        type: this.actionTypes.updateDelegatorList,
        delegators,
      });
    } catch (errors) {
      this._errorHandle(errors);
    }
  }

  private _savePersonalMeeting(meeting: RcVideoAPI) {
    this.store.dispatch({
      type: this.actionTypes.savePersonalMeeting,
      meeting,
    });
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

    this.store.dispatch({
      type: this.actionTypes.saveAsDefaultSetting,
      meeting: updateInfo,
    });
  }

  validatePasswordSettings(password: string, isSecret: boolean): boolean {
    return validatePasswordSettings(password, isSecret);
  }

  generateRandomPassword() {
    return generateRandomPassword(10);
  }

  @proxify
  async createMeetingDirectly(
    meeting: RcVMeetingModel,
    { isAlertSuccess = true }: { isAlertSuccess?: boolean } = {},
  ) {
    try {
      this.store.dispatch({
        type: this.actionTypes.initCreating,
      });

      let meetingDetail: RcVideoAPI = pruneMeetingObject(meeting);

      if (this._showSaveAsDefault && meeting.saveAsDefault) {
        this.saveAsDefaultSetting(meeting);
      }

      if (!this.enableWaitingRoom) {
        meetingDetail = omit([RCV_WAITTING_ROOM_API_KEYS], meetingDetail);
      }

      const meetingResult = await this._client.service
        .platform()
        .post('/rcvideo/v1/bridges', meetingDetail);

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
          this._alert.success({
            message: meetingStatus.scheduledSuccess,
          });
        }, 50);
      }

      const newMeeting = await meetingResult.json();
      this.store.dispatch({
        type: this.actionTypes.created,
      });

      this.updateHasSettingsChanged(false);

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
      this.store.dispatch({
        type: this.actionTypes.resetCreating,
      });
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

  private async _getDialinNumbers(): Promise<string | RcVDialInNumberObj[]> {
    const result = await this._client.service
      .platform()
      .get('/rcvideo/v1/dial-in-numbers');
    const { phoneNumbers } = (await result.json()) as RcVDialInNumberGET;
    if (Array.isArray(phoneNumbers)) {
      const defaultPhoneNumber = find((obj) => obj.default, phoneNumbers);
      const countryDialinNumbers = filter(
        (obj) => obj?.country?.isoCode === this.country.isoCode,
        phoneNumbers,
      );

      if (
        this._enableHostCountryDialinNumbers &&
        countryDialinNumbers.length > 0
      ) {
        return countryDialinNumbers;
      }

      if (defaultPhoneNumber) {
        return defaultPhoneNumber.phoneNumber;
      }
    }
    return null;
  }

  private async _getPreferences(
    accountId = this.accountId,
    extensionId = this.extensionId,
  ): Promise<RcVPreferencesAPIResult> {
    const res = await this._client.service
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
      preferences[id] = value;
      settingLocks[id] = readOnly;
    });
    return { preferences, settingLocks };
  }

  @proxify
  async getExtensionInfo(extensionId: string) {
    if (Number(extensionId) === this.extensionId) {
      return this._extensionInfo.info;
    }
    return this._client.account().extension(extensionId).get();
  }

  private _updatePreference(preferences: Partial<RcVPreferencesGET>) {
    this.store.dispatch({
      type: this.actionTypes.updateMeetingPreferences,
      preferences,
    });
  }

  private async _saveSinglePreference(
    preferenceId: keyof RcVPreferencesGET,
    value: boolean,
  ): Promise<void> {
    return this._client.service.platform().send({
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
    meetingId: String,
    accountId = this.accountId,
    extensionId = this.extensionId,
  ) {
    const result = await this._client.service
      .platform()
      .get('/rcvideo/v1/bridges', {
        shortId: meetingId,
        accountId,
        extensionId,
      });
    const meeting = await result.json();
    return meeting;
  }

  @proxify
  async updateMeeting(
    meetingId: string,
    meeting: RcVMeetingModel,
    { isAlertSuccess = false }: { isAlertSuccess?: boolean } = {},
  ) {
    try {
      this.store.dispatch({
        type: this.actionTypes.initUpdating,
      });

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
      const meetingResult = await this._client.service.platform().send({
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
          this._alert.success({
            message: meetingStatus.updatedSuccess,
          });
        }, 50);
      }

      const newMeeting = await meetingResult.json();
      this.store.dispatch({
        type: this.actionTypes.updated,
      });

      this.updateHasSettingsChanged(false);

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
      this.store.dispatch({
        type: this.actionTypes.resetUpdating,
      });
      this._errorHandle(errors);
      return null;
    }
  }

  private _initMeetingSettings(usePersonalMeetingId: boolean) {
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

  updateHasSettingsChanged(isChanged: boolean) {
    this.store.dispatch({
      type: this.actionTypes.saveHasSettingChanged,
      isChanged,
    });
  }

  @proxify
  updateMeetingSettings(
    meeting: Partial<RcVMeetingModel>,
    patch: boolean = true,
  ) {
    let processedMeeting = meeting;
    if (this.enableWaitingRoom) {
      processedMeeting = {
        ...meeting,
        ...patchWaitingRoomRelated(
          {
            ...this.meeting,
            ...meeting,
          },
          this.transformedPreferences,
          true,
        ),
      };
    }
    this.store.dispatch({
      type: this.actionTypes.updateMeetingSettings,
      meeting: processedMeeting,
      patch,
    });
    this._comparePreferences();
  }

  private _comparePreferences() {
    this.store.dispatch({
      type: this.actionTypes.saveMeetingPreferencesState,
      isPreferencesChanged: comparePreferences(
        this.transformedPreferences,
        this.meeting,
      ),
    });
  }

  private async _errorHandle(errors: any) {
    if (errors instanceof MeetingErrors) {
      for (const error of errors.all) {
        this._alert.warning(error);
      }
    } else if (errors && errors.response) {
      const {
        errorCode,
        permissionName,
      } = await errors.response.clone().json();
      if (errorCode === 'InsufficientPermissions' && permissionName) {
        this._alert.danger({
          message: meetingStatus.insufficientPermissions,
          payload: {
            permissionName,
          },
        });
      } else if (
        !this._availabilityMonitor ||
        !(await this._availabilityMonitor.checkIfHAError(errors))
      ) {
        this._alert.danger({
          message: meetingStatus.internalError,
        });
      }
    }
  }

  get meeting(): RcVMeetingModel {
    return this.state.meeting;
  }

  get personalMeeting(): RcVideoAPI {
    return this._storage.getItem(this._personalVideoKey);
  }

  get country() {
    return this._extensionInfo.country;
  }

  get currentLocale() {
    return this._locale.currentLocale || DEFAULT_LOCALE;
  }

  get extensionName(): string {
    return this._extensionInfo.info && this._extensionInfo.info.name;
  }

  get extensionId(): number {
    return this._extensionInfo.info.id;
  }

  get accountId(): number {
    return this._accountInfo.id;
  }

  get brandName(): string {
    return this._brand.name;
  }

  get status() {
    return this.state.status;
  }

  // preferences directly from backend
  get preferences(): RcVPreferencesGET {
    return this.state.preferences;
  }

  get settingLocks(): RcVSettingLocksGET {
    return this.state.settingLocks;
  }

  @selector
  transformedPreferences: any = [
    () => this._isInstantMeeting,
    () => this.preferences,
    (isInstantMeeting: boolean, preferences: RcVPreferencesGET) => {
      return transformPreferences(preferences, isInstantMeeting);
    },
  ];

  @selector
  transformedSettingLocks: any = [
    () => this._isInstantMeeting,
    () => this.settingLocks,
    (isInstantMeeting: boolean, settingLocks: RcVSettingLocksGET) => {
      return transformSettingLocks(settingLocks, isInstantMeeting);
    },
  ];

  @selector
  personalVideoSetting: any = [
    () => this.initialVideoSetting,
    () => this.personalMeeting,
    () => this.transformedPreferences,
    () => this.transformedSettingLocks,
    (
      initialSetting: RcVMeetingModel,
      personalMeeting: RcVideoAPI,
      transformedPreferences: RcVPreferences,
      transformedSettingLocks: RcVSettingLocks,
    ) => {
      if (!personalMeeting) {
        return null;
      }
      const processedSettings = {
        ...initialSetting,
        ...personalMeeting,
        ...getLockedPreferences(
          transformedSettingLocks,
          transformedPreferences,
        ),
        meetingPassword:
          personalMeeting.meetingPassword || generateRandomPassword(10),
        isMeetingPasswordValid: true, // assume personal meeting password is valid
        id: personalMeeting.id,
        usePersonalMeetingId: true,
        settingLock: {
          ...transformedSettingLocks,
        },
      } as RcVMeetingModel;
      if (this.enableWaitingRoom) {
        return {
          ...processedSettings,
          ...patchWaitingRoomRelated(processedSettings, transformedPreferences),
        };
      }
      return processedSettings;
    },
  ];

  @selector
  defaultVideoSetting: any = [
    () => this.initialVideoSetting,
    () => {
      const savedSetting = this._showSaveAsDefault
        ? this.savedDefaultVideoSetting
        : null;
      return savedSetting;
    },
    () => this.transformedPreferences,
    () => this.transformedSettingLocks,
    (
      initialSetting: RcVMeetingModel,
      savedSetting: Partial<RcVMeetingModel>,
      transformedPreferences: RcVPreferences,
      transformedSettingLocks: RcVSettingLocks,
    ) => {
      return {
        ...initialSetting,
        ...savedSetting,
        ...transformedPreferences,
        meetingPassword: generateRandomPassword(10),
        isMeetingPasswordValid: true, // generated random password is valid
        id: null,
        usePersonalMeetingId: false,
        settingLock: {
          ...transformedSettingLocks,
        },
      } as RcVMeetingModel;
    },
  ];

  @selector
  initialVideoSetting: any = [
    () => {
      let extensionName = this.extensionName;
      if (this.currentUser?.extensionId !== `${this.extensionId}`) {
        extensionName = this.currentUser?.name;
      }
      return extensionName;
    },
    () => this.brandName,
    () => getInitializedStartTime(),
    () => this.currentUser,
    () => this.currentLocale,
    (
      extensionName: string,
      brandName: string,
      startTime: number,
      currentUser: RcvDelegator,
      currentLocale: string,
    ) => {
      const topic = getTopic(extensionName, brandName, currentLocale);
      return getDefaultVideoSettings({
        topic,
        startTime: new Date(startTime),
        accountId: currentUser.accountId,
        extensionId: currentUser.extensionId,
      });
    },
  ];

  get savedDefaultVideoSetting(): Partial<RcVMeetingModel> {
    return this._storage.getItem(this._defaultVideoSettingKey);
  }

  get isInitializing(): boolean {
    return this.state.videoStatus === videoStatus.initializing;
  }

  get isScheduling(): boolean {
    return this.state.videoStatus === videoStatus.creating;
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

  get isPreferencesChanged(): boolean {
    return this.state.isPreferencesChanged;
  }

  get hasSettingsChanged(): boolean {
    return this.state.hasSettingsChanged;
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

  @computed(({ state, loginUser }: RcVideo) => [state, loginUser])
  get delegators(): RcvDelegator[] {
    if (this.state.delegators.length === 0) {
      return [];
    }
    return [this.loginUser, ...this.state.delegators];
  }

  get currentUser(): RcvDelegator {
    return this.state.delegator || this.loginUser;
  }
}
