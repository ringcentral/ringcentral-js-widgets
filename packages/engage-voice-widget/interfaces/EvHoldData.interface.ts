export interface EvHoldResponse {
  type: string;
  data: EvHoldData;
}

export interface EvHoldData {
  message: string;
  detail: string;
  status: string;
  holdState: boolean;
  sessionId: string;
  uii: string;
}
