import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
import { track } from '@ringcentral-integration/micro-auth/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  delegate,
  injectable,
  optional,
  RcModule,
  state,
  StoragePlugin,
  userStorage,
  computed,
} from '@ringcentral-integration/next-core';

import { Webphone } from '../Webphone';

import type {
  AudioInfo,
  RingtoneConfigurationOptions,
  RingtoneItem,
} from './RingtoneConfiguration.interface';
import {
  DEFAULT_RINGTONE_LIST,
  MAX_CUSTOM_RINGTONE_COUNT,
  RINGS_TYPE,
} from './const';
import { getFileNameWithoutExt } from './helper';
import { t, type I18nKey } from './i18n';

@injectable({
  name: 'RingtoneConfiguration',
})
export class RingtoneConfiguration extends RcModule {
  constructor(
    protected _webphone: Webphone,
    protected _storage: StoragePlugin,
    protected _toast: Toast,
    @optional('RingtoneConfigurationOptions')
    protected _ringtoneConfigurationOptions?: RingtoneConfigurationOptions,
  ) {
    super();
    this._storage.enable(this);
  }

  @delegate('server')
  override async onInit() {
    this.updateIncomingRingtone();
  }

  @userStorage
  @state
  selectedRingtoneId: string = this.defaultRingtoneList[0].id;

  @userStorage
  @state
  customRingtoneList: RingtoneItem[] = [];

  @action
  private _setSelectedRingtoneId(id: string) {
    this.selectedRingtoneId = id;
  }

  @delegate('server')
  async setSelectedRingtoneId(id: string) {
    this._setSelectedRingtoneId(id);
  }

  @action
  private _pushCustomRingtone(ringtone: RingtoneItem) {
    this.customRingtoneList.push(ringtone);
  }

  @action
  private _removeCustomRingtone(id: string) {
    this.customRingtoneList = this.customRingtoneList.filter(
      (ringtone) => ringtone.id !== id,
    );
  }

  @track(trackEvents.uploadRingtone)
  @delegate('server')
  async uploadCustomRingtone(ringtone: RingtoneItem, showAlert?: boolean) {
    this._pushCustomRingtone(ringtone);
    if (showAlert) {
      this._toast.success({
        message: t('ringtoneAdded'),
        allowDuplicates: false,
        group: this.identifier,
      });
    }
  }

  @track(trackEvents.deleteRingtone)
  @delegate('server')
  async removeCustomRingtone(id: string) {
    const hasCustomRingtone = this.customRingtoneList.find(
      (ringtone) => ringtone.id === id,
    );
    if (!id || !hasCustomRingtone) {
      this.showDangerAlert(audioSettingsErrors.deleteRingtoneFailed);
    }
    this._removeCustomRingtone(id);
    // if the remove one the selected ringtone, set the first default ringtone as selected
    if (id === this.selectedRingtoneId) {
      this.setSelectedRingtoneId(this.defaultRingtoneList[0].id as string);
      this.updateIncomingRingtone();
    }
  }

  @delegate('server')
  async updateIncomingRingtone() {
    const selectedRingtoneAudio = this.getSelectedRingtoneAudio();
    if (
      selectedRingtoneAudio &&
      selectedRingtoneAudio.dataUrl !== this._webphone.incomingAudio
    ) {
      this._webphone.setIncomingAudioIntoStorage(selectedRingtoneAudio);
      this._webphone.loadClientAudio();
    }
  }

  @delegate('server')
  async showDangerAlert(i18nKey: I18nKey, ttl?: number) {
    this._toast.danger({
      message: t(i18nKey),
      allowDuplicates: false,
      group: this.identifier,
      ttl,
    });
  }

  getSelectedRingtoneAudio(): AudioInfo | null {
    const ringtone = this.fullRingtoneList.find(
      (ringtone) => ringtone.id === this.selectedRingtoneId,
    );
    if (!ringtone?.url) {
      if (ringtone?.type === 'default' && ringtone?.id === RINGS_TYPE.Off) {
        return {
          fileName: RINGS_TYPE.Off,
          dataUrl: '',
        };
      }
      return null;
    }
    return {
      fileName: getFileNameWithoutExt(ringtone.name),
      dataUrl: ringtone.url,
    };
  }

  get defaultRingtoneList(): RingtoneItem[] {
    return (
      this._ringtoneConfigurationOptions?.defaultRingtoneList ??
      DEFAULT_RINGTONE_LIST
    ).map((item) => ({
      ...item,
      type: 'default',
      name: item.id,
    }));
  }

  get customRingtoneSortedList() {
    return this.customRingtoneList.sort((a, b) => {
      const nameA = a.name!.toLowerCase();
      const nameB = b.name!.toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  get fullRingtoneList() {
    return [...this.customRingtoneSortedList, ...this.defaultRingtoneList];
  }

  get enableCustomRingtone() {
    return this._ringtoneConfigurationOptions?.enableCustomRingtone ?? true;
  }

  @computed((that: RingtoneConfiguration) => [
    that.enableCustomRingtone,
    that.customRingtoneList,
  ])
  get isUploadRingtoneDisabled() {
    return (
      this.enableCustomRingtone &&
      this.customRingtoneList?.length >= MAX_CUSTOM_RINGTONE_COUNT
    );
  }
}
