import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
} from '@ringcentral-integration/core';

import { trackEvents } from '../../enums/trackEvents';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import type {
  AudioInfo,
  Deps,
  RingtoneItem,
} from './RingtoneConfiguration.interface';
import { DEFAULT_RINGTONE_LIST, RINGS_TYPE } from './const';
import { getFileNameWithoutExt } from './helper';

@Module({
  name: 'RingtoneConfiguration',
  deps: ['Storage', 'AudioSettings', 'Webphone'],
})
export class RingtoneConfiguration extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
      storageKey: 'RingtoneConfiguration',
      enableCache: true,
    });
  }

  override onInit() {
    this.updateIncomingRingtone();
  }

  @storage
  @state
  selectedRingtoneId: string = this.defaultRingtoneList[0].id;

  @storage
  @state
  customRingtoneList: RingtoneItem[] = [];

  @action
  private _setSelectedRingtoneId(id: string) {
    this.selectedRingtoneId = id;
  }

  @proxify
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
  @proxify
  async uploadCustomRingtone(ringtone: RingtoneItem) {
    this._pushCustomRingtone(ringtone);
  }

  @track(trackEvents.deleteRingtone)
  @proxify
  async removeCustomRingtone(id: string) {
    this._removeCustomRingtone(id);
  }

  @proxify
  async updateIncomingRingtone() {
    if (
      this.selectedRingtoneAudio &&
      this.selectedRingtoneAudio.dataUrl !== this._deps.webphone.incomingAudio
    ) {
      this._deps.webphone.setIncomingAudio(this.selectedRingtoneAudio);
    }
  }

  @computed((that: RingtoneConfiguration) => [
    that.fullRingtoneList,
    that.selectedRingtoneId,
  ])
  get selectedRingtoneAudio(): AudioInfo | null {
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
      this._deps.ringtoneConfigurationOptions?.defaultRingtoneList ??
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
    return (
      this._deps.ringtoneConfigurationOptions?.enableCustomRingtone ?? true
    );
  }
}
