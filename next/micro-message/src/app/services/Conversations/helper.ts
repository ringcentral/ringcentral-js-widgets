import { format } from '@ringcentral-integration/phone-number';
import MD5 from 'crypto-js/md5';

import type { ToNumber } from '../ComposeText/ComposeText.interface';

import type { FormattedConversation } from './Conversations.interface';

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

/**
 * Build ToNumber[] from conversation correspondents for DNC verification.
 * Returns empty array for group conversations (skip DNC check).
 * When dncEntityTypes is not provided, all correspondents are treated as freeSolo (phone-only DNC check).
 */
export function buildToNumbersFromConversation(
  conversation: FormattedConversation | undefined,
  dncEntityTypes?: string[],
): ToNumber[] {
  if (!conversation || conversation.correspondents.length > 1) {
    return [];
  }
  const allowedDNCEntitySet = dncEntityTypes
    ? new Set(dncEntityTypes)
    : new Set<string>();
  const { correspondents, correspondentMatchesList } = conversation;
  const matchesList = correspondentMatchesList ?? [];
  const result: ToNumber[] = [];

  for (let i = 0; i < correspondents.length; i++) {
    const correspondent = correspondents[i];
    const phoneNumber =
      correspondent.phoneNumber || correspondent.extensionNumber || '';
    if (!phoneNumber) continue;

    const matches = matchesList[i] ?? [];
    const dncMatch =
      allowedDNCEntitySet.size > 0
        ? matches.find(
            (match) =>
              match.id && match.type && allowedDNCEntitySet.has(match.type),
          )
        : undefined;

    if (dncMatch?.id) {
      result.push({
        id: dncMatch.id,
        phoneNumber,
        freeSolo: false,
      } as ToNumber);
    } else {
      result.push({
        phoneNumber,
        freeSolo: true,
      } as ToNumber);
    }
  }

  return result;
}
