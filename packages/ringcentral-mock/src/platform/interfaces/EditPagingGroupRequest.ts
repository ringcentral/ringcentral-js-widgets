export interface EditPagingGroupRequest {
  /**
   * List of users that will be allowed to page a group specified
   */
  addedUserIds: string[];
  /**
   * List of users that will be unallowed to page a group specified
   */
  removedUserIds: string[];
  /**
   * List of account devices that will be assigned to a paging group specified
   */
  addedDeviceIds: string[];
  /**
   * List of account devices that will be unassigned from a paging group specified
   */
  removedDeviceIds: string[];
}
