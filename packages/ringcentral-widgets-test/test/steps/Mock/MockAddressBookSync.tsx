import { ArraySchemaObject } from '@ringcentral-integration/mock/src/interface';
import { StepFunction } from '../../../../../packages/internal-features-test/test/lib/step';

interface MockAddressBookSyncProps {
  handler?: (personalUsers: any) => any;
  page?: number;
}

export const MockAddressBookSync: StepFunction<MockAddressBookSyncProps> = (
  { page = 2, handler },
  { rcMock, payload },
) => {
  payload.records = [];
  rcMock.defaultInitMocks.delete(rcMock.getAddressBookSync);
  rcMock.defaultInitMocks.add(() => {
    rcMock.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/address-book-sync',
      200,
      {
        repeat: page,
        schema: (schema) => {
          (
            schema.mockData.properties.records as ArraySchemaObject
          ).items.properties.availability.examples = ['Alive'];
          return schema;
        },
        response: ({ params, mockData }) => {
          mockData.syncInfo.syncTime = new Date(Date.now()).toISOString();
          mockData.syncInfo.syncType = page ? 'ISync' : 'FSync';
          page--;
          mockData.nextPageId = page;
          mockData.records.forEach((item) => {
            item.id = Math.random();
          });
          mockData.records = handler?.(mockData.records) ?? mockData.records;
          payload.records.push(...mockData.records.map((item) => item.id));
          return { body: mockData };
        },
      },
    );
  });
};
