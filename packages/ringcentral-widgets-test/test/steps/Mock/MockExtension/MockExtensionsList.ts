import extensionsListBody from '@ringcentral-integration/mock/src/platform/data/extensions.json';

import type { StepFunction } from '../../../lib/step';

interface MockExtensionsListProps {
  handler?: (extensionList: any) => any;
  repeat?: number;
  isDefaultInit?: boolean;
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
  rcMock.defaultInitMocks.delete(rcMock.getContacts);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getContacts((contactData) => {
      const response = handler?.(contactData) ?? contactData;
      return response;
    });
  });
};
