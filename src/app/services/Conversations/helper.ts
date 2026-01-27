import { format } from '@ringcentral-integration/phone-number';
import MD5 from 'crypto-js/md5';

function getE164PhoneNumber(to: string): string | null | undefined {
  return format({ phoneNumber: to, type: 'e164' });
}

export function buildConversationId(toNumbers: string[], fromNumber: string) {
  const e164ToNumber = [...toNumbers, fromNumber]
    .map((to) => getE164PhoneNumber(to))
    .filter((x) => x);

  const sortedNumbers = e164ToNumber.sort().join('-');

  // using - to mark that as local id
  return `-${MD5(sortedNumbers).toString()}`;
}
