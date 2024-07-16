import type { StepFunction } from '@ringcentral-integration/test-utils';

export interface ResponseErrorInfo {
  errorCode: string;
  message: string;
  additionalInfo?: string;
}

export interface MockAddressBookSyncFailProps {
  handler: () => { errors: ResponseErrorInfo[] };
  status: number;
  repeat?: number;
}

export const MockAddressBookSyncFail: StepFunction<
  MockAddressBookSyncFailProps
> = ({ handler, status, repeat }, { rcMock, payload }) => {
  const mock = () => {
    rcMock.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/address-book-sync',
      status as any,
      {
        repeat,
        response: () => {
          return { body: handler() };
        },
      },
    );
  };
  if (rcMock.initialized) {
    mock();
  } else {
    rcMock.defaultInitMocks.delete(rcMock.getAddressBookSync);
    rcMock.defaultInitMocks.add(mock);
  }
};
