// Account sign up data
export interface SignupInfoResource {
  /**
   */
  tosAccepted: boolean;
  /**
   */
  signupState: (
    | 'AccountCreated'
    | 'BillingEntered'
    | 'CreditCardApproved'
    | 'AccountConfirmed'
    | 'PhoneVerificationRequired'
    | 'PhoneVerificationPassed'
  )[];
  /**
   */
  verificationReason:
    | 'CC_Failed'
    | 'Phone_Suspicious'
    | 'CC_Phone_Not_Match'
    | 'AVS_Not_Available'
    | 'MaxMind'
    | 'CC_Blacklisted'
    | 'Email_Blacklisted'
    | 'Phone_Blacklisted'
    | 'Cookie_Blacklisted'
    | 'Device_Blacklisted'
    | 'IP_Blacklisted'
    | 'Agent_Instance_Blacklisted'
    | 'Charge_Limit'
    | 'Other_Country'
    | 'Unknown';
  /**
   * Updates 'Send Marketing Information' flag on web interface
   */
  marketingAccepted: boolean;
}
