import React, { forwardRef } from 'react';

import {
  RcListItem,
  RcPresence,
  RcPresenceProps,
  spacing,
  styled,
} from '@ringcentral/juno';

import { getPresenceStatusName } from '../../lib/getPresenceStatusName';

const StyledListItem = styled(RcListItem)`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
  font-size: 13px;

  ${RcPresence} {
    margin-right: ${spacing(1.5)};
  }
`;

export type PresenceItemProps = {
  className?: string;
  userStatus: string;
  dndStatus?: string;
  selected: boolean;
  currentLocale?: string;
} & Pick<RcPresenceProps, 'type' | 'onClick'>;

export const PresenceItem = forwardRef<any, PresenceItemProps>(
  (
    {
      selected,
      className: classNameProp,
      userStatus,
      dndStatus,
      onClick,
      type,
      currentLocale,
    },
    ref,
  ) => {
    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    const name = getPresenceStatusName(userStatus, dndStatus, currentLocale);

    return (
      <StyledListItem
        ref={ref}
        selected={selected}
        disableGutters
        className={classNameProp}
        onClick={onClick}
      >
        <RcPresence size="medium" type={type} />
        <span>{name}</span>
      </StyledListItem>
    );
  },
);
