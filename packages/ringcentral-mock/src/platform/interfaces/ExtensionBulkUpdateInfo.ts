import type { AutomaticLocationUpdatesSiteInfo } from './AutomaticLocationUpdatesSiteInfo';
import type { CallQueueInfoRequest } from './CallQueueInfoRequest';
import type { ContactInfoUpdateRequest } from './ContactInfoUpdateRequest';
import type { CustomFieldInfo } from './CustomFieldInfo';
import type { ExtensionRegionalSettingRequest } from './ExtensionRegionalSettingRequest';
import type { ExtensionStatusInfo } from './ExtensionStatusInfo';
import type { ReferenceInfo } from './ReferenceInfo';
import type { UserTransitionInfo } from './UserTransitionInfo';

export interface ExtensionBulkUpdateInfo {
  /**
   * Internal identifier of an extension
   */
  id: string;
  /**
   */
  status: 'Disabled' | 'Enabled' | 'NotActivated' | 'Frozen';
  /**
   */
  statusInfo: ExtensionStatusInfo;
  /**
   * Type of suspension
   */
  reason: string;
  /**
   * Free form user comment
   */
  comment: string;
  /**
   * Extension number available
   */
  extensionNumber: string;
  /**
   */
  contact: ContactInfoUpdateRequest;
  /**
   */
  regionalSettings: ExtensionRegionalSettingRequest;
  /**
   */
  setupWizardState: 'NotStarted' | 'Incomplete' | 'Completed';
  /**
   * Additional extension identifier created by partner application and applied on client side
   */
  partnerId: string;
  /**
   * IVR PIN
   */
  ivrPin: string;
  /**
   * Password for extension
   */
  password: string;
  /**
   */
  callQueueInfo: CallQueueInfoRequest;
  /**
   */
  transition: UserTransitionInfo;
  /**
   */
  customFields: CustomFieldInfo[];
  /**
   * Hides extension from showing in company directory. Supported for extensions of User type only
   */
  hidden: boolean;
  /**
   */
  site: AutomaticLocationUpdatesSiteInfo;
  /**
   * Extension type. Please note that legacy 'Department' extension type corresponds to 'Call Queue' extensions in modern RingCentral product terminology
   */
  type:
    | 'User'
    | 'Fax User'
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
    | 'DelegatedLinesGroup';
  /**
   * List of non-RC internal identifiers assigned to an extension
   */
  references: ReferenceInfo[];
}
