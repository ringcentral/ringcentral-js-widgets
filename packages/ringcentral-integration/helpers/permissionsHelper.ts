import callingOptions from '../modules/CallingSettings/callingOptions';

export function hasClickToCallPermission({
  callWith,
  ringoutEnabled,
  webphoneEnabled,
}: {
  callWith: string;
  ringoutEnabled: boolean;
  webphoneEnabled: boolean;
}): boolean {
  const { browser, softphone, ringout, jupiter } = callingOptions;
  // Without Webphone permissions, it won't work on Jupiter either.
  // And without RingOut and Webphone permissions, it won't work on Softphone either.
  return (
    ((callWith === browser || callWith === softphone || callWith === jupiter) &&
      webphoneEnabled) ||
    ((callWith === softphone || callWith === ringout) && ringoutEnabled)
  );
}
