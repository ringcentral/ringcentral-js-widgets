interface JSONResponse {
  errorCode?: string;
  errors?: string;
}

interface ErrorResponse extends Response {
  _json?: JSONResponse;
  _text?: string;
}

/**
 * Response from client's requests
 */
export interface ClientError {
  response?: ErrorResponse;
  message?: string;
  retryAfter?: number;
}

export class Alert {}

export interface Client {}

export class Environment {}
