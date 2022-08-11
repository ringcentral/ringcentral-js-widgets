// Shipping method information
export interface MethodInfo {
  /**
   * Method identifier. The default value is 1 (Ground)
   */
  id: '1' | '2' | '3';
  /**
   * Method name, corresponding to the identifier
   */
  name: 'Ground' | '2 Day' | 'Overnight';
}
