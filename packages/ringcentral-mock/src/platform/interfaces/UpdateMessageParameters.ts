// Query parameters for operation updateMessage
export interface UpdateMessageParameters {
  /**
   */
  dateFrom: string;
  /**
   */
  type: 'Fax' | 'SMS' | 'VoiceMail' | 'Pager' | 'Text' | 'All';
}
