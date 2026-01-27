import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  delegate,
  fromWatchValue,
  injectable,
  RcModule,
  state,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import {
  downloadFile,
  getBlobURL,
  getFilenameWithNoUrlParams,
} from '@ringcentral-integration/utils';
import { tap, filter } from 'rxjs';

import type { VoicemailAudioStatus } from '../../components';
import { Conversations } from '../Conversations';
import { MessageStore } from '../MessageStore';

@injectable({
  name: 'VoicemailAudio',
})
export class VoicemailAudio extends RcModule {
  @state
  audioMap: Record<string, VoicemailAudioStatus> = {};

  @action
  removeAudio(voicemailIds: string | string[]) {
    const ids = Array.isArray(voicemailIds) ? voicemailIds : [voicemailIds];

    ids.forEach((id) => {
      const status = this.audioMap[id];
      if (status?.blobUrl) URL.revokeObjectURL(status.blobUrl);
      delete this.audioMap[id];
    });
  }

  constructor(
    private _messageStore: MessageStore,
    private _auth: Auth,
    private _conversations: Conversations,
  ) {
    super();
  }

  override onInitOnce() {
    fromWatchValue(this, () => this._conversations.allConversationsMap)
      .pipe(
        filter(() => Object.keys(this.audioMap).length > 0),
        tap((conversationsMap) => {
          // Collect IDs to remove using reduce
          const idsToRemove = Object.keys(this.audioMap).reduce<string[]>(
            (acc, voicemailId) => {
              if (!conversationsMap.get(voicemailId)) {
                acc.push(voicemailId);
              }
              return acc;
            },
            [],
          );

          // Remove collected IDs at once
          if (idsToRemove.length > 0) {
            this.removeAudio(idsToRemove);
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();

    this._auth.afterLogout$
      .pipe(
        tap(() => {
          this.removeAudio(Object.keys(this.audioMap));
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  @action
  _setAudioStatus(voicemailId: string, status: VoicemailAudioStatus) {
    this.audioMap[voicemailId] = status;
  }

  @action
  _updateAudioStatus(voicemailId: string, status: VoicemailAudioStatus) {
    this.audioMap[voicemailId] = {
      ...this.audioMap[voicemailId],
      ...status,
    };
  }

  @delegate('server')
  async setAudioStatus(voicemailId: string, status: VoicemailAudioStatus) {
    this._setAudioStatus(voicemailId, status);
  }

  getAudioStatus(voicemailId: string): VoicemailAudioStatus | undefined {
    return this.audioMap[voicemailId];
  }

  @delegate('server')
  async loadAudio(voicemailId: string, uri: string) {
    try {
      this._messageStore.readMessages(voicemailId);

      const blobUrl = await getBlobURL(uri);
      this._updateAudioStatus(voicemailId, {
        blobUrl,
      });

      return blobUrl;
    } catch (error) {
      this.logger.error('loadAudio error', error);
      this._updateAudioStatus(voicemailId, {
        loading: false,
        isNetworkError: true,
      });

      return undefined;
    }
  }

  @delegate('server')
  async getBlobUrl(voicemailId: string, uri: string) {
    const blobUrl = this.getAudioStatus(voicemailId)?.blobUrl;
    if (blobUrl) return blobUrl;

    return uri ? await this.loadAudio(voicemailId, uri) : undefined;
  }

  async download(voicemailId?: string, uri?: string) {
    this._messageStore.readMessages(voicemailId);

    if (voicemailId && uri) {
      const blobUrl = await this.getBlobUrl(voicemailId, uri);

      if (blobUrl) {
        downloadFile(blobUrl, getFilenameWithNoUrlParams(uri));
        return;
      }
    }

    this.logger.error('Voicemail uri is empty:', voicemailId);
  }
}
