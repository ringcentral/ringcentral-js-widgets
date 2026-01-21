import directoryEntries from '@ringcentral-integration/mock/src/platform/data/directoryEntries.json';
import extensionsListBody from '@ringcentral-integration/mock/src/platform/data/extensions.json';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockExtensionsListProps {
  handler?: (extensionList: any) => any;
  repeat?: number;
  isDefaultInit?: boolean;
  mockResponse?: any;
}

export const MockExtensionsList: StepFunction<MockExtensionsListProps> = (
  { handler, isDefaultInit = true },
  { rcMock },
) => {
  const response = handler?.(extensionsListBody) ?? extensionsListBody;
  if (!isDefaultInit) {
    rcMock.getContacts((contactData) => {
      return response;
    });
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.getContacts, () => {
    rcMock.getContacts((contactData) => {
      const response = handler?.(contactData) ?? contactData;
      return response;
    });
  });
};

export const MockExtensionsListPublicApi: StepFunction<
  MockExtensionsListProps
> = ({ handler, isDefaultInit = true, mockResponse }, { rcMock }) => {
  const response =
    mockResponse ?? handler?.(directoryEntries) ?? directoryEntries;
  if (!isDefaultInit) {
    rcMock.getContactsByPublicApi((contactData) => {
      return response;
    });
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.getContactsByPublicApi, () => {
    rcMock.getContactsByPublicApi((mockdata) => {
      const response = mockResponse ?? handler?.(mockdata) ?? mockdata;
      return response;
    });
  });
};
