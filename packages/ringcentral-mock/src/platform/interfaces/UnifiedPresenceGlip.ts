// Returned if *Glip* feature is switched on
export interface UnifiedPresenceGlip {
  /**
   * Glip connection status calculated from all user's apps. Returned always for the requester's extension; returned for another users if their glip visibility is set to 'Visible'
   */
  status: 'Offline' | 'Online';
  /**
   * Visibility setting allowing other users to see the user's Glip presence status; returned only for requester's extension
   */
  visibility: 'Visible' | 'Invisible';
  /**
   * Shows whether user wants to receive Glip notifications or not.
   */
  availability: 'Available' | 'DND';
}
