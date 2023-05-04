import { ContactCenterProvider } from './ContactCenterProvider';

// Information on the extension, to which the phone number is assigned. Returned only for the request of Account phone number list
export interface UserPhoneNumberExtensionInfo {
  /**
   * Internal identifier of an extension
   * Format: int64
   */
  id: number;
  /**
   * Canonical URI of an extension
   */
  uri: string;
  /**
   * Number of extension
   */
  extensionNumber: string;
  /**
   * For Partner Applications Internal identifier of an extension created by partner. The RingCentral supports the mapping of accounts and stores the corresponding account ID/extension ID for each partner ID of a client application. In request URIs partner IDs are accepted instead of regular RingCentral native IDs as path parameters using pid = XXX clause. Though in response URIs contain the corresponding account IDs and extension IDs. In all request and response bodies these values are reflected via partnerId attributes of account and extension
   */
  partnerId: string;
  /**
   * Extension type. Please note that legacy 'Department' extension type corresponds to 'Call Queue' extensions in modern RingCentral product terminology
   */
  type:
    | 'User'
    | 'FaxUser'
    | 'VirtualUser'
    | 'DigitalUser'
    | 'Department'
    | 'Announcement'
    | 'Voicemail'
    | 'SharedLinesGroup'
    | 'PagingOnly'
    | 'IvrMenu'
    | 'ApplicationExtension'
    | 'ParkLocation'
    | 'Site';
  /**
   */
  contactCenterProvider: ContactCenterProvider;
  /**
   * Extension name. For user extension types the value is a combination of the specified first name and last name
   */
  name: string;
}
