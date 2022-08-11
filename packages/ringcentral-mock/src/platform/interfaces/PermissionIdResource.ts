export interface PermissionIdResource {
  /**
   */
  uri: string;
  /**
   */
  id: string;
  /**
   * Site compatibility flag set for permission
   */
  siteCompatible: 'Compatible' | 'Incompatible' | 'Independent';
  /**
   * Specifies if the permission is editable on UI (if set to 'True') or not (if set to 'False')
   */
  readOnly: boolean;
  /**
   * Specifies if the permission can be assigned by the account administrator
   */
  assignable: boolean;
}
