import { injectable } from '@ringcentral-integration/next-core';
import { filter, fromEvent, merge, switchMap, take } from 'rxjs';

import { ensureAudioSoundPermission } from './ensureAudioSoundPermission';

@injectable({
  name: 'EnsureAudio',
})
export class EnsureAudio {
  private audioSoundPermission = ensureAudioSoundPermission();

  /**
   * ensure audio sound permission when user interact with document
   */
  ensure() {
    if (global.document) {
      const events$ = merge(
        fromEvent(document, 'click'),
        fromEvent(document, 'keydown'),
      );

      events$
        .pipe(
          switchMap(() => this.audioSoundPermission.ensure()),
          filter(Boolean),
          take(1),
        )
        .subscribe();
    }
  }
}
