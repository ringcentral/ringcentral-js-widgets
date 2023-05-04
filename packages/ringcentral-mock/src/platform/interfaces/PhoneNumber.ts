export interface PhoneNumber {
  /**
   * Required
   */
  type: 'work' | 'mobile' | 'other';
  /**
   * Required
   */
  value: string;
}
