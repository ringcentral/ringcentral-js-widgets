import { useFormatDuration } from '@ringcentral-integration/micro-core/src/app/components';
import {
  useAudioPlayerWithExternalStatus,
  type UseAudioPlayerWithExternalStatusOptions,
} from '@ringcentral-integration/react-hooks';
import { stopPropagation } from '@ringcentral-integration/utils';
import { DownloadMd, HoldFilledMd, PlayMd } from '@ringcentral/spring-icon';
import {
  CircularProgressIndicator,
  IconButton,
  Slider,
  Text,
} from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React from 'react';

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

export type VoicemailPlayerInterface = {
  /**
   * Callback when the audio starts loading
   */
  onStartLoad?: (uri: string) => void;
  /**
   * Callback when the download button is clicked
   */
  onDownload?: () => void;
  /**
   * the status of the audio
   */
  audioStatus?: VoicemailAudioStatus;
  updateAudioStatus: (status: VoicemailAudioStatus) => void;
} & Pick<
  UseAudioPlayerWithExternalStatusOptions,
  'uri' | 'duration' | 'loadSourceExternally'
>;

const INVALID_DISPLAY = '00:00';

/**
 * player which support multiple instances
 *
 * with same `audioStatus` will only one instance can play at the same time
 */
export const VoicemailPlayer: FunctionComponent<VoicemailPlayerInterface> = ({
  uri,
  duration: serverDuration,
  onStartLoad,
  onDownload,
  audioStatus: audioStatusProp,
  updateAudioStatus: updateAudioStatusProp,
  loadSourceExternally = false,
  ...rest
}) => {
  const {
    progress,
    togglePlay,
    duration,
    currentTime,
    isPlaying,
    loading,
    onProgressChange,
    onProgressChangeCommitted,
  } = useAudioPlayerWithExternalStatus({
    uri,
    duration: serverDuration,
    status: audioStatusProp,
    onStatusChange: updateAudioStatusProp,
    loadSourceExternally,
  });

  const currentTimeDisplay = useFormatDuration(currentTime, INVALID_DISPLAY);
  const durationDisplay = useFormatDuration(duration, INVALID_DISPLAY);

  return (
    <div className="flex items-center justify-between" {...rest}>
      <div className="min-w-8 grow-0 flex items-center justify-center shrink-0">
        {loading ? (
          <div className="size-8 flex items-center justify-center">
            <CircularProgressIndicator
              size="small"
              data-sign="progress-indicator"
            />
          </div>
        ) : (
          <IconButton
            symbol={isPlaying ? HoldFilledMd : PlayMd}
            size="medium"
            iconSize="small"
            variant="inverted"
            shape="squircle"
            data-sign={isPlaying ? 'pause' : 'play'}
            onClick={() => {
              const result = togglePlay();

              if (result) {
                onStartLoad?.(uri);
              }
            }}
          />
        )}
        <Text className="mx-2 min-w-[3rem] text-center" data-sign="current">
          {currentTimeDisplay}
        </Text>
      </div>
      <div className="grow mx-2 leading-none" data-sign="progress">
        <Slider
          aria-label="audio slider"
          disabled={loading}
          value={progress}
          onClick={stopPropagation}
          onChange={(_, value) => {
            onProgressChange(value);
          }}
          onChangeCommitted={(_, value) => {
            onProgressChangeCommitted(value as number);
          }}
          className="min-w-full"
        />
      </div>
      <div className="min-w-6 grow-0 flex items-center justify-center">
        <Text className="mx-2 min-w-[3rem] text-center" data-sign="duration">
          {durationDisplay}
        </Text>
        {onDownload && (
          <IconButton
            symbol={DownloadMd}
            color="secondary"
            size="small"
            variant="icon"
            onClick={onDownload}
            data-sign="download"
          />
        )}
      </div>
    </div>
  );
};
