// Request body for operation createUserMeetingProfileImage
export interface CreateUserMeetingProfileImageRequest {
  /**
   * Profile image file size cannot exceed 2Mb. Supported formats are: JPG/JPEG, GIF and PNG
   * Required
   * Format: file
   */
  profilePic: string;
}
