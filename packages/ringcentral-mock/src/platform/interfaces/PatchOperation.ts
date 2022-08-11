export interface PatchOperation {
  /**
   * Required
   */
  op: 'add' | 'replace' | 'remove';
  /**
   */
  path: string;
  /**
   * corresponding 'value' of that field specified by 'path'
   */
  value: string;
}
