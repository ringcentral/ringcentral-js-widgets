export interface PresenceModel {
  dndStatus: string;
  // meetingStatus is optional as our app does not use it
  meetingStatus?: string;
  presenceStatus: string;
}
