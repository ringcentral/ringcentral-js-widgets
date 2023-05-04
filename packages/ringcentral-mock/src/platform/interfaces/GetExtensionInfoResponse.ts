import { GetExtensionAccountInfo } from './GetExtensionAccountInfo';
import { ContactInfo } from './ContactInfo';
import { CustomFieldInfo } from './CustomFieldInfo';
import { DepartmentInfo } from './DepartmentInfo';
import { ExtensionPermissions } from './ExtensionPermissions';
import { ProfileImageInfo } from './ProfileImageInfo';
import { ReferenceInfo } from './ReferenceInfo';
import { Roles } from './Roles';
import { RegionalSettings } from './RegionalSettings';
import { ExtensionServiceFeatureInfo } from './ExtensionServiceFeatureInfo';
import { ExtensionStatusInfo } from './ExtensionStatusInfo';
import { CallQueueExtensionInfo } from './CallQueueExtensionInfo';
import { AutomaticLocationUpdatesSiteInfo } from './AutomaticLocationUpdatesSiteInfo';

export interface GetExtensionInfoResponse {
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
   */
  account: GetExtensionAccountInfo;
  /**
   */
  contact: ContactInfo;
  /**
   */
  customFields: CustomFieldInfo[];
  /**
   * Information on department extension(s), to which the requested extension belongs. Returned only for user extensions, members of department, requested by single extensionId. Please note that legacy 'Department' extension type corresponds to 'Call Queue' extensions in modern RingCentral product terminology
   */
  departments: DepartmentInfo[];
  /**
   * Number of extension
   */
  extensionNumber: string;
  /**
   */
  extensionNumbers: string[];
  /**
   * Extension name. For user extension types the value is a combination of the specified first name and last name
   */
  name: string;
  /**
   * For Partner Applications Internal identifier of an extension created by partner. The RingCentral supports the mapping of accounts and stores the corresponding account ID/extension ID for each partner ID of a client application. In request URIs partner IDs are accepted instead of regular RingCentral native IDs as path parameters using pid = XXX clause. Though in response URIs contain the corresponding account IDs and extension IDs. In all request and response bodies these values are reflected via partnerId attributes of account and extension
   */
  partnerId: string;
  /**
   */
  permissions: ExtensionPermissions;
  /**
   */
  profileImage: ProfileImageInfo;
  /**
   * List of non-RC internal identifiers assigned to an extension
   */
  references: ReferenceInfo[];
  /**
   */
  roles: Roles[];
  /**
   */
  regionalSettings: RegionalSettings;
  /**
   * Extension service features returned in response only when the logged-in user requests his/her own extension info, see also Extension Service Features
   */
  serviceFeatures: ExtensionServiceFeatureInfo[];
  /**
   * Specifies extension configuration wizard state (web service setup).
   * Default: NotStarted
   */
  setupWizardState: 'NotStarted' | 'Incomplete' | 'Completed';
  /**
   * Extension current state. If 'Unassigned' is specified, then extensions without ‘extensionNumber’ are returned. If not specified, then all extensions are returned
   */
  status: 'Enabled' | 'Disabled' | 'Frozen' | 'NotActivated' | 'Unassigned';
  /**
   */
  statusInfo: ExtensionStatusInfo;
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
    | 'Bot'
    | 'Room'
    | 'Limited'
    | 'Site'
    | 'ProxyAdmin'
    | 'DelegatedLinesGroup'
    | 'GroupCallPickup';
  /**
   */
  callQueueInfo: CallQueueExtensionInfo;
  /**
   * Hides extension from showing in company directory. Supported for extensions of User type only
   */
  hidden: boolean;
  /**
   */
  site: AutomaticLocationUpdatesSiteInfo;
}
