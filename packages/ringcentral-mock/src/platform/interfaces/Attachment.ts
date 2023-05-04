// Attachment is a file to be uploaded
export interface Attachment {
  /**
   * Filename with extension
   * Example: example.png
   */
  filename: string;
  /**
   * Binary content of the file
   * Required
   */
  content: string | Buffer | Blob | NodeJS.ReadableStream;
  /**
   * Content type of the file, such as "image/png"
   */
  contentType: string;
}
