import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { getInitializedStartTime } from '@ringcentral-integration/commons/helpers/meetingHelper';
import {
  renameTurkey,
  renameTurkeyCountry,
} from '@ringcentral-integration/commons/helpers/renameTurkey';
import type { IMeeting } from '@ringcentral-integration/commons/interfaces/Meeting.interface';
import type {
  RcVDialInNumberGET,
  RcVDialInNumberObj,
  RcVideoAPI,
  RcVideoV2Api,
  RcvInvitationRequest,
  RcVMeetingModel,
  RcVPreferenceDataItem,
  RcVPreferences,
  RcVPreferencesAPIResult,
  RcVPreferencesGET,
  RcVSettingLocks,
  RcVSettingLocksGET,
} from '@ringcentral-integration/commons/interfaces/Rcv.model';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { DEFAULT_LOCALE } from '@ringcentral-integration/i18n';
import {
  AccountInfo,
  Analytics,
  AppFeatures,
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
import { RcvMainParams } from '@ringcentral-integration/widgets/lib/MeetingCalendarHelper/index.interface';
import { filter, find } from 'ramda';

import { MeetingErrors } from '../Meeting';
import { VideoConfiguration } from '../VideoConfiguration';

import type {
  InvitationBridgesResponse,
  RcvDelegator,
  RcVideoOptions,
  RcVideoResponse,
} from './RcVideo.interface';
import {
  ASSISTED_USERS_MYSELF,
  INVITATION_BOUNDARY_REGEX,
  RCV_E2EE_API_KEYS,
  RCV_WAITING_ROOM_API_KEYS,
} from './constants';
import { t } from './i18n';
import {
  assignObject,
  comparePreferences,
  formatRcvInvitationRequestData,
  formatRcvInvitationRequestDataV2,
  generateRandomPassword,
  getDefaultVideoSettings,
  getDirtyPreferences,
  getLockedPreferences,
  getTopic,
  patchWaitingRoomRelated,
  pruneMeetingObject,
  RCV_E2EE_DEFAULT_SECURITY_OPTIONS,
  RCV_PREFERENCES_IDS,
  RcVideoTypes,
  reversePreferences,
  transformPreferences,
  transformSettingLocks,
  transformV1MeetingToV2,
  transformV2ResponseToV1,
  updateLocalPreferences,
  validatePasswordSettings,
} from './videoHelper';
import { videoStatus } from './videoStatus';

@injectable({
  name: 'RcVideo',
})
export class RcVideo extends RcModule implements IMeeting {
  protected _showSaveAsDefault: boolean;
  protected _isInstantMeeting: boolean;
  protected _enableE2EE: boolean;
  protected _enableInvitationBridgesApi: boolean;
  protected _enableWaitingRoom: boolean;
  protected _enablePersonalMeeting: boolean;
  protected _enableScheduleOnBehalf: boolean;
  protected _enableHostCountryDialinNumbers: boolean;
  protected _enableReloadAfterSchedule: boolean;
  protected _enableInvitationApi: boolean;
  protected _enableInvitationApiFailedToast?: boolean;
  protected _enableV2Api: boolean;
  protected _currentLocale: string;
  private _createMeetingPromise: ReturnType<
    RcVideo['createMeetingDirectly']
  > | null = null;

  constructor(
    protected _toast: Toast,
    protected _client: Client,
    protected _brand: Brand,
    protected _storage: StoragePlugin,
    protected _accountInfo: AccountInfo,
    protected _extensionInfo: ExtensionInfo,
    protected _videoConfiguration: VideoConfiguration,
    protected _locale: Locale,
    protected _appFeatures: AppFeatures,
    @optional() protected _analytics: Analytics,
    @optional()
    protected _availabilityMonitor?: AvailabilityMonitor,
    @optional('RcVideoOptions') protected _rcVideoOptions?: RcVideoOptions,
  ) {
    super();
    this._storage.enable(this);

    this._enableInvitationApi =
      this._rcVideoOptions?.enableInvitationApi ?? false;
    this._enableInvitationApiFailedToast =
      this._rcVideoOptions?.enableInvitationApiFailedToast ?? false;
    this._enableInvitationBridgesApi =
      this._rcVideoOptions?.enableInvitationBridgesApi ?? false;
    this._showSaveAsDefault = this._rcVideoOptions?.showSaveAsDefault ?? false;
    this._isInstantMeeting = this._rcVideoOptions?.isInstantMeeting ?? false;
    this._enableE2EE = this._rcVideoOptions?.enableE2EE ?? false;
    this._enableWaitingRoom = this._rcVideoOptions?.enableWaitingRoom ?? false;
    this._enablePersonalMeeting =
      this._rcVideoOptions?.enablePersonalMeeting ?? false;
    this._enableScheduleOnBehalf =
      this._rcVideoOptions?.enableScheduleOnBehalf ?? false;
    this._enableHostCountryDialinNumbers =
      this._rcVideoOptions?.enableHostCountryDialinNumbers ?? false;
    this._enableReloadAfterSchedule =
      this._rcVideoOptions?.enableReloadAfterSchedule ?? true;
    this._enableV2Api = this._rcVideoOptions?.enableV2Api ?? false;
    this._currentLocale = this._locale?.currentLocale ?? DEFAULT_LOCALE;
  }

  @storage
  @state
  personalVideo: Partial<RcVideoAPI> | null = null;

  // when migrate to rcv v2, computed defaultVideoSetting has conflict with storage key 'defaultVideoSetting'
  // rcv save as default toggle has not opened yet, so change the key into 'savedDefaultSetting'
  @storage
  @state
  savedDefaultSetting: Partial<RcVMeetingModel> = {};

  @state
  meeting: Partial<RcVMeetingModel> | null = null;

  @state
  videoStatus: ObjectMapValue<typeof videoStatus> = videoStatus.idle;

  @state
  preferences: RcVPreferencesGET = {};

  @state
  isPreferencesChanged = false;

  @state
  settingLocks: RcVSettingLocksGET = {};

  @state
  delegator: RcvDelegator | null = null;

  @state
  delegators: RcvDelegator[] = [];

  @state
  hasSettingsChanged = false;

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
    patch = true,
  ) {
    this.meeting = patch
      ? {
          ...this.meeting,
          ...info,
        }
      : (info as RcVMeetingModel);
  }

  override _shouldInit() {
    return super._shouldInit() && this._videoConfiguration.isRCV;
  }

  override _shouldReset() {
    return (
      super._shouldReset() || (this.ready && !this._videoConfiguration.isRCV)
    );
  }

  @track((that: RcVideo, status: string) => {
    if (status !== videoStatus.creating) return;
    const target = that._analytics!.getTrackTarget()!;
    if (target) {
      return [
        trackEvents.clickMeetingSchedulePage,
        { router: target.router, 'Meeting Type': 'RCV' },
      ];
    }
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

  @delegate('server')
  override async onInit() {
    await this._init();
  }

  @delegate('server')
  async savePersonalMeeting(settings: Partial<RcVideoAPI>) {
    await this._savePersonalMeeting(settings);
  }
  async _init() {
    this.updateDelegator(this.loginUser);
    await Promise.all([this._initMeeting(), this.initScheduleFor()]);
  }

  /**
   * Init basic meeting information
   * also load meeting setting from previous one.
   */
  @delegate('server')
  async init() {
    await this._init();
  }

  @delegate('server')
  async reload() {
    await this._init();
  }

  @delegate('server')
  async switchUsePersonalMeetingId(usePersonalMeetingId: boolean) {
    const currentName = this.meeting?.name;

    this._initMeetingSettings(usePersonalMeetingId);

    if (currentName !== undefined && currentName !== null) {
      this.updateMeetingSettings({
        name: currentName,
      });
    }
  }

  @delegate('server')
  async updateDelegator(delegator: RcvDelegator) {
    if (this._enableScheduleOnBehalf) {
      this._updateDelegator(delegator);
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
    const delegator: RcvDelegator | undefined = find(
      (user: RcvDelegator) => user.extensionId === hostId,
      this.delegators,
    );

    if (!delegator) {
      return;
    }

    this.updateDelegator(delegator);

    await this._initMeeting(Number(delegator.extensionId));
  }

  async initScheduleFor() {
    if (this._enableScheduleOnBehalf) {
      await this._initDelegators();
    }
  }

  async _initMeeting(extensionId = this.extensionId) {
    this._updateVideoStatus(videoStatus.initializing);

    await Promise.all([
      this._initPersonalMeeting(this.accountId, extensionId),
      this.initPreferences(),
    ]);

    this._initMeetingSettings(false);

    this._updateVideoStatus(videoStatus.initialized);
  }

  async initPreferences() {
    try {
      const { preferences, settingLocks } = await this._getPreferences(
        this.accountId,
        this.extensionId,
      );
      // TODO: Remove the next line after rcv implement ui to manage password_instant
      preferences.password_instant = false;

      this._updatePreference(preferences);
      this._updateMeetingSettingLocks(settingLocks);
    } catch (errors) {
      this.logger.log('preference error:', errors);
      // this._errorHandle(errors);
    }
  }

  async _initPersonalMeeting(
    accountId: number = this.accountId,
    extensionId: number = this.extensionId,
  ) {
    if (!this._enablePersonalMeeting) {
      return;
    }
    try {
      if (this._enableV2Api) {
        const meetingResult = await this._client.service
          .platform()
          .get(
            `/rcvideo/v2/account/${accountId}/extension/${extensionId}/bridges/default`,
          );
        const meeting = (await meetingResult.json()) as RcVideoV2Api;
        this._savePersonalMeeting(transformV2ResponseToV1(meeting));
      } else {
        const meetingResult = await this._client.service
          .platform()
          .get('/rcvideo/v1/bridges', {
            default: true,
            accountId,
            extensionId,
          });
        const meeting = (await meetingResult.json()) as RcVideoAPI;
        this._savePersonalMeeting(meeting);
      }
    } catch (errors) {
      this.logger.error('fetch personal meeting error:', errors);
      if (this.personalVideo && Object.keys(this.personalVideo).length > 0) {
        this._resetPersonalMeeting();
      }
    }
  }

  protected async _initDelegators() {
    try {
      const result = await this._client.service
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
    const updateInfo: Partial<RcVMeetingModel & { _saved: boolean }> = {
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

  pruneMeetingObject(meeting: RcVMeetingModel) {
    return pruneMeetingObject(meeting, [
      {
        condition: meeting.isMeetingSecret,
        key: 'meetingPassword',
      },
      {
        condition: this.enableWaitingRoom || !!meeting.e2ee,
        key: RCV_WAITING_ROOM_API_KEYS,
      },
      {
        condition: this.enableE2EE && !meeting.usePersonalMeetingId,
        key: RCV_E2EE_API_KEYS,
      },
    ]);
  }

  @delegate('server')
  async createMeetingDirectly(
    meeting: RcVMeetingModel,
    { isAlertSuccess = true }: { isAlertSuccess?: boolean } = {},
  ) {
    try {
      this._updateVideoStatus(videoStatus.creating);

      if (this._showSaveAsDefault && meeting.saveAsDefault) {
        this.saveAsDefaultSetting(meeting);
      }

      const meetingDetail = this.pruneMeetingObject(meeting);

      // when meeting is rcv pmi, use pmi default name
      if (meeting?.usePersonalMeetingId) {
        meetingDetail.name = t('rcvPmiMeetingTitle', {
          extensionName: this.extensionName as string,
        });
      }

      const [newMeeting, dialInNumber, extensionInfo] = await Promise.all([
        this._postBridges(meetingDetail, meeting.usePersonalMeetingId),
        this._getDialinNumbers(),
        this.getExtensionInfo(this.currentUser.extensionId),
      ]);
      this.updateMeetingSettings({
        ...meeting,
        saveAsDefault: false,
      });

      // After Create
      const invitationInfo = await this.getMeetingInvitation({
        hostName: extensionInfo.name!,
        shortId: newMeeting.shortId,
        id: newMeeting.id,
        personalMeetingName: newMeeting.personalMeetingName,
        e2ee: newMeeting.e2ee,
        isMeetingSecret: newMeeting.isMeetingSecret,
        meetingPassword: newMeeting.meetingPassword,
        meetingPasswordPSTN: newMeeting.meetingPasswordPSTN,
        meetingPasswordMasked: newMeeting.meetingPasswordMasked,
        joinUri: newMeeting.joinUri || '',
        dialInNumbers: dialInNumber as RcVDialInNumberObj[],
        currentLocale: this.currentLocale,
        brandName: this._brand.name,
        brandId: this._brand.id,
        isSIPAvailable: this._appFeatures.hasRoomConnectorBeta,
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
        this._toast.success({
          message: t('scheduledSuccess'),
        });
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
      } as RcvMainParams;
    } catch (errors) {
      this.logger.error('failed to create rcv:', errors);
      this._updateVideoStatus(videoStatus.idle);
      this._errorHandle(errors);
      return null;
    }
  }

  @delegate('server')
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

  async startMeeting(meeting: RcVMeetingModel, isAlertSuccess = true) {
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

  @delegate('server')
  async getRcvInvitationRequestData(invitationRequest: RcvInvitationRequest) {
    const { id: bridgeId, meetingPasswordMasked = '' } = invitationRequest;
    try {
      const response = await this._client.service
        .platform()
        .get(
          `/rcvideo/v1/invitation/bridges/${bridgeId}?countryCode=${
            this.country.isoCode
          }${
            meetingPasswordMasked ? `&password=${meetingPasswordMasked}` : ''
          }`,
        );
      const invitationParams: InvitationBridgesResponse = await response.json();
      return formatRcvInvitationRequestDataV2({
        ...invitationRequest,
        phoneNumbers: invitationParams.phoneNumbers,
      });
    } catch (ex) {
      this.logger.warn('failed to get invitation params', ex);
      return formatRcvInvitationRequestData(invitationRequest);
    }
  }

  @delegate('server')
  async getMeetingInvitation(
    invitationRequest: RcvInvitationRequest,
  ): Promise<string | null> {
    if (!this._enableInvitationApi) {
      return null;
    }

    try {
      const data = this._enableInvitationBridgesApi
        ? await this.getRcvInvitationRequestData(invitationRequest)
        : formatRcvInvitationRequestData(invitationRequest);

      const response = await this._client.service
        .platform()
        .post('/restapi/v1.0/uns/render-document', data);
      const blobData = await response.text();
      const invitation = blobData.replace(INVITATION_BOUNDARY_REGEX, '');
      return renameTurkey(invitation);
    } catch (ex) {
      this.logger.warn('failed to get invitation', ex);
      if (this._enableInvitationApiFailedToast) {
        this._toast.danger({
          message: t('renderInviteError'),
        });
      }
      return null;
    }
  }

  @delegate('server')
  protected async _postBridges(
    meetingDetail: RcVideoAPI,
    usePersonalMeetingId: boolean,
  ) {
    if (this._enableV2Api) {
      const postData = transformV1MeetingToV2(
        meetingDetail,
        usePersonalMeetingId,
        {
          enableWaitingRoom: this.enableWaitingRoom,
          enableE2EE: this.enableE2EE,
        },
      );
      const result = await this._client.service
        .platform()
        .post(
          `/rcvideo/v2/account/${meetingDetail.accountId}/extension/${meetingDetail.extensionId}/bridges`,
          postData,
        );
      const resp = await result.json();
      return transformV2ResponseToV1(resp);
    } else {
      const result = await this._client.service
        .platform()
        .post('/rcvideo/v1/bridges', meetingDetail);
      return result.json();
    }
  }

  @delegate('server')
  async patchBridges(
    meetingId: string,
    meetingDetail: RcVideoAPI,
    usePersonalMeetingId: boolean,
  ) {
    if (this._enableV2Api) {
      const body = transformV1MeetingToV2(meetingDetail, usePersonalMeetingId, {
        enableWaitingRoom: this.enableWaitingRoom,
        enableE2EE: this.enableE2EE,
      });
      const result = await this._client.service.platform().send({
        method: 'PATCH',
        url: `/rcvideo/v2/bridges/${meetingId}`,
        body,
      });
      const resp = await result.json();
      return transformV2ResponseToV1(resp);
    } else {
      const result = await this._client.service.platform().send({
        method: 'PATCH',
        url: `/rcvideo/v1/bridges/${meetingId}`,
        body: meetingDetail,
      });
      return result.json();
    }
  }

  @delegate('server')
  protected async _getDialinNumbers(): Promise<string | RcVDialInNumberObj[]> {
    const result = await this._client.service
      .platform()
      .get('/rcvideo/v1/dial-in-numbers');
    const data = (await result.json()) as RcVDialInNumberGET;
    const phoneNumbers = data?.phoneNumbers;
    if (Array.isArray(phoneNumbers)) {
      phoneNumbers.forEach((item) => {
        renameTurkeyCountry(item.country);
      });
      const defaultPhoneNumber = find((obj) => obj.default, phoneNumbers);

      if (this._enableHostCountryDialinNumbers) {
        const countryDialinNumbers = filter(
          (obj) => obj?.country?.isoCode === this.country.isoCode,
          phoneNumbers,
        );
        if (countryDialinNumbers.length > 0) {
          return countryDialinNumbers;
        }
        return [defaultPhoneNumber!];
      }

      return defaultPhoneNumber!.phoneNumber;
    }
    return [];
  }

  // TODO: should fix that route if still need
  @delegate('server')
  protected async _getPreferences(
    accountId: number = this.accountId,
    extensionId: number = this.extensionId,
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
      assignObject(preferences, value, id);
      assignObject(settingLocks, readOnly, id);
    });
    return { preferences, settingLocks };
  }

  @delegate('server')
  async getExtensionInfo(extensionId: string) {
    if (Number(extensionId) === this.extensionId) {
      return this._extensionInfo.info;
    }
    return this._client.account().extension(extensionId).get();
  }

  protected _updatePreference(preferences: Partial<RcVPreferencesGET>) {
    this._updateMeetingPreferences(preferences);
  }

  protected async _saveSinglePreference(
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
   * Save preference changes to server and optionally update local state
   * @param meeting meeting object containing preference fields
   * @param isOverwrite if true, update local preferences after successful save
   * @returns Promise<boolean> true if successful, false if failed
   */
  async savePreferencesChanges(
    meeting: Partial<RcVMeetingModel>,
    isOverwrite = false,
  ): Promise<boolean> {
    try {
      const preferencesPayload = reversePreferences(
        meeting,
        this._isInstantMeeting,
      );
      const dirtyPreferences = getDirtyPreferences(
        preferencesPayload,
        this.preferences,
        this.settingLocks,
      );

      await this._savePreferencesToServer(dirtyPreferences);

      if (isOverwrite) {
        const savedPreferences = updateLocalPreferences(
          dirtyPreferences,
          this.preferences,
        );
        this._updatePreference(savedPreferences);
      }

      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  private async _savePreferencesToServer(
    dirtyPreferences: [keyof RcVPreferencesGET, boolean][],
  ) {
    await Promise.all(
      dirtyPreferences.map(([preferenceId, newValue]) => {
        return this._saveSinglePreference(preferenceId, newValue);
      }),
    );
  }

  @delegate('server')
  async getMeeting(
    shortId: string,
    accountId: number = this.accountId,
    extensionId: number = this.extensionId,
  ): Promise<RcVideoAPI> {
    if (this._enableV2Api) {
      const result = await this._client.service
        .platform()
        .get(`/rcvideo/v2/bridges/pin/web/${shortId}`);
      const meeting = await result.json();
      return transformV2ResponseToV1(meeting) as RcVideoAPI;
    } else {
      const result = await this._client.service
        .platform()
        .get('/rcvideo/v1/bridges', {
          shortId,
          accountId,
          extensionId,
        });
      const meeting = (await result.json()) as RcVideoAPI;
      return meeting;
    }
  }

  @delegate('server')
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

      const meetingDetail = this.pruneMeetingObject(meeting);

      const [newMeeting, dialInNumber, extensionInfo] = await Promise.all([
        this.patchBridges(
          meeting.id!,
          meetingDetail,
          meeting.usePersonalMeetingId,
        ),
        this._getDialinNumbers(),
        this.getExtensionInfo(this.currentUser.extensionId),
      ]);

      const invitationInfo = await this.getMeetingInvitation({
        hostName: extensionInfo.name!,
        shortId: newMeeting.shortId,
        id: newMeeting.id,
        personalMeetingName: newMeeting.personalMeetingName,
        e2ee: newMeeting.e2ee,
        isMeetingSecret: newMeeting.isMeetingSecret,
        meetingPassword: newMeeting.meetingPassword,
        meetingPasswordPSTN: newMeeting.meetingPasswordPSTN,
        meetingPasswordMasked: newMeeting.meetingPasswordMasked,
        joinUri: newMeeting.joinUri || '',
        dialInNumbers: dialInNumber as RcVDialInNumberObj[],
        currentLocale: this.currentLocale,
        brandName: this._brand.name,
        brandId: this._brand.id,
        isSIPAvailable: this._appFeatures.hasRoomConnectorBeta,
      });

      if (meeting.saveAsDefault) {
        await this.savePreferencesChanges(meeting, true);
      }

      if (isAlertSuccess) {
        setTimeout(() => {
          this._toast.success({
            message: t('updatedSuccess'),
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
      this.logger.error('updateMeeting errors:', errors);
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

  @delegate('server')
  async turnOnE2ee() {
    this.updateMeetingSettings({
      e2ee: true,
      ...RCV_E2EE_DEFAULT_SECURITY_OPTIONS,
      // if jbh is locked, do not change its value
      allowJoinBeforeHost: this.meeting!.settingLock!.allowJoinBeforeHost
        ? this.meeting!.allowJoinBeforeHost
        : RCV_E2EE_DEFAULT_SECURITY_OPTIONS.allowJoinBeforeHost,
    });
  }

  @delegate('server')
  async updateMeetingSettings(meeting: Partial<RcVMeetingModel>, patch = true) {
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
          processedMeeting.meetingPassword ?? this.meeting?.meetingPassword!,
          processedMeeting.isMeetingSecret ?? this.meeting?.isMeetingSecret!,
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
        this._toast.warning(error);
      }
    } else if (errors && errors.response) {
      const { errorCode, permissionName } = await errors.response
        .clone()
        .json();
      if (errorCode === 'InsufficientPermissions' && permissionName) {
        this._toast.danger({
          message: t('insufficientPermissions', {
            permissionName,
            application: this._brand.appName as string,
          }),
        });
      } else if (
        !this._availabilityMonitor ||
        !(await this._availabilityMonitor.checkIfHAError(errors))
      ) {
        this._toast.danger({
          message: t('internalError'),
        });
      }
    } else {
      this.logger.log('errors:', errors);
      this._toast.danger({ message: t('internalError') });
    }
  }

  get personalMeeting(): Partial<RcVideoAPI> | null {
    return this._enablePersonalMeeting ? this.personalVideo : null;
  }

  get savedDefaultVideoSetting(): Partial<RcVMeetingModel> | null {
    return this._showSaveAsDefault ? this.savedDefaultSetting : null;
  }

  get country() {
    return this._extensionInfo.country;
  }

  @computed((that: RcVideo) => [that.currentUser])
  get extensionName() {
    let extensionName = this._extensionInfo.info?.name;
    if (this.currentUser?.extensionId !== `${this.extensionId}`) {
      extensionName = this.currentUser?.name;
    }
    return extensionName;
  }

  get extensionId(): number {
    return this._extensionInfo.info.id!;
  }

  get accountId(): number {
    return this._accountInfo.id!;
  }

  get brandName(): string {
    return this._brand.name;
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

  // will follow dynamic brand config
  get enableE2EE() {
    // TODO: fix type
    // @ts-ignore
    return this._brand.brandConfig?.enableE2EE ?? this._enableE2EE;
  }

  get enableScheduleOnBehalf() {
    return this._enableScheduleOnBehalf;
  }

  get isInstantMeeting(): boolean {
    return this._isInstantMeeting;
  }

  get enableV2Api(): boolean {
    return this._enableV2Api;
  }

  @computed((that: RcVideo) => [that._locale.currentLocale])
  get currentLocale() {
    return this._locale.currentLocale || DEFAULT_LOCALE;
  }

  @computed(({ preferences, isInstantMeeting }: RcVideo) => [
    preferences,
    isInstantMeeting,
  ])
  get transformedPreferences(): Partial<RcVPreferences> {
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
      personalVideo,
      initialVideoSetting,
      transformedPreferences,
      transformedSettingLocks,
    }: RcVideo) => [
      personalMeeting,
      personalVideo,
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

  @computed((that: RcVideo) => [
    that.currentUser,
    that.extensionName,
    that._brand.shortName,
    that._brand.brandConfig.rcvMeetingTopic,
    that._brand.brandConfig.rcvProductName,
  ])
  get defaultTopic() {
    return getTopic({
      extensionName: this.extensionName!,
      brandName: this.brandName,
      shortName: this._brand.shortName as string,
      rcvMeetingTopic: this._brand.brandConfig.rcvMeetingTopic as string,
      rcvProductName: this._brand.brandConfig.rcvProductName as string,
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
}
