import type {
  FeatureInfo,
  GetExtensionPhoneNumbersResponse,
} from '@ringcentral-integration/mock';
import type accountInfoBody from '@ringcentral-integration/mock/src/platform/data/accountInfo.json';
import phoneNumberData from '@ringcentral-integration/mock/src/platform/data/phoneNumber.json';

import { mockMessageListData } from './mockMessageListData';

export const RECEIVE_ONLY_NUMBER = '+16506506500';
export const FORMATTED_RECEIVE_ONLY_NUMBER = '(650) 650-6500';
export const NOT_REGISTERED_NUMBER = '+16506506511';
export const FORMATTED_NOT_REGISTERED_NUMBER = '(650) 650-6511';
export const REGISTERED_NUMBER = '+16506506522';
export const FORMATTED_REGISTERED_NUMBER = '(650) 650-6522';
export const MIXED_REGISTERED_NUMBER_1 = '+16506506555';
export const FORMATTED_MIXED_REGISTERED_NUMBER_1 = '(650) 650-6555';
export const MIXED_REGISTERED_NUMBER_2 = '+16506506566';
export const FORMATTED_MIXED_REGISTERED_NUMBER_2 = '(650) 650-6566';
export const MIXED_NOT_REGISTERED_NUMBER_2 = '+16506506522';
export const MIXED_NOT_REGISTERED_NUMBER_3 = '+16506506533';
export const FORMATTED_MIXED_NOT_REGISTERED_NUMBER_3 = '(650) 650-6533';
export const RECIPIENT_NUMBER = '+14155550100';
export const TCR_CONVERSATION_ID = 104630001;

export const SMS_NOT_ENABLED_ALERT =
  'Text messaging is not yet enabled for this account. Please contact your company admin for more information.';
export const NO_NUMBER_AVAILABLE_ALERT =
  "Your number(s) can't send or receive texts until it's been registered with US carriers by a company admin.";
export const RECEIVE_ONLY_NUMBER_ALERT =
  "Your number(s) are set to receive incoming text messages. You can't send or reply to texts.";
export const NUMBER_CAPABILITY_ALERT =
  'This conversation is read-only. Your number (650) 650-6500 must be registered by an admin to send texts.';
export const ACCOUNT_LEVEL_READ_ONLY_ALERT = `This conversation is read-only. ${SMS_NOT_ENABLED_ALERT}`;
export const IMPORTANT_CHANGES_TITLE =
  'Important changes to your text messaging service';
export const IMPORTANT_CHANGES_DESCRIPTION =
  'To comply with US industry anti-spam regulations, phone numbers must now be registered to send and receive text messages. SMS registration for your number(s) can be completed online by a company admin.';
export const RECEIVE_ONLY_TITLE =
  'Your number(s) are set to receive incoming texts only';
export const RECEIVE_ONLY_DESCRIPTION =
  'To comply with US industry anti-spam regulations, companies are required to register phone numbers for outbound texting. Your number(s) are set to receive incoming text messages only.';
export const RECEIVE_ONLY_NON_ADMIN_ACTION =
  'Ask your admin to set up outbound text messaging.';
export const RECEIVE_ONLY_ADMIN_ACTION =
  'You can register your company for outbound texting in the Admin Portal.';
export const REGISTER_TCR_URL = 'https://login.ringcentral.com/';

export interface TcrPhoneNumberMocksOptions {
  accountSmsEnabled?: boolean;
  registeredNumbers?: string[];
  receiveOnlyNumbers?: string[];
  notRegisteredNumbers?: string[];
  conversationOwnerNumber?: string;
  conversationSubject?: string;
}

const getPhoneNumberId = (phoneNumber: string) =>
  Number(phoneNumber.replace(/\D/g, ''));

const createTcrPhoneNumberRecord = (
  phoneNumber: string,
  features: string[],
  index: number,
) => ({
  ...phoneNumberData.records[index % phoneNumberData.records.length],
  id: getPhoneNumberId(phoneNumber),
  phoneNumber,
  usageType: 'DirectNumber',
  type: 'VoiceFax',
  status: 'Normal',
  primary: index === 0,
  features: ['CallerId', ...features],
});

export const mockAccountInfoWithTcrCountry = (
  accountInfo: typeof accountInfoBody,
) => {
  (accountInfo.serviceInfo as any).contractedCountry = {
    id: '1',
    name: 'United States',
    isoCode: 'US',
    uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/1',
  };
  return accountInfo;
};

export const withSmsFeatureAvailability = (
  features: FeatureInfo[],
  accountSmsEnabled: boolean,
) => {
  const availabilityMap: Record<string, boolean> = {
    SMSSending: accountSmsEnabled,
    PagesSending: accountSmsEnabled,
  };
  const featureIdSet = new Set(features.map(({ id }) => id));
  const updatedFeatures = features.map((feature) =>
    feature.id in availabilityMap
      ? {
          ...feature,
          available: availabilityMap[feature.id],
        }
      : feature,
  );

  Object.entries(availabilityMap).forEach(([id, available]) => {
    if (!featureIdSet.has(id)) {
      updatedFeatures.push({
        id,
        available,
        params: [],
        reason: {
          code: 'AccountLimitation',
          message: '',
          permission: id,
        },
      });
    }
  });

  return updatedFeatures;
};

const getSeededConversationData = ({
  conversationOwnerNumber,
  conversationSubject,
}: Pick<
  TcrPhoneNumberMocksOptions,
  'conversationOwnerNumber' | 'conversationSubject'
>) => {
  if (!conversationOwnerNumber) {
    return mockMessageListData(null);
  }

  return mockMessageListData([
    {
      id: TCR_CONVERSATION_ID,
      conversationId: TCR_CONVERSATION_ID,
      direction: 'Inbound',
      type: 'SMS',
      fromPhoneNumber: RECIPIENT_NUMBER,
      fromName: 'TCR Contact',
      toNumber: conversationOwnerNumber,
      subject: conversationSubject ?? 'TCR seeded conversation',
    },
  ]);
};

export const getTcrPhoneNumberMockData = ({
  registeredNumbers = [],
  receiveOnlyNumbers = [],
  notRegisteredNumbers = [],
  conversationOwnerNumber,
  conversationSubject,
}: TcrPhoneNumberMocksOptions = {}) => {
  const records = [
    ...registeredNumbers.map((phoneNumber, index) =>
      createTcrPhoneNumberRecord(
        phoneNumber,
        ['SmsSender', 'SmsReceiver', 'MmsSender'],
        index,
      ),
    ),
    ...receiveOnlyNumbers.map((phoneNumber, index) =>
      createTcrPhoneNumberRecord(
        phoneNumber,
        ['SmsReceiver'],
        registeredNumbers.length + index,
      ),
    ),
    ...notRegisteredNumbers.map((phoneNumber, index) =>
      createTcrPhoneNumberRecord(
        phoneNumber,
        [],
        registeredNumbers.length + receiveOnlyNumbers.length + index,
      ),
    ),
  ] as GetExtensionPhoneNumbersResponse['records'];
  const messageData = getSeededConversationData({
    conversationOwnerNumber,
    conversationSubject,
  });

  return {
    records,
    messageData,
  };
};
