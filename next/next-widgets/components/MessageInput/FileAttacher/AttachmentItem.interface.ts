export type FileItem = {
  name: string;
  id: string;
  size: number;
  file: File;
  type: string;
  /**
   * use for save data into storage
   */
  base64?: string;
  /**
   * only for image file
   */
  width?: number;
  height?: number;
};
