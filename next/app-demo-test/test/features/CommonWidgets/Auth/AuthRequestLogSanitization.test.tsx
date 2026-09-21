import { BrowserLogger } from '@ringcentral-integration/micro-core/src/app/services';
import {
  autorun,
  common,
  Given,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
} from '@ringcentral-integration/test-utils';

import { CommonLogin } from '../../../steps/CommonLogin';
import { CreateMock } from '../../../steps/Mock';

const RAW_ACCESS_TOKEN = 'raw-access-token-for-auth-log-test';
const RAW_REFRESH_TOKEN = 'raw-refresh-token-for-auth-log-test';
const RAW_ID_TOKEN = 'raw-id-token-for-auth-log-test';
const RAW_ENDPOINT_ID = 'raw-endpoint-id-for-auth-log-test';

const MockAuthTokenResponse: StepFunction = async (_, { rcMock }) => {
  rcMock.replaceDefaultInitMock(rcMock.postAuthentication, () => {
    rcMock.postAuthentication((mockData) => ({
      ...mockData,
      access_token: RAW_ACCESS_TOKEN,
      refresh_token: RAW_REFRESH_TOKEN,
      id_token: RAW_ID_TOKEN,
      endpoint_id: RAW_ENDPOINT_ID,
    }));
  });
};

@autorun(test)
@common
@title('Auth request logger sanitizes OAuth token response through middleware')
export class AuthRequestLogSanitization extends Step {
  run() {
    return (
      <Scenario
        desc="Login with raw OAuth token response and check Auth request logs"
        action={[CreateMock, MockAuthTokenResponse]}
      >
        <Given
          desc="Login in the CTI without per-call log sanitization"
          action={
            <CommonLogin
              shouldMockWebphone={false}
              waitActiveCallControlReady={false}
            />
          }
        />
        <Then
          desc="Auth afterRequest log should be sanitized by PiiLoggerMiddlewares"
          action={
            ((_, { app }) => {
              const browserLogger = app.container.got(BrowserLogger)!;
              const messages =
                (browserLogger.storageTransport as any)._data.messages || [];
              const afterAuthRequestLog = messages.find(({ data }: any) => {
                return (
                  String(data[0]).startsWith('afterRequest') &&
                  data[1] === 'POST' &&
                  String(data[2]).includes('/restapi/oauth/token')
                );
              });

              expect(afterAuthRequestLog).toBeDefined();

              const serializedLog = JSON.stringify(afterAuthRequestLog.data);
              expect(serializedLog).not.toContain(RAW_ACCESS_TOKEN);
              expect(serializedLog).not.toContain(RAW_REFRESH_TOKEN);
              expect(serializedLog).not.toContain(RAW_ID_TOKEN);
              expect(serializedLog).not.toContain(RAW_ENDPOINT_ID);

              const { responseBody } = afterAuthRequestLog.data[3];

              expect(responseBody).toMatch(
                /"access_token":"\[PII:v2;access-token;[^"]+\]"/,
              );
              expect(responseBody).toMatch(
                /"refresh_token":"\[PII:v2;refresh-token;[^"]+\]"/,
              );
              expect(responseBody).toMatch(/"id_token":"\[PII:v2;jwt;[^"]+\]"/);
              expect(responseBody).toMatch(
                /"endpoint_id":"\[PII:v2;user-id;[^"]+\]"/,
              );
            }) as StepFunction
          }
        />
      </Scenario>
    );
  }
}
