export interface ActionCardBody {
  /**
   */
  type: 'Input.Text';
  /**
   */
  id: string;
  /**
   * If set to `true`, allows multiple lines of input
   */
  isMultiline: boolean;
  /**
   * Description of the input desired. Displayed when no text has been input
   */
  placeholder: string;
}
