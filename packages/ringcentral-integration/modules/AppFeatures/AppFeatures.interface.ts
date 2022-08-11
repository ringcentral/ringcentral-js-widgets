import { Auth } from '../Auth';
import { Brand } from '../Brand';
import { ExtensionFeatures } from '../ExtensionFeatures';

export interface AppFeaturesOptions {
  /* reserved */
}

export interface Deps<T extends FeatureConfiguration> {
  auth: Auth;
  brand: Brand;
  extensionFeatures: ExtensionFeatures;
  featureConfiguration?: T;
  appFeaturesOptions?: AppFeaturesOptions;
}

export interface FeatureConfiguration {
  CallControl?: boolean;
  CallLog?: boolean;
  ConferenceCall?: boolean;
  Conferencing?: boolean;
  Fax?: boolean;
  Glip?: boolean;
  Meetings?: boolean;
  Pages?: boolean;
  RingCentralApp?: boolean;
  RingOut?: boolean;
  SMS?: boolean;
  Softphone?: boolean;
  Voicemail?: boolean;
  WebPhone?: boolean;
  Contacts?: boolean;
  HideContactsWhenNoCallOrMessage?: boolean;
  CDC?: boolean;
  EDP?: boolean;
}
