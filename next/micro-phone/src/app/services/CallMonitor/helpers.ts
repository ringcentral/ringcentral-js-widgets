import {
  PartyStatusCode,
  type Session,
} from 'ringcentral-call-control/lib/Session';

/** Check both local and remote parties so outbound setup is not treated as answered. */
export const checkIsCallAnswered = (
  session?: Pick<Session, 'party' | 'otherParties'>,
): boolean => {
  if (!session) return false;

  const parties = [session.party, ...(session.otherParties ?? [])].filter(
    (party) => !!party,
  );
  const isAnswered = (party: Session['party']) =>
    party.status?.code === PartyStatusCode.answered;

  return (
    // when inbound leg be answered, means that call another side be answered
    parties.some((party) => party.direction === 'Inbound' && isAnswered(party))
  );
};
