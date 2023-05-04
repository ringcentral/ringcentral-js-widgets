// Query parameters for operation listExtensionPhoneNumbers
export interface ListExtensionPhoneNumbersParameters {
  /**
   * Status of a phone number. Multiple values are supported
   */
  status: 'Normal' | 'Pending' | 'PortedIn' | 'Temporary';
  /**
   * Usage type of a phone number
   */
  usageType: (
    | 'MainCompanyNumber'
    | 'AdditionalCompanyNumber'
    | 'CompanyNumber'
    | 'DirectNumber'
    | 'CompanyFaxNumber'
    | 'ForwardedNumber'
    | 'ForwardedCompanyNumber'
    | 'BusinessMobileNumber'
    | 'IntegrationNumber'
  )[];
  /**
   * Indicates the page number to retrieve. Only positive number values are allowed. Default value is '1'
   */
  page: number;
  /**
   * Indicates the page size (number of items). If not specified, the value is '100' by default
   */
  perPage: number;
}
