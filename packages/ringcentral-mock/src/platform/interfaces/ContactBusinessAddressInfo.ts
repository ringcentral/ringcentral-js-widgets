// Extension user business address. The default is Company (Auto-Receptionist) settings
export interface ContactBusinessAddressInfo {
  /**
   * Country name of an extension user company
   */
  country: string;
  /**
   * State/province name of an extension user company. Mandatory for the USA, UK and Canada
   */
  state: string;
  /**
   * City name of an extension user company
   */
  city: string;
  /**
   * Street address of an extension user company
   */
  street: string;
  /**
   * Zip code of an extension user company
   */
  zip: string;
}
