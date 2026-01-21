import extensionsListBody from '@ringcentral-integration/commons/integration-test/mock/data/extensions.json';

const companyContactItem = extensionsListBody.records[0];

type PhoneNumberProps = Partial<
  (typeof companyContactItem)['phoneNumbers'] & { hidden?: boolean }
>;

type CompanyContactItem = typeof companyContactItem & {
  hidden?: boolean;
  phoneNumbers?: PhoneNumberProps[];
};

type CompanyContactItemProps = CompanyContactItem & {
  phoneNumber?: string;
  phoneNumberType?: string;
  phoneNumberHidden?: boolean;
  phoneNumberUsageType?: string;
  id: string;
  profileImage: {
    uri: string;
  };
};

export type ExtensionsListData = {
  records: CompanyContactItem[];
};

const generateCompanyContactRecord = ({
  id,
  type = 'User',
  status = 'Enabled',
  firstName = 'MOCK_FIRST_NAME',
  lastName = 'MOCK_LAST_NAME',
  email = 'mock.email@ringcentral.com',
  extensionNumber = '101',
  hidden = undefined,

  phoneNumber,
  phoneNumberType = 'VoiceFax',
  phoneNumberHidden = undefined,
  phoneNumberUsageType = 'DirectNumber',

  phoneNumbers = companyContactItem.phoneNumbers,
  profileImage = undefined,
}: Partial<CompanyContactItemProps>) => {
  const timeStamp = new Date().getTime();

  return {
    id: id || `${timeStamp}`,
    type,
    email,
    status,
    hidden,
    lastName,
    firstName,
    extensionNumber,
    account: extensionNumber,
    profileImage,
    phoneNumbers: phoneNumber
      ? [
          {
            phoneNumber,
            type: phoneNumberType,
            hidden: phoneNumberHidden,
            usageType: phoneNumberUsageType,
          },
        ]
      : phoneNumbers,
  };
};

export const mockExtensionsListData = (
  item: Partial<CompanyContactItemProps> | Partial<CompanyContactItemProps>[],
) => {
  if (Array.isArray(item)) {
    const records = item.map((val: Partial<CompanyContactItemProps>, index) =>
      generateCompanyContactRecord({
        ...val,
        id: `${new Date().getTime() + index}`,
      }),
    );
    return {
      records,
    };
  }

  return {
    records: [generateCompanyContactRecord(item)],
  };
};
