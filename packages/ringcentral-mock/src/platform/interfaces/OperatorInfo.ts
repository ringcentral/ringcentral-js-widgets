// Site Fax/SMS recipient (operator) reference. Multi-level IVR should be enabled
export interface OperatorInfo {
  /**
   * Internal identifier of an operator
   */
  id: string;
  /**
   * Link to an operator resource
   */
  uri: string;
  /**
   * Extension number (pin)
   */
  extensionNumber: string;
  /**
   * Operator extension user full name
   */
  name: string;
}
