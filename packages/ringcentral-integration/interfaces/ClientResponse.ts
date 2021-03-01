interface JSONResponse {
  errorCode?: string;
  errors?: string;
}

interface ErrorResponse extends Response {
  _json?: JSONResponse;
  _text?: string;
}

export interface ClientError {
  response?: ErrorResponse;
  message?: string;
  retryAfter?: number;
}
