const PREINSERT_DELIMITER = '_____';

export function createConferenceParticipantRemovalId(
  telephonySessionId: string,
  removedPartyId: string,
): string {
  return `${telephonySessionId}${PREINSERT_DELIMITER}${removedPartyId}`;
}

export function parseConferenceParticipantRemovalId(id: string): {
  telephonySessionId: string;
  removedPartyId: string;
} {
  const [telephonySessionId, removedPartyId] = id.split(PREINSERT_DELIMITER);
  return { telephonySessionId, removedPartyId };
}
