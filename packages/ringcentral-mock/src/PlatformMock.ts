import $RefParser from '@apidevtools/json-schema-ref-parser';
import Ajv from 'ajv';
import type { MockOptions, MockRequest } from 'fetch-mock';
import fetchMock from 'fetch-mock-jest';
import type { JSONSchemaFakerOptions } from 'json-schema-faker';
import { connect } from 'mock-mcp';
import type { OpenAPIV3 } from 'openapi-types';
import { match } from 'path-to-regexp';

import type { Debugger } from './debugger';
import { createDebugger } from './debugger';
import type { Generate } from './faker';
import { fake } from './faker';
import type { SchemaObject } from './interface';
import type { Delete, Get, Patch, Post, Put } from './platform/apis';
import schemas from './platform/schemas.json';

interface ResponseBody<T> {
  /**
   * response body
   */
  body: T;
}

export type ResponseData<P, R, T> = {
  /**
   * request URL
   */
  url: string;
  /**
   * original request
   */
  request: MockRequest;
  /**
   * request parsed params
   */
  params: P;
  /**
   * request parsed body
   */
  body: R;
  /**
   * generated mock data with faker
   */
  mockData: T;
};

type IResponseFunction<P, R, T> = (
  options: ResponseData<P, R, T>,
) => ResponseBody<T> | Promise<ResponseBody<T>>;

interface IResponseObject<T> {
  /**
   * response body.
   */
  body: T;
  status?: number;
}

export type IResponse<P, R, T> =
  | IResponseFunction<P, R, T>
  | IResponseObject<T>;

export interface Options<P, R, T> extends MockOptions {
  /**
   * partial response body or response body handle function
   */
  response?: IResponse<P, R, T>;
  /**
   * handle Structure used to generate data with schema
   *
   * reference:
   *
   * https://github.com/json-schema-faker/json-schema-faker/blob/master/docs/USAGE.md
   * https://github.com/Marak/Faker.js
   */
  schema?: (schema: { mockData: SchemaObject }) => {
    mockData: SchemaObject;
  };
  /**
   * pass repeat to fetch-mock
   *
   * - 0: use 0 to make that mock live always
   *
   * @default 1
   */
  repeat?: number;
}

type FetchMock = typeof fetchMock;

type InitMock = (...args: any[]) => void;

type DefaultSchemas = {
  default?: OpenAPIV3.SchemaObject;
};

type MethodSchema = {
  requestBody: OpenAPIV3.SchemaObject;
  parameters: OpenAPIV3.ParameterObject[];
  responses: Record<string, OpenAPIV3.SchemaObject> & DefaultSchemas;
};

const DEFAULT_STATUS = 200;

const DEFAULT_METHOD = 'GET';

const DEFAULT_REPEAT = 1;

export interface PlatformMockOptions {
  /**
   * Platform schemas;
   */
  schemas?: typeof schemas;
  /**
   * Enable request parameters and body validation
   */
  enableValidation?: boolean;
  /**
   * Locale for Faker
   * https://github.com/Marak/Faker.js#localization
   */
  fakeLocale?: string;
  /**
   * Faker options
   * https://github.com/Marak/Faker.js
   */
  fakeOptions?: JSONSchemaFakerOptions;
}

/**
 * PlatformMock includes only the most basic platform types and generic mock interfaces
 *
 * @example
 *
 * ```ts
 * import { PlatformMock } from '@ringcentral-integration/mock';
 *
 * const platformMock = new PlatformMock();
 * platformMock.post('/restapi/v1.0/number-parser/parse');
 * fetch('http://example.com/restapi/v1.0/number-parser/parse', {
 *   body: JSON.stringify({ originalStrings: ['(165) 1223-4567'] }),
 *   method: 'POST',
 * });
 * expect(platformMock.fetchMock).toHaveFetchedTimes(1, 'http://example.com/restapi/v1.0/number-parser/parse');
 * ```
 */
export class PlatformMock {
  private _brandId?: string;

  /**
   * the current login user brand id
   */
  protected get brandId() {
    return this._brandId ?? '1210';
  }

  protected schemas: typeof schemas;
  protected generate: Generate;
  protected validator?: Ajv;
  protected enableValidation: boolean;
  protected debugger?: Debugger;
  /**
   * initialized state for platform mock
   */
  initialized = false;
  /**
   * optimization of parsing components schema
   */
  protected parsedComponents?: Record<string, SchemaObject>;
  /**
   * default init Rc fetch mocks
   */
  defaultInitMocks = new Set<InitMock>();

  /**
   * fetch-mock APIs
   * http://www.wheresrhys.co.uk/fetch-mock/
   */
  fetchMock: FetchMock = fetchMock;

