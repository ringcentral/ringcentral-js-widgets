export interface AppFeaturesOptions {
  /* reserved */
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
  /**
   * Company Directory Controls
   *
   * when enabled, the company directory should not shown also not have call button
   *
   * https://test_it_domain/test-cases/RCI-3668
   *
   *
   * # spring-ui always be true
   * TODO: should remove after all projects migrate to spring-ui
   */
  CDC?: boolean;
  /**
   * Enterprise Dial Plan
   *
   * when enable EDP, will use remote API to validate the phone number
   *
   * https://test_it_domain/test-cases/RCI-4399
   *
   * # spring-ui always be true
   * TODO: should remove after all projects migrate to spring-ui
   */
  EDP?: boolean;
  SmartNote?: boolean;
}
