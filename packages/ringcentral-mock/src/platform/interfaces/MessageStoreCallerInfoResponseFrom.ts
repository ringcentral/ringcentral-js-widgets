// Sender information
export interface MessageStoreCallerInfoResponseFrom {
  /**
   * Extension short number (usually 3 or 4 digits). This property is filled when parties communicate by means of short internal numbers, for example when calling to other extension or sending/receiving Company Pager message
   */
  extensionNumber: string;
  /**
   * Internal identifier of an extension
   */
  extensionId: string;
  /**
   * Contains party location (city, state) if one can be determined from phoneNumber. This property is filled only when phoneNumber is not empty and server can calculate location information from it (for example, this information is unavailable for US toll-free numbers)
   */
  location: string;
  /**
   * Symbolic name associated with a party. If the phone does not belong to the known extension, only the location is returned, the name is not determined then
   */
  name: string;
  /**
   * Phone number of a party. Usually it is a plain number including country and area code like 18661234567. But sometimes it could be returned from database with some formatting applied, for example (866)123-4567. This property is filled in all cases where parties communicate by means of global phone numbers, for example when calling to direct numbers or sending/receiving SMS
   */
  phoneNumber: string;
}