  constructor(options: PlatformMockOptions = {}) {
    Object.assign(this.defaultInitMocks, {
      add: (value: InitMock) => {
        if (this.initialized) {
          throw new Error(
            `rcMock.defaultInitMocks.add() should be called before rcMock.init()`,
          );
        }
        Set.prototype.add.call(this.defaultInitMocks, value);
        return this.defaultInitMocks;
      },
    });
    this.schemas = options.schemas ?? schemas;
    this.enableValidation = options.enableValidation ?? false;
    if (this.enableValidation) {
      this.validator = new Ajv({ validateFormats: false });
      this.validator.addKeyword('faker');
    }
    // TODO: more fetchMock config.
    // http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration
    this.fetchMock.config.overwriteRoutes = false;
    this.generate = fake(options.fakeLocale, options.fakeOptions);
    this._initDebug();
  }

  protected _initDebug() {
    if (/rc-mock/.test(process.env.DEBUG ?? '')) {
      const verbose = /mock\*\*/.test(process.env.DEBUG ?? '');
      this.debug({ verbose });
    }
  }

  /**
   * set initial fetch mock
   */
  init(
    /**
     * the current login user brand id, default be 1210
     */
    brandId?: string,
  ) {
    this._brandId = brandId;

    this.initialized = true;
    for (const mock of this.defaultInitMocks) {
      mock.call(this);
    }
    return this;
  }

  /**
   * reset all defined fetch mocks
   */
  reset() {
    this.initialized = false;
    this.fetchMock.reset();
    return this;
  }

  /**
   * debugger for all fetch mocks
   */
  debug(options?: Debugger | { verbose?: boolean }) {
    this.debugger =
      typeof options === 'function'
        ? options
        : createDebugger({ verbose: options?.verbose });
    this.fetchMock.catch((url, request) => {
      this.debugger?.({ url, mock: false, request });
      return new Response('ok', { status: 200 });
    });
    return this;
  }

  /**
   * Generic mock, but it is not type-derived.
   */
  mock(
    matcher: string,
    status = DEFAULT_STATUS,
    options: Options<any, any, any> = {},
  ) {
    const method = options.method ?? DEFAULT_METHOD;
    this.fetchMock.mock(`express:${matcher}`, status, {
      ...options,
      method,
      repeat: options.repeat ?? DEFAULT_REPEAT,
      response: async (url: string, request: MockRequest = {}) => {
        let schema: OpenAPIV3.SchemaObject | null = null;
        let methodSchema: MethodSchema | null = null;
        const schemaItem = this.schemas.paths[matcher as never];
        if (schemaItem) {
          try {
            methodSchema = schemaItem[method.toLowerCase()] as MethodSchema;
            schema =
              methodSchema!.responses?.[status] ??
              (methodSchema!.responses as DefaultSchemas)?.default;
          } catch (e) {
            if (!options.response) {
              console.error(
                `The schema of URI '${matcher}' with method '${method}' and status '${status}' does not exist.`,
              );
              throw e;
            }
          }
        }

        let mockData = (options.response as IResponseObject<any>)?.body ?? {};
        if (methodSchema && schema) {
          const { properties, components } = (await $RefParser.dereference({
            type: 'object',
            properties: {
              mockData: schema,
            },
            components: this.parsedComponents ?? this.schemas.components,
          })) as {
            properties: { mockData: SchemaObject };
            components: Record<string, SchemaObject>;
          };
          this.parsedComponents = this.parsedComponents ?? components;
          const _properties =
            options?.schema?.(JSON.parse(JSON.stringify(properties))) ??
            properties;
          if (Object.keys(_properties).length > 0 && process.env.MOCK_MCP) {
            const mockMcpClient: Awaited<ReturnType<typeof connect>> =
              global.mockMcpClient;
            const response = await mockMcpClient!.requestMock(url, method, {
              body: request.body,
              metadata: {
                type: 'object',
                properties: _properties,
              },
            });
            mockData = response;
          } else {
            const generatedData = this.generate({
              type: 'object',
              properties: _properties,
              // TODO: fix type
            } as any) as { mockData: any };
            mockData = generatedData.mockData;
          }
        }

        const { searchParams, pathname } = new URL(url);
        const urlMatch = match(matcher, {
          decode: decodeURIComponent,
        });
        const { params } =
          (urlMatch(pathname) as {
            params: Record<string, any>;
          }) ?? {};
        for (const key of searchParams.keys()) {
          const value = searchParams.getAll(key) ?? [];
          params[key] = value.length < 2 ? value[0] : value;
        }
        for (const key of Object.keys(params)) {
          try {
            // eslint-disable-next-line no-eval
            params[key] = eval(params[key]);
          } catch (e) {
            //
          }
        }

        let parsedBody = request.body ?? {};
        if (typeof request.body === 'string') {
          try {
            parsedBody = JSON.parse(request.body as string);
          } catch (e) {
            try {
              const searchParams = new URLSearchParams(request.body);
              for (const key of searchParams.keys()) {
                const value = searchParams.getAll(key) ?? [];
                params[key] = value.length < 2 ? value[0] : value;
              }
            } catch (e) {
              console.error(
                `The request body '${request.body}' of URL '${url}' parsed to get an error.`,
              );
              throw e;
            }
          }
        }

        // special case
        if (params?.perPage === 'MAX') {
          params.perPage = 100;
        }

        // to this point, mockData could be undefined if api spec does not contain the
        // specific endpoint
        if (mockData?.paging) {
          mockData.paging.page = mockData.paging.page ?? params.page;
          mockData.paging.perPage = mockData.paging.perPage ?? params.perPage;
        }

        if (this.enableValidation && methodSchema) {
          const { type, properties } = await $RefParser.dereference({
            type: 'object',
            properties: {
              body: methodSchema.requestBody ?? {},
              params: {
                type: 'object',
                properties: (methodSchema.parameters ?? []).reduce(
                  (parametersSchema, { name, schema }) => {
                    parametersSchema[name] = schema as OpenAPIV3.SchemaObject;
                    return parametersSchema;
                  },
                  {} as Record<string, OpenAPIV3.SchemaObject>,
                ),
              },
            },
            components: this.parsedComponents,
          });
          const validate = this.validator?.compile({ type, properties });

          const valid = validate?.({
            body: parsedBody,
            params,
          });
          if (!valid) {
            console.error(
              [
                url,
                `Request validation error:`,
                JSON.stringify(
                  { body: parsedBody, params, errors: validate?.errors },
                  null,
                  2,
                ),
              ].join('\n'),
            );
          }
        }

        const mockResponse =
          !options || typeof options.response !== 'function'
            ? options?.response ?? { body: mockData }
            : await options.response({
                url,
                request,
                params,
                body: parsedBody,
                mockData,
              });
        const response = {
          status,
          ...mockResponse,
        };
        try {
          this.debugger?.({
            url,
            mock: true,
            request,
            response,
          });
        } catch (e) {
          //
        }
        return response;
      },
    });
  }

