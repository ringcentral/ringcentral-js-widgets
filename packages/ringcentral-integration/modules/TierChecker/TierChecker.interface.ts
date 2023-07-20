import type { Alert } from '../Alert';
import type { Auth } from '../Auth';
import type { ExtensionFeatures } from '../ExtensionFeatures';

export interface TierCheckerOptions {
  crmFeature?: string;
  enforceCRMFeature?: boolean;
}

export interface Deps {
  auth: Auth;
  alert: Alert;
  extensionFeatures: ExtensionFeatures;
  tierCheckerOptions?: TierCheckerOptions;
}
