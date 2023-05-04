export interface GlipMessageAttachmentFieldsInfo {
  /**
   * Title of an individual field
   */
  title: string;
  /**
   * Value of an individual field (supports Markdown)
   */
  value: string;
  /**
   * Style of width span applied to a field
   * Default: Short
   */
  style: 'Short' | 'Long';
}
