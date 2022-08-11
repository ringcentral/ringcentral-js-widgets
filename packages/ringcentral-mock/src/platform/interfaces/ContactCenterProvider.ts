// CCRN (Contact Center Routing Number) provider. If not specified then the default value 'InContact/North America' is used, its ID is '1'
export interface ContactCenterProvider {
  /**
   * Internal identifier of the provider
   */
  id: string;
  /**
   * Provider's name
   */
  name: string;
}
