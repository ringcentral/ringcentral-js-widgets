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
  const {
    browser,
    softphone,
    myphone,
    otherphone,
    customphone,
  } = callingOptions;

  return (
    ((callWith === browser || callWith === softphone) && webphoneEnabled) ||
    ((callWith === softphone ||
      callWith === myphone ||
      callWith === otherphone ||
      callWith === customphone) &&
      ringoutEnabled)
  );
}
