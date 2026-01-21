import type { GetExtensionInfoResponse } from '@ringcentral-integration/mock';
import extensionInfoBody from '@ringcentral-integration/mock/src/platform/data/extensionInfo.json';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockExtensionInfoProps {
  handle?: (features: GetExtensionInfoResponse) => GetExtensionInfoResponse;
  repeat?: number;
  isDefaultInit?: boolean;
}

export const MockExtensionInfo: StepFunction<MockExtensionInfoProps> = async (
  { handle, repeat, isDefaultInit = true },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.get('/restapi/v1.0/account/:accountId/extension/:extensionId', 200, {
      repeat: repeat ?? 1,
      response: () => {
        return { body: handle?.(extensionInfoBody) ?? extensionInfoBody };
      },
    });
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.getExtension, () => {
    rcMock.get('/restapi/v1.0/account/:accountId/extension/:extensionId', 200, {
      repeat: repeat ?? 1,
      response: () => {
        return { body: handle?.(extensionInfoBody) ?? extensionInfoBody };
      },
    });
  });
};
