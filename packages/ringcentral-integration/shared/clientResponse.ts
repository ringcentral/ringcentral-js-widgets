export type APIResponseOptions = {
  externals: any;
  request: any;
  response: any;
  responseText?: string;
};

interface HTTPResponse {
  status: number;
  body: any;
  headers: any[];
  ok: boolean;
  redirected: boolean;
  statusText: string;
  type: string;
  url: string;
  _unauthorizedStatus?: number;
  _rateLimitStatus?: number;
}

interface JSONResponse {
  errorCode?: string;
  errors?: string;
}

export interface APIResponse {
  _response: HTTPResponse;
  _json: JSONResponse;
  _text: string;

  new (options?: APIResponseOptions);

  request(): any;
  response(): HTTPResponse;
  json(): JSONResponse;
}

/**
 * Response from client's requests
 */
export interface ClientError {
  apiResponse?: APIResponse;
  message?: string;
  retryAfter?: number;
}

export class Alert {}

export interface Client {}

export class Environment {}
