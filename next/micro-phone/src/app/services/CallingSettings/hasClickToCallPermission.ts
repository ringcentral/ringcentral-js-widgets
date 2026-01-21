import { callingOptions } from './callingOptions';

export const hasClickToCallPermission = ({
  callWith,
  ringoutEnabled,
  webphoneEnabled,
}: {
  callWith: string | null;
  ringoutEnabled: boolean;
  webphoneEnabled: boolean;
}) => {
  const { browser, softphone, ringout, jupiter } = callingOptions;
  return (
    ((callWith === browser || callWith === softphone || callWith === jupiter) &&
      webphoneEnabled) ||
    ((callWith === softphone || callWith === ringout || callWith === jupiter) &&
      ringoutEnabled)
  );
};
