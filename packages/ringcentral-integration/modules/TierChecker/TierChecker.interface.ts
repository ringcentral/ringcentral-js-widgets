import { Alert } from '../Alert';
import { Auth } from '../Auth';
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