  /**
   * mock get API
   */
  get<
    U extends keyof Get,
    S extends keyof Get[U]['responses'],
    T extends Get[U]['responses'][S],
    R extends Get[U]['requestBody'],
    P extends Get[U]['parameters'],
  >(
    /**
     * platform URL path
     */
    url: U,
    /**
     * mock status, 200 by default
     */
    status?: S,
    /**
     * mock options
     */
    options?: Pick<Options<P, R, T>, Exclude<keyof Options<P, R, T>, 'method'>>,
  ) {
    this.mock(url, status as number, { ...options, method: 'GET' });
    return this;
  }

  /**
   * mock delete API
   */
  delete<
    U extends keyof Delete,
    S extends keyof Delete[U]['responses'],
    T extends Delete[U]['responses'][S],
    R extends Delete[U]['requestBody'],
    P extends Delete[U]['parameters'],
  >(
    /**
     * platform URL path
     */
    url: U,
    /**
     * mock status, 200 by default
     */
    status?: S,
    /**
     * mock options
     */
    options?: Pick<Options<P, R, T>, Exclude<keyof Options<P, R, T>, 'method'>>,
  ) {
    this.mock(url, status as number, { ...options, method: 'DELETE' });
    return this;
  }

  /**
   * mock patch API
   */
  patch<
    U extends keyof Patch,
    S extends keyof Patch[U]['responses'],
    T extends Patch[U]['responses'][S],
    R extends Patch[U]['requestBody'],
    P extends Patch[U]['parameters'],
  >(
    /**
     * platform URL path
     */
    url: U,
    /**
     * mock status, 200 by default
     */
    status?: S,
    /**
     * mock options
     */
    options?: Pick<Options<P, R, T>, Exclude<keyof Options<P, R, T>, 'method'>>,
  ) {
    this.mock(url, status as number, { ...options, method: 'PATCH' });
    return this;
  }

  /**
   * mock post API
   */
  post<
    U extends keyof Post,
    S extends keyof Post[U]['responses'],
    T extends Post[U]['responses'][S],
    R extends Post[U]['requestBody'],
    P extends Post[U]['parameters'],
  >(
    /**
     * platform URL path
     */
    url: U,
    /**
     * mock status, 200 by default
     */
    status?: S,
    /**
     * mock options
     */
    options?: Pick<Options<P, R, T>, Exclude<keyof Options<P, R, T>, 'method'>>,
  ) {
    this.mock(url, status as number, { ...options, method: 'POST' });
    return this;
  }

  /**
   * mock put API
   */
  put<
    U extends keyof Put,
    S extends keyof Put[U]['responses'],
    T extends Put[U]['responses'][S],
    R extends Put[U]['requestBody'],
    P extends Put[U]['parameters'],
  >(
    /**
     * platform URL path
     */
    url: U,
    /**
     * mock status, 200 by default
     */
    status?: S,
    /**
     * mock options
     */
    options?: Pick<Options<P, R, T>, Exclude<keyof Options<P, R, T>, 'method'>>,
  ) {
    this.mock(url, status as number, { ...options, method: 'PUT' });
    return this;
  }

  generateEvent<
    T extends Extract<
      keyof typeof schemas.components.schemas,
      `${string}Event`
    >,
  >(event: T) {
    return this.generate({
      ...(this.schemas.components.schemas[event] as any),
      components: this.parsedComponents ?? this.schemas.components,
    });
  }
}
