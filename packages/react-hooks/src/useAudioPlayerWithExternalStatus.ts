import {
  useAudio,
  useEventCallback,
  useEventListener,
  useSleep,
} from '@ringcentral/spring-ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useUnmount } from 'react-use';

import { useAsyncState } from './useAsyncState';

export interface VoicemailAudioStatus {
  /**
   * when the data url is ready, cache url
   */
  blobUrl?: string;
  isPlaying?: boolean;
  currentTime?: number;
  loading?: boolean;
  /**
   * Duration in seconds
   */
  duration?: number;
  isNetworkError?: boolean;
}

export type UseAudioPlayerWithExternalStatusOptions = {
  /**
   * Audio uri
   */
  uri: string;
  /**
   * Duration in `seconds` from server before the audio is loaded
   */
  duration?: number;
  /**
   * the status of the audio
   */
  status?: VoicemailAudioStatus;
  /**
   * Callback when the status of the audio is changed
   */
  onStatusChange: (status: VoicemailAudioStatus) => void;
  /**
   * By default will use `uri` to load audio,
   *
   * if set `loadSourceExternally` to `true`, that will not load that inside this component
   * will use `blobUrl` from `status` to load audio
   */
  loadSourceExternally?: boolean;
};

/**
 * player which support multiple instances
 *
 * with same `audioStatus` will only one instance can play at the same time
 */
export const useAudioPlayerWithExternalStatus = ({
  uri,
  duration: durationProp,
  status: audioStatusProp,
  onStatusChange: onStatusChangeProp,
  loadSourceExternally = false,
}: UseAudioPlayerWithExternalStatusOptions) => {
  const [draggingTimestamp, setDraggingTimestamp] = useState<number | null>(
    null,
  );
  const tmpPlayingRef = useRef<boolean | null>(null);
  const audio = useAudio(
    process.env.NODE_ENV === 'test' ? (a) => (a.src = '') : undefined,
  );
  const interactingRef = useRef(false);
  const audioStatusPropRef = useRef(audioStatusProp);
  audioStatusPropRef.current = audioStatusProp;

  const { sleep: pauseProgressChange, getSleeping: isPauseProgressChange } =
    useSleep();

  const [audioStatus, setAudioStatus] = useAsyncState(
    audioStatusProp,
    (state) => {
      if (state) onStatusChangeProp(state);
    },
  );
  const { isPlaying = false, loading = false } = audioStatus || {};

  const play = useEventCallback(async (time?: number) => {
    try {
      if (audio.paused) {
        audio.currentTime = time ?? audioStatus?.currentTime ?? 0;

        await audio.play();
      } else {
        // eslint-disable-next-line no-console
        console.warn('audio is already playing, do not play again');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('audio play fail:', error);
    }
  });

  const pause = useEventCallback(() => {
    try {
      if (!audio.paused) {
        audio.pause();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('audio pause fail:', error);
    }
  });

  const updateAudioStatus = useEventCallback(
    (status: VoicemailAudioStatus, debounce = true) => {
      const result = { ...audioStatus, ...status };
      setAudioStatus(result, debounce);

      if (status.loading) {
        if (!loadSourceExternally) {
          audio.src = uri || '';
        }
      } else if (typeof status.isPlaying === 'boolean') {
        if (status.isPlaying === false) {
          pause();
        } else {
          play(result.currentTime);
        }
      }
    },
  );

  useEffect(() => {
    if (audioStatusProp?.isPlaying === false) {
      if (audio.src) pause();

      setAudioStatus(audioStatusPropRef.current, false);
    }
  }, [audio, audioStatusProp?.isPlaying, pause, setAudioStatus]);

  useEventListener(audio, 'ended', () => {
    updateAudioStatus({ currentTime: 0, isPlaying: false });
  });

  useEventListener(audio, 'timeupdate', () => {
    updateAudioStatus({ currentTime: audio.currentTime }, !audio.paused);
  });

  const blobUrl = audioStatusProp?.blobUrl;

  useEffect(() => {
    if (loadSourceExternally && blobUrl && audio.src !== blobUrl) {
      audio.src = blobUrl;
    }
  }, [loadSourceExternally, blobUrl, audio]);

  useEventListener(audio, 'loadeddata', () => {
    const currInteracting = interactingRef.current;
    interactingRef.current = false;

    updateAudioStatus(
      {
        duration: audio.duration,
        loading: false,
      },
      false,
    );

    if (loadSourceExternally && !currInteracting) return;

    if (audioStatus?.isPlaying) {
      play();
    }
  });

  useEventListener(audio, 'error', () => {
    updateAudioStatus({
      isNetworkError: true,
      loading: false,
      isPlaying: false,
    });
  });

  const destroy = useEventCallback(() => {
    updateAudioStatus(
      {
        isPlaying: false,
      },
      false,
    );
  });

  useUnmount(() => {
    destroy();
  });

  useEventListener(window, 'beforeunload', destroy);

  const currentTime = draggingTimestamp || audioStatus?.currentTime || 0;
  const duration = audioStatus?.duration || durationProp || 0;
  const progress = useMemo(
    () => (currentTime / duration) * 100 || 0,
    [currentTime, duration],
  );

  const getPlayTime = (value: number | number[]) => {
    const v = value as number;
    return (duration * v) / 100;
  };

  const togglePlay = () => {
    if (isPlaying) {
      updateAudioStatus({ isPlaying: false });
    } else {
      // only load the audio when user click the file
      if (!audio.src) {
        interactingRef.current = true;

        updateAudioStatus({ loading: true, isPlaying: true });

        return true;
      } else {
        updateAudioStatus({ isPlaying: true });
      }
    }

    return false;
  };

  const onProgressChange = (value: number) => {
    // some event trigger very quick after committed, ignore those event
    if (isPauseProgressChange()) return;
    if (tmpPlayingRef.current === null) {
      tmpPlayingRef.current = isPlaying;
    }

    if (isPlaying) {
      updateAudioStatus({ isPlaying: false });
    }

    const time = getPlayTime(value);
    setDraggingTimestamp(time);
  };

  const onProgressChangeCommitted = (value: number) => {
    // pause the progress a while, prevent the onProgress trigger by accidentally stop the audio play
    pauseProgressChange(100);
    // clear the dragging timestamp
    setDraggingTimestamp(null);

    const time = getPlayTime(value);

    if (!loadSourceExternally && !audio.src) {
      audio.src = uri || '';
    }

    updateAudioStatus(
      tmpPlayingRef.current
        ? // resume playing if it was playing
          { isPlaying: true, currentTime: time }
        : { currentTime: time },
      false,
    );

    tmpPlayingRef.current = null;
  };

  return {
    audio,
    /**
     * Progress in percentage `0 ~ 100`
     */
    progress,
    currentTime,
    isPlaying,
    loading,
    duration,
    togglePlay,
    onProgressChange,
    onProgressChangeCommitted,
  };
};
