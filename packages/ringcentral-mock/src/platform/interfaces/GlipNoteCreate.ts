export interface GlipNoteCreate {
  /**
   * Title of a note. Max allowed length is 250 characters
   * Required
   */
  title: string;
  /**
   * Contents of a note; HTML-markuped text. Max allowed length is 1048576 characters (1 Mb).
   */
  body: string;
}
