import phoneNumberBody from '@ringcentral-integration/mock/src/platform/data/phoneNumber.json';
import { GetExtensionPhoneNumbersResponse } from '@ringcentral-integration/mock';
import { StepFunction } from '../../lib/step';

export interface MockGetPhoneNumberProps {
  getPhoneNumberData?: (
    mockData: GetExtensionPhoneNumbersResponse,
  ) => Partial<GetExtensionPhoneNumbersResponse>;
}

export const MockGetPhoneNumber: StepFunction<MockGetPhoneNumberProps> = async (
  { getPhoneNumberData = null },
  { rcMock },
) => {
  rcMock.defaultInitMocks.delete(rcMock.getPhoneNumber);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getPhoneNumber((mockData) => {
      mockData.records[0].features = ['CallerId', 'SmsSender', 'MmsSender'];
      if (getPhoneNumberData?.(mockData)) {
        return {
          ...mockData,
          ...getPhoneNumberData?.(mockData),
        };
      }

      let record = mockData.records.find(
        (item) => item.usageType === 'MainCompanyNumber',
      );

      if (record) {
        // TODO: need to generate e164 formatted phone number automatically
        record.phoneNumber = '+1 (403) 370-0051';
        return mockData;
      }

      record = mockData.records.shift();
      record.usageType = 'MainCompanyNumber';
      // TODO: need to generate e164 formatted phone number automatically
      record.phoneNumber = '+1 (403) 370-0051';
      return {
        ...mockData,
        records: phoneNumberBody.records,
      };
    });
  });
};
