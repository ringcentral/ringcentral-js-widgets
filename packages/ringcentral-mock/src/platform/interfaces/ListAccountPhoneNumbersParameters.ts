// Query parameters for operation listAccountPhoneNumbers
export interface ListAccountPhoneNumbersParameters {
  /**
   * Indicates the page number to retrieve. Only positive number values are accepted
   * Default: 1
   */
  page: number;
  /**
   * Indicates the page size (number of items)
   * Default: 100
   */
  perPage: number;
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
    | 'ContactCenterNumber'
    | 'ConferencingNumber'
    | 'MeetingsNumber'
    | 'BusinessMobileNumber'
    | 'IntegrationNumber'
  )[];
  /**
   * Status of a phone number. Multiple values are supported
   */
  status: 'Normal' | 'Pending' | 'PortedIn' | 'Temporary';
}
