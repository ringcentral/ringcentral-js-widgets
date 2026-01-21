/**
 * Stops single track on the stream.
 * If notify === true, also invokes track.onended handler
 */
export const stopTrack = (track: MediaStreamTrack, notify = false): void => {
  track.stop();
  if (notify) {
    const event = new Event('ended');
    try {
      if (typeof track.onended === 'function') {
        track.onended(event);
        track.onended = null;
      }
    } finally {
      track.dispatchEvent(event);
    }
  }
};

/**
 * Stops all tracks on the stream.
 * If notify === true, also invokes track.onended handler for each track
 */
export const stopStream = (stream: MediaStream, notify = false): void => {
  stream.getTracks().forEach((track) => stopTrack(track, notify));
};
