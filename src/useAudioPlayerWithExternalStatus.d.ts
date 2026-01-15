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
export declare const useAudioPlayerWithExternalStatus: ({ uri, duration: durationProp, status: audioStatusProp, onStatusChange: onStatusChangeProp, loadSourceExternally, }: UseAudioPlayerWithExternalStatusOptions) => {
    audio: HTMLAudioElement;
    /**
     * Progress in percentage `0 ~ 100`
     */
    progress: number;
    currentTime: number;
    isPlaying: boolean;
    loading: boolean;
    duration: number;
    togglePlay: () => boolean;
    onProgressChange: (value: number) => void;
    onProgressChangeCommitted: (value: number) => void;
};
