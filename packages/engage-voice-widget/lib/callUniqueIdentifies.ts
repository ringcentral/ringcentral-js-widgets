import { EvCallData } from '../interfaces/EvData.interface';
import { contactMatchIdentifyEncode } from './contactMatchIdentify';

export const makeCallsUniqueIdentifies = (calls: EvCallData[]) => {
  const numbers = calls.map(({ ani, callType }) => {
    const id = contactMatchIdentifyEncode({
      phoneNumber: ani,
      callType: callType.toLowerCase(),
    });
    return id;
  });
  return Array.from(new Set(numbers));
};
