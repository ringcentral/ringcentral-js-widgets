"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAudioPlayerWithExternalStatus = void 0;
const tslib_1 = require("tslib");
const spring_ui_1 = require("@ringcentral/spring-ui");
const react_1 = require("react");
const react_use_1 = require("react-use");
const useAsyncState_1 = require("./useAsyncState");
/**
 * player which support multiple instances
 *
 * with same `audioStatus` will only one instance can play at the same time
 */
const useAudioPlayerWithExternalStatus = ({ uri, duration: durationProp, status: audioStatusProp, onStatusChange: onStatusChangeProp, loadSourceExternally = false, }) => {
    const [draggingTimestamp, setDraggingTimestamp] = (0, react_1.useState)(null);
    const tmpPlayingRef = (0, react_1.useRef)(null);
    const audio = (0, spring_ui_1.useAudio)(process.env.NODE_ENV === 'test' ? (a) => (a.src = '') : undefined);
    const interactingRef = (0, react_1.useRef)(false);
    const audioStatusPropRef = (0, react_1.useRef)(audioStatusProp);
    audioStatusPropRef.current = audioStatusProp;
    const { sleep: pauseProgressChange, getSleeping: isPauseProgressChange } = (0, spring_ui_1.useSleep)();
    const [audioStatus, setAudioStatus] = (0, useAsyncState_1.useAsyncState)(audioStatusProp, (state) => {
        if (state)
            onStatusChangeProp(state);
    });
    const { isPlaying = false, loading = false } = audioStatus || {};
    const play = (0, spring_ui_1.useEventCallback)((time) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (audio.paused) {
                audio.currentTime = (_a = time !== null && time !== void 0 ? time : audioStatus === null || audioStatus === void 0 ? void 0 : audioStatus.currentTime) !== null && _a !== void 0 ? _a : 0;
                yield audio.play();
            }
            else {
                // eslint-disable-next-line no-console
                console.warn('audio is already playing, do not play again');
            }
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error('audio play fail:', error);
        }
    }));
    const pause = (0, spring_ui_1.useEventCallback)(() => {
        try {
            if (!audio.paused) {
                audio.pause();
            }
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error('audio pause fail:', error);
        }
    });
    const updateAudioStatus = (0, spring_ui_1.useEventCallback)((status, debounce = true) => {
        const result = Object.assign(Object.assign({}, audioStatus), status);
        setAudioStatus(result, debounce);
        if (status.loading) {
            if (!loadSourceExternally) {
                audio.src = uri || '';
            }
        }
        else if (typeof status.isPlaying === 'boolean') {
            if (status.isPlaying === false) {
                pause();
            }
            else {
                play(result.currentTime);
            }
        }
    });
    (0, react_1.useEffect)(() => {
        if ((audioStatusProp === null || audioStatusProp === void 0 ? void 0 : audioStatusProp.isPlaying) === false) {
            if (audio.src)
                pause();
            setAudioStatus(audioStatusPropRef.current, false);
        }
    }, [audio, audioStatusProp === null || audioStatusProp === void 0 ? void 0 : audioStatusProp.isPlaying, pause, setAudioStatus]);
    (0, spring_ui_1.useEventListener)(audio, 'ended', () => {
        updateAudioStatus({ currentTime: 0, isPlaying: false });
    });
    (0, spring_ui_1.useEventListener)(audio, 'timeupdate', () => {
        updateAudioStatus({ currentTime: audio.currentTime }, !audio.paused);
    });
    const blobUrl = audioStatusProp === null || audioStatusProp === void 0 ? void 0 : audioStatusProp.blobUrl;
    (0, react_1.useEffect)(() => {
        if (loadSourceExternally && blobUrl && audio.src !== blobUrl) {
            audio.src = blobUrl;
        }
    }, [loadSourceExternally, blobUrl, audio]);
    (0, spring_ui_1.useEventListener)(audio, 'loadeddata', () => {
        const currInteracting = interactingRef.current;
        interactingRef.current = false;
        updateAudioStatus({
            duration: audio.duration,
            loading: false,
        }, false);
        if (loadSourceExternally && !currInteracting)
            return;
        if (audioStatus === null || audioStatus === void 0 ? void 0 : audioStatus.isPlaying) {
            play();
        }
    });
    (0, spring_ui_1.useEventListener)(audio, 'error', () => {
        updateAudioStatus({
            isNetworkError: true,
            loading: false,
            isPlaying: false,
        });
    });
    const destroy = (0, spring_ui_1.useEventCallback)(() => {
        updateAudioStatus({
            isPlaying: false,
        }, false);
    });
    (0, react_use_1.useUnmount)(() => {
        destroy();
    });
    (0, spring_ui_1.useEventListener)(window, 'beforeunload', destroy);
    const currentTime = draggingTimestamp || (audioStatus === null || audioStatus === void 0 ? void 0 : audioStatus.currentTime) || 0;
    const duration = (audioStatus === null || audioStatus === void 0 ? void 0 : audioStatus.duration) || durationProp || 0;
    const progress = (0, react_1.useMemo)(() => (currentTime / duration) * 100 || 0, [currentTime, duration]);
    const getPlayTime = (value) => {
        const v = value;
        return (duration * v) / 100;
    };
    const togglePlay = () => {
        if (isPlaying) {
            updateAudioStatus({ isPlaying: false });
        }
        else {
            // only load the audio when user click the file
            if (!audio.src) {
                interactingRef.current = true;
                updateAudioStatus({ loading: true, isPlaying: true });
                return true;
            }
            else {
                updateAudioStatus({ isPlaying: true });
            }
        }
        return false;
    };
    const onProgressChange = (value) => {
        // some event trigger very quick after committed, ignore those event
        if (isPauseProgressChange())
            return;
        if (tmpPlayingRef.current === null) {
            tmpPlayingRef.current = isPlaying;
        }
        if (isPlaying) {
            updateAudioStatus({ isPlaying: false });
        }
        const time = getPlayTime(value);
        setDraggingTimestamp(time);
    };
    const onProgressChangeCommitted = (value) => {
        // pause the progress a while, prevent the onProgress trigger by accidentally stop the audio play
        pauseProgressChange(100);
        // clear the dragging timestamp
        setDraggingTimestamp(null);
        const time = getPlayTime(value);
        if (!loadSourceExternally && !audio.src) {
            audio.src = uri || '';
        }
        updateAudioStatus(tmpPlayingRef.current
            ? // resume playing if it was playing
                { isPlaying: true, currentTime: time }
            : { currentTime: time }, false);
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
exports.useAudioPlayerWithExternalStatus = useAudioPlayerWithExternalStatus;
//# sourceMappingURL=useAudioPlayerWithExternalStatus.js.map