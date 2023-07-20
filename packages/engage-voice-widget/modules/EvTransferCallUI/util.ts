import type { EvDirectAgentListItem } from '../../lib/EvClient';

export const getInternalTransferName = ({
  firstName,
  lastName,
  username,
}: EvDirectAgentListItem) => {
  const isInvalidName = !firstName && !lastName;
  return isInvalidName ? username : `${firstName} ${lastName}`;
};
