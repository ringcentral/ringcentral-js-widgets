import { isSafari } from '@ringcentral-integration/utils';

type SetSinkId = (sinkId: string) => Promise<unknown> | unknown;

export type SinkIdMediaElement = HTMLMediaElement & {
  setSinkId?: SetSinkId;
};

const DEFAULT_AUDIO_OUTPUT_DEVICE_ID = 'default';
// Mark the wrapped method so repeated Webphone instances do not stack patches.
const PATCHED_SET_SINK_ID = Symbol.for(
  'ringcentral-integration.micro-phone.safariSetSinkIdPatch',
);

type PatchedSetSinkId = SetSinkId & {
  [PATCHED_SET_SINK_ID]?: true;
};

export function shouldSetSinkId(
  mediaElement: SinkIdMediaElement,
  sinkId?: string,
) {
  if (!sinkId || typeof mediaElement.setSinkId !== 'function') {
    return false;
  }

  if (mediaElement.sinkId === sinkId) {
    return false;
  }

  return !(sinkId === DEFAULT_AUDIO_OUTPUT_DEVICE_ID && !mediaElement.sinkId);
}

export function setSinkIdSafely(
  mediaElement: SinkIdMediaElement,
  sinkId?: string,
  onError?: (error: unknown) => void,
) {
  if (!shouldSetSinkId(mediaElement, sinkId)) {
    return;
  }

  try {
    void Promise.resolve(mediaElement.setSinkId!(sinkId!)).catch((error) => {
      onError?.(error);
    });
  } catch (error) {
    onError?.(error);
  }
}

export function isSinkIdPermissionError(error: unknown) {
  return error instanceof DOMException && error.name === 'NotAllowedError';
}

// Safari may expose setSinkId but reject non-user-gesture calls from DialPad setup.
export function isSetSinkIdUserGestureError(error: unknown) {
  const { name, message } = (error ?? {}) as {
    name?: unknown;
    message?: unknown;
  };

  return (
    name === 'NotAllowedError' && /user gesture/i.test(String(message ?? ''))
  );
}

// Patch the native API because Spring UI/Juno DialPad calls setSinkId directly.
export function patchSafariSetSinkId() {
  if (
    !globalThis.document ||
    !globalThis.navigator ||
    !globalThis.HTMLMediaElement ||
    !isSafari()
  ) {
    return false;
  }

  const mediaPrototype = globalThis.HTMLMediaElement.prototype as
    | SinkIdMediaElement
    | undefined;
  if (!mediaPrototype) {
    return false;
  }

  const nativeSetSinkId = mediaPrototype.setSinkId as
    | PatchedSetSinkId
    | undefined;
  const setSinkIdDescriptor = Object.getOwnPropertyDescriptor(
    mediaPrototype,
    'setSinkId',
  );

  if (
    typeof nativeSetSinkId !== 'function' ||
    nativeSetSinkId[PATCHED_SET_SINK_ID] ||
    // Some test/browser shims expose setSinkId as non-configurable; leave them untouched.
    setSinkIdDescriptor?.configurable === false
  ) {
    return false;
  }

  const patchedSetSinkId = function setSinkId(
    this: HTMLMediaElement,
    sinkId: string,
  ) {
    try {
      return Promise.resolve(nativeSetSinkId.call(this, sinkId)).catch(
        (error) => {
          if (isSetSinkIdUserGestureError(error)) {
            return undefined;
          }

          throw error;
        },
      );
    } catch (error) {
      if (isSetSinkIdUserGestureError(error)) {
        return Promise.resolve(undefined);
      }

      throw error;
    }
  } as PatchedSetSinkId;

  Object.defineProperty(patchedSetSinkId, PATCHED_SET_SINK_ID, {
    value: true,
  });

  Object.defineProperty(mediaPrototype, 'setSinkId', {
    configurable: true,
    writable: true,
    value: patchedSetSinkId,
  });

  return true;
}
