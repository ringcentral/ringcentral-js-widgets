export type PreinsertCallStatus =
  | 'ignore'
  | 'end'
  // when be force terminate, when the call invite be trigger will not clear the preinsert state, because that will be end soon
  | 'forceTerminate'
  | 'bringInParty'
  | 'partyRemoved';
