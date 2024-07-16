import {
  authMessages,
  matchKnownRequestErrors,
  type AuthErrorConfig,
  type ResponseErrorInfo,
} from '@ringcentral-integration/commons/modules/Auth';
import {
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  ut,
} from '@ringcentral-integration/test-utils';
import type { ApiError } from '@ringcentral/sdk';

export interface ExampleData {
  requestUrl?: string;
  responseBody: { errors: ResponseErrorInfo[] };
  matches: AuthErrorConfig[];
}

const exampleData: ExampleData[] = [
  {
    responseBody: {
      errors: [
        {
          errorCode: 'OAU-101',
          message: 'Parameter [brandId] is invalid',
        },
      ],
    },
    matches: [
      [403, 'OAU-101', { logout: true, alert: authMessages.accessDenied }],
    ],
  },
  {
    responseBody: {
      errors: [
        {
          errorCode: 'OAU-136',
          message: 'Extension not found',
        },
      ],
    },
    matches: [
      [401, 'OAU-136', { logout: true, alert: authMessages.internalError }],
    ],
  },
  {
    responseBody: {
      errors: [
        {
          errorCode: 'OAU-167',
          message: 'Site access forbidden',
        },
      ],
    },
    matches: [
      [
        403,
        'OAU-167',
        { logout: true, alert: authMessages.siteAccessForbidden },
      ],
    ],
  },
  {
    requestUrl: 'https://api-rcapps-labs_domain/restapi/oauth/token',
    responseBody: {
      errors: [
        {
          errorCode: 'OAU-141',
          message: 'Login for extension in current state is not allowed.',
        },
      ],
    },
    matches: [
      [
        401,
        'OAU-141',
        { logout: true, alert: authMessages.internalError },
        [/\/restapi\/oauth\/token$/i],
      ],
    ],
  },
  {
    requestUrl: 'https://api-rcapps-labs_domain/restapi/oauth/token',
    responseBody: {
      errors: [
        {
          errorCode: 'OAU-213',
          message: 'Token not found',
        },
      ],
    },
    matches: [
      [
        -1,
        'OAU-213',
        { logout: true, alert: authMessages.internalError },
        [/\/restapi\/oauth\/token$/i],
      ],
    ],
  },
  {
    requestUrl:
      'https://api-rcapps-labs_domain/restapi/v1.0/account/~/extension/~/device',
    responseBody: {
      errors: [
        {
          errorCode: 'OAU-141',
          message: 'Login for extension in current state is not allowed.',
        },
      ],
    },
    matches: [],
  },
  {
    requestUrl:
      'https://api-rcapps-labs_domain/restapi/v1.0/account/~/extension/~/device',
    responseBody: {
      errors: [
        {
          errorCode: 'OAU-213',
          message: 'Token not found',
        },
      ],
    },
    matches: [],
  },
  {
    responseBody: {
      errors: [
        {
          errorCode: 'UNKNOWN' as any,
          message: 'ANY MESSAGE',
        },
      ],
    },
    matches: [],
  },
];

export const makeApiError = (
  responseBody: { errors: ResponseErrorInfo[] },
  requestUrl?: string,
) => {
  return {
    request: {
      // url: requestUrl,
    },
    response: {
      url: requestUrl,
      clone: () => ({
        json: () => responseBody,
      }),
    },
  } as any as ApiError;
};

@autorun(test)
@ut
@title('Check matching known request errors')
class MatchKnownRequestErrors extends Step {
  @examples(exampleData)
  run() {
    const { responseBody, requestUrl, matches } = this.example as ExampleData;
    return (
      <Scenario desc="Check matching known request errors">
        <Given
          desc="'matchKnownRequestErrors' is provided"
          action={() => {
            expect(matchKnownRequestErrors).toBeTruthy();
          }}
        />
        <Then
          desc="'matchKnownRequestErrors' should be a function"
          action={() => {
            expect(typeof matchKnownRequestErrors).toEqual('function');
          }}
        />
        <Then
          desc="'matchKnownRequestErrors' should work as expected"
          action={async () => {
            const apiError = makeApiError(responseBody, requestUrl);
            expect(await matchKnownRequestErrors(apiError)).toEqual(matches);
          }}
        />
      </Scenario>
    );
  }
}
