export interface SmsTemplateOptions {}

export interface SmsTemplateItem {
  id: string;
  title: string;
  content: string;
}

export interface CreateSmsTemplateParams {
  title: string;
  content: string;
}

export interface UpdateSmsTemplateParams {
  id: string;
  title?: string;
  content?: string;
}

// Server API response interfaces
export interface ServerSmsTemplateItem {
  id: string;
  displayName: string;
  body: {
    text: string;
  };
  scope: string;
}

export interface ServerSmsTemplatesResponse {
  records: ServerSmsTemplateItem[];
}

export interface CreateServerSmsTemplateRequest {
  displayName: string;
  body: {
    text: string;
  };
}

export interface UpdateServerSmsTemplateRequest {
  displayName?: string;
  body?: {
    text: string;
  };
}

export interface SmsTemplateError {
  errorCode: string;
  message: string;
  errors: Error[];
  limit: string;
  resourceName?: string;
  parameterName?: string;
}

interface Error {
  errorCode: string;
  message: string;
  limit: string;
  resourceName?: string;
}
