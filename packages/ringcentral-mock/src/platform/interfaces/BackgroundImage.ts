// Specifies a background image oa a card. Acceptable formats are PNG, JPEG, and GIF
export interface BackgroundImage {
  /**
   * Must be `BackgroundImage`
   */
  type: 'BackgroundImage';
  /**
   * The URL/data URL of an image to be used as a background of a card. Acceptable formats are PNG, JPEG, and GIF
   * Required
   * Format: uri-reference
   */
  url: string;
  /**
   * Describes how the image should fill the area
   */
  fillMode: 'cover' | 'repeatHorizontally' | 'repeatVertically' | 'repeat';
  /**
   * Describes how the image should be aligned if it must be cropped or if using repeat fill mode
   */
  horizontalAlignment: 'left' | 'center' | 'right';
  /**
   * Describes how the image should be aligned if it must be cropped or if using repeat fill mode
   */
  verticalAlignment: 'top' | 'center' | 'bottom';
}
