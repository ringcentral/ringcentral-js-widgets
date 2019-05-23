import { RcModule } from 'ringcentral-integration/lib/RcModule';
import { number } from "prop-types";

declare type APIResponseOptions = {
  externals: any,
  request: any,
  response: any,
  responseText?: string,
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

declare interface APIResponse {
  _response: HTTPResponse;
  _json: JSONResponse;
  _text: string;

  new(options?: APIResponseOptions);

  request(): any;
  response(): HTTPResponse;
  json(): JSONResponse;
}

/**
 * Response from client's requests
 */
export declare interface ClientError {
  apiResponse?: APIResponse;
  message?: string;
  retryAfter?: number;
}

export declare class Alert {}

export declare interface Client {}

export declare class Environment {}
