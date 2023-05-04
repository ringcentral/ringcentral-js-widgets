export interface TemplateInfo {
  /**
   * Link to a template
   */
  uri: string;
  /**
   * Internal identifier of a template
   */
  id: string;
  /**
   */
  type: 'UserSettings' | 'CallHandling';
  /**
   * Name of a template
   */
  name: string;
  /**
   * Time of a template creation
   */
  creationTime: string;
  /**
   * Time of the last template modification
   */
  lastModifiedTime: string;
}
