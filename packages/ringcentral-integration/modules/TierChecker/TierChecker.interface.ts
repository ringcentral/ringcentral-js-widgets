import { Alert } from '../Alert';
import { Auth } from '../AuthV2';
import { ExtensionFeatures } from '../ExtensionFeatures';

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
